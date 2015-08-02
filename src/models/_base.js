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
'use strict';

var Readable      = require('readable-stream').Readable;
var util          = require('util');
var Symbol        = require('es6-symbol');
var vocabs        = require('linkeddata-vocabs');
var uuid          = require('node-uuid');
var utils         = require('../utils');
var models        = require('../models');
var jsonld        = require('../jsonld');
var LanguageValue = require('./_languagevalue');
var reasoner      = require('../reasoner');
var throwif       = utils.throwif;
var asx           = vocabs.asx;
var owl           = vocabs.owl;

var _expanded = Symbol('expanded');
var _cache = Symbol('cache');
var _base = Symbol('base');
var _builder = Symbol('builder');

function is_literal(item) {
  return item && item.hasOwnProperty('@value');
}

function Base(expanded,builder) {
  if (!(this instanceof Base))
    return new Base(expanded,builder);
  this[_expanded] = expanded;
  this[_cache] = {};
  this[_builder] = builder;
}

Object.defineProperty(Base.prototype, 'id', {
  configurable: false,
  enumerable: true,
  get: function() { return this[_expanded]['@id']; }
});

Object.defineProperty(Base.prototype, 'type', {
  configurable: false,
  enumerable: true,
  get: function() {
    var types = this[_expanded]['@type'];
    return !types || types.length === 0 ? undefined :
           types.length === 1 ? types[0] :
           types;
  }
});

Object.defineProperty(Base.prototype, 'has', {
  configurable: false,
  enumerable: true,
  value: function(key) {
    key = utils.parsed_url(vocabs.as[key]||key);
    var ret = this[_expanded][key];
    return ret && (ret.length > 0 || utils.is_boolean(ret));
  }
});

Object.defineProperty(Base.prototype, 'get', {
  configurable: false,
  enumerable: true,
  value: function(key) {
    var ret;
    key = utils.parsed_url(vocabs.as[key]||key);
    if (!this[_cache].hasOwnProperty(key)) {
      var nodekey = reasoner.node(key);
      var res = this[_expanded][key] || [];
      if (!res.length) return undefined;
      if (nodekey.is(asx.LanguageProperty)) {
        this[_cache][key] = new LanguageValue(res);
      } else {
        ret = res.map(function(item) {
          if (is_literal(item)) {
            var type = item['@type'];
            var value = item['@value'];
            if (type) {
              var node = reasoner.node(type);
              if (node.is(asx.Number))
                value = Number(value);
              else if (node.is(asx.Date))
                value = new Date(value);
              else if (node.is(asx.Boolean))
                value = value != 'false';
            }
            return value;
          } else if (item['@list']) {
            return item['@list'].map(function(i) {
              return models.wrap_object(i);
            });
          }
          return models.wrap_object(item);
        });
        this[_cache][key] =
          nodekey.is(owl.FunctionalProperty) ?
            ret[0] : ret;
      }
    }
    return this[_cache][key];
  }
});

Object.defineProperty(Base.prototype, 'export', {
  configurable: false,
  enumerable: true,
  value: function(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = options || {};
    var handler = options.handler || jsonld.compact;
    handler(
      this[_expanded],
      options,
      callback);
  }
});

Object.defineProperty(Base.prototype, 'toRDF', {
  configurable: false,
  enumerable: true,
  value: function(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = options || {};
    jsonld.normalize(
      this[_expanded],
      options,
      callback);
  }
});

Object.defineProperty(Base.prototype, 'write', {
  configurable: false,
  enumerable: true,
  value: function(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = options || {};
    this.export(options, function(err,doc) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, JSON.stringify(doc,null,options.space));
    });
  }
});

Object.defineProperty(Base.prototype, 'prettyWrite', {
  configurable: false,
  enumerable: true,
  value: function(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = options || {};
    options.space = options.space || 2;
    this.write(options, callback);
  }
});

Object.defineProperty(Base.prototype, 'modify', {
  configurable: false,
  enumerable: true,
  value: function() {
    return this[_builder](this.type, this);
  }
});

Object.defineProperty(Base.prototype, 'stream', {
  configurable: false,
  enumerable: true,
  value: function(options) {
    return new BaseReader(this, options);
  }
});

