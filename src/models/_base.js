'use strict';

const Readable = require('readable-stream').Readable;
const vocabs = require('linkeddata-vocabs');
const request = require('request');
const reasoner = require('../reasoner');
const LanguageValue = require('./_languagevalue');
const models = require('../models');
const utils = require('../utils');
const jsonld = require('../jsonld');
const moment = require('moment');
const as = vocabs.as;
const asx = vocabs.asx;
const owl = vocabs.owl;
const throwif = utils.throwif;

const _expanded = Symbol('expanded');
const _cache = Symbol('cache');
const _base = Symbol('base');
const _builder = Symbol('builder');
const _options = Symbol('options');
const _done = Symbol('done');
const _items = Symbol('items');

function is_literal(item) {
  return item && item.hasOwnProperty('@value');
}

function is_iterable(item) {
  return item &&
    typeof item !== 'string' &&
    !(item instanceof Base) &&
    (typeof item[Symbol.iterator] === 'function');
}

function convert(item) {
  let type = item['@type'];
  let value = item['@value'];
  if (type) {
    let node = reasoner.node(type);
    if (node.is(asx.Number))
      value = Number(value);
    else if (node.is(asx.Date))
      value = moment(value);
    else if (node.is(asx.Boolean))
      value = value != 'false';
  }
  return value;
}

class ValueIterator {
  constructor(items) {
    this[_items] = items;
  }
  *[Symbol.iterator] () {
    for (let item of this[_items]) {
      if (is_literal(item)) {
        yield convert(item);
      } else if (item['@list']) {
        for (let litem of item['@list']) {
          if (is_literal(litem))
            yield convert(litem);
          else
            yield models.wrap_object(litem);
        }
      } else {
        yield models.wrap_object(item);
      }
    }
  }

  get first() {
    return this[Symbol.iterator]().next().value;
  }

  get length() {
    if (this[_items].length > 0 && this[_items][0]['@list'])
      return this[_items][0]['@list'].length;
    return this[_items].length;
  }

  toArray() {
    return Array.from(this);
  }
}

class BaseReader extends Readable {
  constructor(base, options) {
    options = options || {};
    options.highwaterMark = options.highwaterMark || '16kb';
    super(options);
    this[_base] = base;
    this[_options] = options;
  }
  _read() {
    if (this[_done]) return;
    let objectmode = this[_options].objectMode;
    this[_done] = true;
    let method =
      objectmode ?
        this[_base].export :
        this[_base].write;
    method.call(this[_base], this[_options], (err,doc)=> {
      if (err) {
        this.emit('error', err);
      } else {
        this.push(objectmode ? doc : new Buffer(doc, 'utf8'));
        this.push(null);
      }
      return false;
    });
  }
}

class Base {
  constructor(expanded, builder) {
    this[_expanded] = expanded || {};
    this[_cache] = {};
    this[_builder] = builder || Base.Builder;
  }

  /**
   * Get the unique @id of this object
   **/
  get id() {
    return this[_expanded]['@id'];
  }

  /**
   * Get the @type(s) of this object
   **/
  get type() {
    let types = this[_expanded]['@type'];
    return !types || types.length === 0 ? undefined :
           types.length === 1 ? types[0] :
           types;
  }

  /**
   * Returns true if the given key exists in the object
   **/
  has(key) {
    key = vocabs.as[key] || key;
    let ret = this[_expanded][key];
    return ret && (ret.length > 0 || typeof ret === 'boolean');
  }

  /**
   * Return the value of the given key
   **/
  get(key) {
    let ret;
    key = vocabs.as[key] || key;
    if (!this[_cache].hasOwnProperty(key)) {
      let nodekey = reasoner.node(key);
      let res = this[_expanded][key] || [];
      if (!res.length) return;
      if (nodekey.is(asx.LanguageProperty)) {
        this[_cache][key] = new LanguageValue(res);
      } else {
        ret = new ValueIterator(res);
        this[_cache][key] =
          nodekey.is(owl.FunctionalProperty) ?
            ret.first : ret;
      }
    }
    return this[_cache][key];
  }

  /**
   * Export the object to a normal, 'unwrapped' JavaScript object
   **/
  export(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = options || {};
    let handler = options.handler || jsonld.compact;
    handler(
      this[_expanded],
      options,
      callback);
  }

