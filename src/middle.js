'use strict';

var stream = require('readable-stream');
var as = require('./activitystreams');

function AS2Writer(req) {
  if (!(this instanceof AS2Writer))
    return new AS2Writer(req);
  stream.Writable.call(this,{objectMode:true});
  this.req = req;
}
require('util').inherits(AS2Writer,stream.Writable);
AS2Writer.prototype._write = function(chunk, encoding, callback) {
  this.req.body = chunk;
  callback();
};

function as2middleware(req,res,next) {
  function error() {
    res.status(400).end('Could not successfully parse payload');
  }
  if (req.body) {
    next(); // already parsed
    return;
  }
  if (req.is('application/json') || req.is('application/*+json')) {
    var str = new as.Stream();
    req.pipe(str)
       .on('end', function() {next();})
       .on('error', error)
       .pipe(new AS2Writer(req))
       .on('error', error);
  } else {
    next(); // nothing to do
  }
}

module.exports = as2middleware;
