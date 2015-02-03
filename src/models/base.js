/**
 * Copyright 2013 International Business Machines Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Utility library for working with Activity Streams Actions
 * Requires underscorejs.
 *
 * @author James M Snell (jasnell@us.ibm.com)
 */
var utils         = require('../utils');
var vocabs        = require('linkeddata-vocabs');
var models        = require('../models/main');
var N3            = require('n3');
var LanguageValue = require('./languagevalue');
var LanguageTag   = require('rfc5646');

function set_language_value(ret, val) {
  if (N3.Util.isLiteral(val)) {
    var lang = N3.Util.getLiteralLanguage(val);
    val = N3.Util.getLiteralValue(val);
    if (lang) ret.set(lang, val);
    else ret.setDefault(val);
  }
}
function set_typed_value(ret, val, is_object_property) {
  if (N3.Util.isLiteral(val)) {
    var type = N3.Util.getLiteralType(val);
    val = N3.Util.getLiteralValue(val);
    if (type) {
      if (this._reasoner.is_number(type))
        val = Number(val).valueOf();
      else if (this._reasoner.is_date(type))
        val = new Date(val);
      else if (this._reasoner.is_boolean(type))
        val = Boolean(val).valueOf();
    }
  } else if (is_object_property) {
    val = models.wrap_object(
      this._store, 
      this._reasoner, 
      val, val);
  }
  ret.push(val);
}

function Base(store, reasoner, id, subject) {
  if (!(this instanceof Base))
    return new Base(store, reasoner, id, subject);
  utils.hidden(this, '_reasoner', reasoner);
  utils.hidden(this, '_store', utils.store(store));
  utils.hidden(this, '_id', id, true);
  utils.hidden(this, '_subject', subject || utils.uuid());
  utils.hidden(this, '_cache', {});
  utils.hidden(this, '_nextBlank', function() {
    return '_:b' + this._store._counter++;
  });
}
Base.prototype = {
  get id() {
    return this._id;
  },
  get type() {
    var types = this.get(vocabs.rdf.type);
    return types.length === 0 ? undefined : 
           types.length === 1 ? types[0] : 
           types;
  },
  get : function(key) {
    if (!this.hasOwnProperty(key)) {
      key = utils.parsed_url(vocabs.as[key]||key);
      var res = this._store.findByIRI(this.id||this._subject, key, null);
      var ret, n, l;
      if (this._reasoner.is_language_property(key)) {
        ret = LanguageValue.Builder();
        for (n = 0, l = res.length; n < l; n++) {
          set_language_value(ret, res[n].object);
        }
        this._cache[key] = ret.get();
      } else {
        ret = [];
        var is_object_property = this._reasoner.is_object_property(key);
        for (n = 0, l = res.length; n < l; n++) {
          set_typed_value.call(this, ret, res[n].object, is_object_property);
        }
        this._cache[key] = 
          this._reasoner.is_functional(key) ? 
            (ret.length ? ret[0] : undefined) : ret;
      }
    }
    return this._cache[key];
  },
  export : function(callback, additional_context) {
    utils.throwif(typeof callback !== 'function', 'A callback must be provided');
    var self = this;
    var cache = {};
    cache[self.id||self._subject] = true;
    process.nextTick(function() {
      utils.jsonld.compact(
        write_out(
          cache,
          self._reasoner, 
          self._subject, 
          self.id,
          self._store), 
        function(err, doc) {
          if (err) {
            callback(err);
            return;
          }
          callback(null, doc);
        },
        additional_context);
    });
  },
  write : function(callback) {
    this.export(function(err,doc) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, JSON.stringify(doc));
    });
  },
  prettyWrite : function(callback) {
    this.export(function(err,doc) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, JSON.stringify(doc,undefined,'  '));
    });
  }
};

function write_out(cache, reasoner, subject, id, store) {
  var triples = store.findByIRI(id||subject, null, null);
  var ret = {};
  cache[subject] = true;
  if (id) {
    ret['@id'] = id;
  } else if (!N3.Util.isBlank(subject) && !subject.match(/^urn:id/)) {
    ret['@id'] = subject;
  }
  for (var n = 0, l = triples.length; n < l; n++) {
    var predicate = triples[n].predicate;
    var object = triples[n].object;
    if (predicate === vocabs.rdf.type) {
      ret['@type'] = ret['@type'] || [];
      ret['@type'].push(object);
      continue;
    }
    ret[predicate] = ret[predicate] || [];
    var val;
    if (N3.Util.isLiteral(object)) {
      var value = N3.Util.getLiteralValue(object);
      var lang = N3.Util.getLiteralLanguage(object);
      var type = N3.Util.getLiteralType(object);
      if (reasoner.is_number(type))
        value = Number(value).valueOf();
      else if (reasoner.is_boolean(type))
        value = Boolean(value).valueOf();
      val = {'@value': value};
      if (utils.is_string(value) && lang)
        val['@language'] = lang;
      else if (type && type !== vocabs.xsd.string)
        val['@type'] = type;
    } else {
      if (reasoner.is_possibly_ordered(predicate) && 
          store.countByIRI(object, vocabs.rdf.first)) {
        var list = [];
        var current = object;
        while(current !== vocabs.rdf.nil) {
          var first = store.findByIRI(current, vocabs.rdf.first)[0].object;
          var rest = store.findByIRI(current, vocabs.rdf.rest)[0].object;
          if (cache[first]) {
            list.push({'@id':first});
          } else {
            list.push(write_out(cache, reasoner, first, undefined, store));
          }
          current = rest;
        }
        val = {'@list': list};

      } else if (cache[object]) {
        val = {'@id':object};
      } else {
        val = write_out(cache, reasoner, object, undefined, store);
      }
    }
    ret[predicate].push(val);
  }
  return ret;
}

