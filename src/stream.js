'use strict';

const Transform = require('readable-stream/transform');
const inherits = require('util').inherits;
const as = require('./activitystreams');
const context = require('activitystreams-context');
const Symbol = require('es6-symbol');
const buf = Symbol('buffer');

function AS2Stream(options) {
  if (!(this instanceof AS2Stream))
    return new AS2Stream(options);
  options = options || {};
  if (!options.highWaterMark)
    options.highWaterMark = 1;
  options.objectMode = true;
  Transform.call(this, options);
  this[buf] = '';
}
inherits(AS2Stream, Transform);

AS2Stream.prototype._transform = function(chunk, encoding, callback) {
  this[buf] += chunk.toString('utf8');
  callback();
};

AS2Stream.prototype._flush = function(callback) {
  var self = this;
  setImmediate(function() {
    try {
      var res = JSON.parse(self[buf]);
      self[buf] = '';
      res['@context'] = res['@context'] || context;
      as.import(res, function(err,obj) {
        if (err) {
          callback(err);
          return;
        }
        self.push(obj);
        callback();
      });
    } catch (err) {
      callback(err);
    }
  });
};

module.exports = AS2Stream;