  /**
   * Export the object to an RDF/Triple string
   **/
   toRDF(options, callback) {
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

   /**
    * Write the object out to a String
    **/
   write(options, callback) {
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

   /**
    * Write the object out to to a string with indenting
    **/
   prettyWrite(options, callback) {
     if (typeof options === 'function') {
       callback = options;
       options = {};
     }
     options = options || {};
     options.space = options.space || 2;
     this.write(options, callback);
   }

   /**
    * Return a Readable Stream for this object
    **/
   stream(options) {
     return new BaseReader(this, options);
   }

   /**
    * Pipe this object out to the specified destination
    **/
   pipe(dest, options) {
     return this.stream(options).pipe(dest);
   }

   /**
    * Return a Dust context object for this object
    **/
   dust() {
     return require('../dust')(this);
   }

   send(options, callback) {
     if (typeof options === 'string') {
       options = {url:options};
     } else {
       options = options || {};
     }
     setImmediate(()=> {
       options.headers = options.headers || {};
       options.headers['Content-Type'] = as.mediaType;
       this.pipe(
         request.post(options)
                .on('response', (res)=> {
                  callback(null,res.statusCode,res);
                })
                .on('error', callback),
         options
       );
     });
   }

   modify() {
     return new this[_builder](this.type, this);
   }

   template() {
     let Builder = this[_builder];
     let type = this.type;
     let exp = this[_expanded];
     let tmpl = {};
     for (let key of Object.keys(exp)) {
       let value = exp[key];
       if (Array.isArray(value))
         value = [].concat(value);
       tmpl[key] = value;
     }
     return function() {
       let bld = new Builder(type);
       bld[_expanded] = bld[_base][_expanded] = Object.create(tmpl);
       return bld;
     };
   }

   * [Symbol.iterator]() {
       for (let key of Object.keys(this[_expanded])) {
           yield key;
       }
   }
}

class BaseBuilder {
  constructor(types, base) {
    this[_base] = base || new Base();
    this.type(types);
  }

  /**
   * Set the value of the given key
   **/
   set(key, val, options) {
     let expanded = this[_base][_expanded];
     options = options || {};
     if (val instanceof BaseBuilder)
       val = val.get();
     let n, l;
     key = vocabs.as[key] || key;
     let nodekey = reasoner.node(key);
     if (val === null || val === undefined) {
       delete expanded[key];
     } else {
       let is_iter = is_iterable(val);
       if (nodekey.is(owl.FunctionalProperty)) {
         throwif(is_iter, 'Functional properties cannot have array values');
         delete _expanded[key];
       }
       expanded[key] = expanded[key] || [];
       if (!is_iter) val = [val];
       for (let value of val) {
         if (nodekey.is(owl.ObjectProperty) ||
             value instanceof Base ||
             key == '@list') {
           if (value instanceof Base) {
             expanded[key].push(value[_expanded]);
           } else if (utils.is_string(value)) {
             expanded[key].push({'@id': value});
           } else if (typeof value === 'object') {
             let base = new Base();
             for (let k of Object.keys(value)) {
               let v = value[k];
               if (k === '@id') base.id(v);
               else if (k === '@type') base.type(v);
               else base.set(k, v);
             }
             expanded[key].push(base[_expanded]);
           } else {
             throw new Error('Invalid object property type');
           }
         } else {
           let lang = options.lang;
           let type = options.type;
           let ret = {
             '@value': value
           };
           if (lang) ret['@language'] = lang;
           if (type) ret['@type'] = type;
           expanded[key].push(ret);
         }
       }
     }
     return this;
   }

   /**
    * Set the unique @id of this object
    **/
   id(val) {
     // TODO: verify that it's an absolute IRI
     this[_base][_expanded]['@id'] = val;
     return this;
   }

   /**
    * Set the @type(s) of this object.
    **/
   type(types) {
     let exp = this[_base][_expanded];
     if (!types) {
       delete exp['@type'];
     } else {
       let ret = [];
       if (!Array.isArray(types)) types = [types];
       types = reasoner.reduce(types);
       for (let type of types) {
         ret.push(type.valueOf());
       }
       exp['@type'] = ret;
     }
     return this;
   }

   /**
    * Get the built object
    **/
   get() {
     return this[_base];
   }

   export(options, callback) {
     return this.get().export(options, callback);
   }

   toRDF(options, callback) {
     return this.get().toRDF(options, callback);
   }

   write(options, callback) {
     return this.get().write(options, callback);
   }

   prettyWrite(options, callback) {
     return this.get().prettyWrite(options, callback);
   }

   stream(options) {
     return this.get().stream(options);
   }

   pipe(dest, options) {
     return this.get().pipe(dest, options);
   }

   dust() {
     return this.get().dust();
   }

   send(options, callback) {
     return this.get().send(options, callback);
   }

   template() {
     return this.get().template();
   }
}
Base.Builder = BaseBuilder;

module.exports = Base;
