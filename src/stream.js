'use strict';

const Transform = require('readable-stream/transform');
const as = require('./activitystreams');
const ctx = require('activitystreams-context');
const buf = Symbol('buffer');

class AS2Stream extends Transform {
  constructor(options) {
    options = options || {};
    if (!options.highWaterMark)
      options.highWaterMark = 1;
    options.objectMode = true;
    super(options);
    this[buf] = '';
  }

  _transform(chunk, encoding, callback) {
    this[buf] += chunk.toString('utf8');
    callback();
  }

  _flush(callback) {
    setImmediate(()=> {
      try {
        let res = JSON.parse(this[buf]);
        this[buf] = '';
        res['@context'] = res['@context'] || ctx;
        as.import(res, (err,obj)=> {
          if (err) return callback(err);
          this.push(obj);
          callback();
        });
      } catch (err) {
        callback(err);
      }
    });
  }
}

module.exports = AS2Stream;