Object.defineProperty(Base.prototype, 'pipe', {
  configurable: false,
  enumerable: true,
  value: function(dest, options) {
    this.stream(options).pipe(dest);
  }
});

Object.defineProperty(Base.prototype, 'dust', {
  configurable: false,
  enumerable: true,
  value: function() {
    return require('../dust')(this);
  }
});

var _done = Symbol('done');
var _base = Symbol('base');
var _options = Symbol('options');
function BaseReader(base, options) {
  if (!(this instanceof BaseReader))
    return new BaseReader(base, options);
  options = options || {};
  options.highwaterMark = options.highwaterMark || '16kb';
  options.objectMode = true;
  Readable.call(this,options);
  this[_base] = base;
  this[_options] = options;
}
util.inherits(BaseReader, Readable);
Object.defineProperty(BaseReader.prototype, '_read', {
  configurable: false,
  enumerable: true,
  value: function() {
    var self = this;
    if (self[_done]) return;
    self[_done] = true;
    self[_base].write(this[_options], function(err,doc) {
      if (err) {
        self.emit('error', err);
      } else {
        self.push(new Buffer(doc, 'utf8'));
        self.push(null);
      }
      return false;
    });
  }
});

// ******** BUILDER ********* //

Base.Builder = function(types, base) {
  if (!(this instanceof Base.Builder))
    return new Base.Builder(types, base);
  base = base || new Base({});
  this[_base] = base;
  this[_expanded] = base[_expanded];
  this.type(types);
};
Base.Builder.prototype = {
  id : function(id) {
    if (id === undefined || id === false) {
      delete this[_expanded]['@id'];
    } else {
      if (id === true) {
        return this.id('urn:uuid:'+uuid.v4());
      } else {
        this[_expanded]['@id'] = String(id);
      }
    }
    return this;
  },
  type : function(type) {
    if (!type) {
      delete this[_expanded]['@type'];
    } else {
      var ret = [];
      if (!Array.isArray(type)) type = [type];
      type = reasoner.reduce(type);
      for (var n = 0, l = type.length; n < l; n++) {
        ret.push(type[n].valueOf());
      }
      this[_expanded]['@type'] = ret;
    }
    return this;
  },
  set : function(key, val, options) {
    var expanded = this[_expanded];
    options = options || {};
    if (val instanceof Base.Builder) {
      val = val.get();
    }
    var n, l;
    key = utils.parsed_url(vocabs.as[key]||key);
    var nodekey = reasoner.node(key);
    if (val === null || val === undefined) {
      delete expanded[key];
    } else {
      var is_array = Array.isArray(val);
      if (nodekey.is(owl.FunctionalProperty)) {
        throwif(is_array, 'Functional properties cannot have array values');
        delete _expanded[key];
      }
      expanded[key] = expanded[key] || [];
      if (!is_array) val = [val];
      for (n = 0, l = val.length; n < l; n++) {
        if (nodekey.is(owl.ObjectProperty) || val[n] instanceof Base ||
          key == '@list') {
          if (val[n] instanceof Base) {
            expanded[key].push(val[n][_expanded]);
          } else if (utils.is_string(val[n])) {
            expanded[key].push({'@id': val[n]});
          } else if (typeof val[n] === 'object') {
            var builder = Base.Builder();
            var keys = Object.keys(val[n]);
            for (n = 0, l = keys.length; n < l; n++) {
              var k = keys[n];
              var value = val[n][k];
              if (k === '@id') builder.id(value);
              else if (k === '@type') builder.type(value);
              else builder.set(k, value);
            }
            expanded[key].push(builder.get()[_expanded]);
          } else {
            throw Error('Invalid object property type');
          }
        } else {
          var lang = options.lang;
          var type = options.type;
          var ret = {
            '@value': val[n]
          };
          if (lang) ret['@language'] = lang;
          if (type) ret['@type'] = type;
          expanded[key].push(ret);
        }
      }
    }
    return this;
  },
  get : function(callback) {
    if (typeof callback === 'function') {
      this[_base].export(callback);
      return;
    }
    return this[_base];
  },
  write : function(options, callback) {
    return this[_base].write(options,callback);
  },
  prettyWrite: function(options, callback) {
    return this[_base].prettyWrite(options,callback);
  },
  pipe: function(dest,options) {
    return this[_base].pipe(dest,options);
  }
};

module.exports = Base;
