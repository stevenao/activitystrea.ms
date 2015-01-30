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
var url         = require('url');
var uuid        = require('uuid');
var vocabs      = require('./vocabs');
var N3          = require('n3');
var as_context  = require('./data/activitystreams2.json');
var asx_context = require('./data/extended-context.json');
var jsonld      = require('jsonld');
var _toString   = {}.toString;

exports.throwif = function(condition, message) {
  if (condition) throw new Error(message);
};

exports.store = function(store) {
  if (store) return store;
  store = new N3.Store();
  exports.hidden(store, '_counter', 0, true);
  return store;
};

exports.uuid = function() {
  return 'urn:id:' + uuid.v4();
};

exports.define = function(target, key, accessor, writable) {
  var def = {
    configurable: false,
    enumerable: true
  };
  if (typeof accessor === 'function')
    def.get = accessor;
  else 
    def.value = accessor;
  if (writable)
    def.writable = true;
  Object.defineProperty(target, key, def);
};

exports.hidden = function(target, key, accessor, writable) {
  var def = {
    configurable: false,
    enumerable: false,
  };
  if (writable)
    def.writable = true;
  if (typeof accessor === 'function')
    def.get = accessor;
  else 
    def.value = accessor;
  Object.defineProperty(target, key, def);
};

exports.is_undefined = function(val) {
  return val === null || 
         val === undefined;
};

exports.is_primitive = function(val) {
  return exports.is_undefined(val) ||
         exports.is_string(val) || 
         exports.is_number(val) ||
         exports.is_boolean(val);
};

exports.is_string = function(val) {
  return typeof val === 'string' || 
         val instanceof String || 
         _toString.apply(val) === '[object String]';
};

exports.is_boolean = function(val) {
  return typeof val === 'boolean' ||
         val instanceof Boolean ||
         _toString.apply(val) === '[object Boolean]';
};

exports.is_number = function(val) {
  return typeof val === 'number' ||
         val instanceof Number ||
         _toString.apply(val) === '[object Number]';
};

exports.is_date = function(val) {
  return val instanceof Date || 
         _toString.apply(val) === '[object Date]';
};

exports.is_plain_object = function(val) {
  if (typeof val !== 'object' || Array.isArray(val)) return false;
  return val === val.valueOf() && _toString.apply(val) === '[object Object]';
};

exports.is_integer = function(val) {
  return exports.is_number(val) && 
    isFinite(val) && 
    val > -9007199254740992 && 
    val < 9007199254740992 && 
    Math.floor(val) === val;
};

exports.parsed_url = function(val) {
  try {
    return url.parse(val).href;
  } catch(err) {
    throw new Error('Value must be a valid URL');
  }
};

exports.is_buffer = function(val) {
  return val instanceof Buffer ||
         val instanceof TypedArray ||
         val instanceof DataView ||
         val instanceof ArrayBuffer;
};

exports.to_hexbinary = function(val) {
  if (val instanceof Buffer)
    return val.toString('hex');
  else if (val.byteLength) {
    val = val.buffer || val;
    var ret = '';
    for (var n = 0, l = val.byteLength; n < l; n++)
      ret += val[n].toString(16);
    return ret;
  }
};

exports.merge_types = function(reasoner, type, types) {
  types = types || [];
  if (!Array.isArray(types)) {
    types = [types];
  }
if (typeof type !== 'string') throw new Error();
  if (types.indexOf(type) === -1) {
    var ok = true;
    for (var n = 0, l = types.length; n < l; n++) {
      if (reasoner.isSubClassOf(types[n], type)) {
        ok = false;
        break;
      }
    } 
    if (ok) types.push(type);
  }
  return types;
};

exports.set_date_val = function(key, val) {
  if (!(val instanceof Date)) // support moment.js too
    throw new Error(key+' must be a date');
  this.set(key, val.toISOString(),{type:vocabs.xsd.dateTime});
};

exports.set_lang_val = function(key, val, lang) {
  var options;
  if (lang) {
    this.set(key, val, {lang:lang});
  } else {
    this.set(key, val);
  }
};