// ******** BUILDER ********* //

Base.Builder = function(reasoner, types, base) {
  if (!(this instanceof Base.Builder))
    return new Base.Builder(reasoner, types);
  utils.hidden(this, '_base', base || new Base(undefined, reasoner));
  utils.hidden(this, '_reasoner', reasoner);
  utils.hidden(this, '_store', this._base._store);
  utils.hidden(this, '_subject', this._base._subject);
  if (types) this.type(types);
};
Base.Builder.prototype = {
  id : function(id) {
    if (id) 
      this._base._id = utils.parsed_url(id);
    return this;
  },
  type : function(type) {
    if (type) {
      if (!Array.isArray(type)) type = [type];
      for (var n = 0, l = type.length; n < l; n++)
        this._store.addTriple(this._subject, vocabs.rdf.type, type[n]);
    }
    return this;
  },
  set : function(key, val, options) {
    var _store = this._store;
    var _subject = this._subject;
    var _reasoner = this._reasoner;
    var n, l;
    if (key && !utils.is_undefined(val)) {
      key = utils.parsed_url(vocabs.as[key]||key);
      var is_array = Array.isArray(val);
      // if it's a functional property, delete any existing value that may exist
      if (_reasoner.is_functional(key)) {
        utils.throwif(is_array, 'Functional Properties cannot have Array values');
        //_store.findByIRI(_subject, key, null).forEach(_store.removeTriple);
        _store.findByIRI(_subject, key, null).forEach(function (triple) {
          _store.removeTriple(triple);
        });
      }
      if (is_array) {
        // split it up and set each value separately...
        for (n = 0, l = val.length; n < l; n++) {
          this.set(key, val[n]);
        }
      } else {
        if (_reasoner.is_object_property(key) || 
            val instanceof Base || 
            val instanceof Base.Builder || 
            (!utils.is_primitive(val) && !utils.is_date(val))) {

          if (val instanceof Base.Builder)  // unwrap the builder if necessary
            val = val.get();

          utils.throwif(utils.is_primitive(val) && !utils.is_string(val), 'Invalid object property value');
          if (val instanceof Base) {
            // this merges the specified Base objects graph into this builder's base object graph,
            // renaming blank nodes as necessary...
            merge_into.call(this._base, key, val);
          } else if (utils.is_string(val)) {
            // this is just a identifier...
            _store.addTriple(_subject, key, val); 
          } else {
            var builder = Base.Builder(_reasoner);
            var keys = Object.keys(val);
            for (n = 0, l = keys.length; n < l; n++) {
              var k = keys[n];
              var value = val[k];
              if (k == '@id') builder.id(value);
              else if (k == '@type') builder.type(value);
              else builder.set(k, value);
            }
            this.set(key, builder.get()); // set the value as the result of the builder...
          }
        } else {
          var lang = options ? options.lang : undefined, 
              type = options ? options.type : undefined;
          var set = '"' + val + '"'; // TODO: need to escape...
          if (utils.is_string(val) && lang) {
            set += '@' + lang;
          } else if (type) {
            set += '^^' + type;
          }
          _store.addTriple(_subject, key, set);
        }
      }
    }
    return this;
  },
  get : function() {
    return this._base;
  }
};

function merge_into(key, val) {
  var root_id = val.id;
  var triples = val._store.find(null,null,null);
  var map = {};
  map[val._subject] = root_id ? root_id : this._nextBlank;
  for(var n = 0, l = triples.length; n < l; n++) {
    var triple = triples[n];
    var subject = triple.subject;
    var predicate = triple.predicate;
    var object = triple.object;
    if (N3.Util.isBlank(subject) || subject.match(/^urn:id/))
      subject = map[subject] = map[subject] || this._nextBlank;
    this._store.addTriple(subject,predicate,object);
  }
  this._store.addTriple(this._subject, key, map[val._subject]);
  return map[val._subject];
}

Base.merge_into = merge_into;

module.exports = Base;