exports.set_ranged_val = function(key, val, min, max, type) {
  exports.throwif(!exports.is_number(val), key + ' must be a number');
  if (!isFinite(val)) return;
  val = Math.min(max, Math.max(min, val));
  this.set(key, val, {type: type});
};

exports.set_non_negative_int = function(key, val) {
  exports.throwif(!exports.is_number(val), key + ' must be a number');
  if (!isFinite(val)) return;
  val = Math.max(0, Math.floor(val));
  this.set(key, val, {type: vocabs.xsd.nonNegativeInteger});
};

exports.set_duration_val = function(key, val) {
  throwif(!is_number(val) && !is_string(val), 'Duration must be a string or a number');
  if (is_number(val)) {
    set_non_negative_int.call(this, key, val);
  }
  else if (is_string(val)) {
    this.set(key, val);
  }
  return this;
};

var default_doc_loader = jsonld.documentLoaders.node();
var custom_doc_loader = function(url, callback) {
  var u = url;
  if (u[u.length-1] !== '#') u += '#';
  if (u === vocabs.as.ns)
    return callback(null, {
      contextUrl: null,
      document: as_context, 
      documentUrl: url
    });
  default_doc_loader(url, callback);
};

exports.jsonld = Object.create({
  default_doc_loader: jsonld.documentLoaders.node(),
  custom_doc_loader: function(url, callback) {
    var u = url;
    if (u[u.length-1] !== '#') u += '#';
    if (u === vocabs.as.ns) {
      return callback(null, {
        contextUrl: null,
        document: as_context, 
        documentUrl: url
      });
    }
    exports.jsonld.default_doc_loader(url, callback);
  },
  compact: function(ret, callback, additional_context) {
    exports.throwif(typeof callback !== 'function', 'A callback function must be specified');
    var _context = {'@context': [vocabs.as.ns, asx_context]};
    if (additional_context) _context['@context'].push(additional_context);
    jsonld.compact(
      ret, _context, 
      {documentLoader: exports.jsonld.custom_doc_loader}, 
      function(err, doc) {
        if (err) {
          callback(err);
          return;
        }
        callback(null, doc);
      });
  },
  import: function(reasoner, input, callback) {
    exports.throwif(typeof callback !== 'function', 'A callback function must be specified');
    var models = require('./models');
    var builder = models.Base.Builder(reasoner);
    if (input['@id'])
      builder.id(input['@id']);
    input['@id'] = input['@id'] || builder._subject;
    jsonld.expand(input, 
      {expandContext: as_context, 
       documentLoader: exports.jsonld.custom_doc_loader}, 
      function(err,doc) {
        if (err) {
          callback(err);
          return;
        }
        jsonld.normalize(doc, function(err,doc) {
          if (err) {
            callback(err);
            return;
          }
          doc = doc['@default'];
          var object;
          for (var n = 0, l = doc.length; n < l; n++) {
            var triple = doc[n];
            var subject = triple.subject.value;
            var predicate = triple.predicate.value;
            object = triple.object;
            if (object.type === 'IRI' || object.type === 'blank node') {
              object = object.value;
            } else if (object.type === 'literal') {
              var val = '"' + object.value + '"';
              if (object.language)
                val += '@' + object.language;
              else if (object.datatype)
                val += '^^' + object.datatype;
              object = val;
            }
            builder._store.addTriple(subject, predicate, object);
          }
          object = builder.get();
          object = models.wrap_object(object._store, object._reasoner, object._subject, object.id);
          callback(null,object);
        });
      });
  }
});

exports.mixin = function(ctor, superCtor) {
  var names = Object.getOwnPropertyNames(superCtor.prototype);
  for (var n = 0, l = names.length; n < l; n++) {
    var prop = names[n];
    if (prop !== 'constructor') {
      var desc = Object.getOwnPropertyDescriptor(superCtor.prototype,prop);
      Object.defineProperty(ctor.prototype, prop, desc);
    }
  }
};