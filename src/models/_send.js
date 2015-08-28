'use strict';

var as = require('../activitystreams');

function get_request() {
  try {
    return require('request');
  } catch (err) {
    return;
  }
}

function noop(options, callback) {
  callback(Error('request module not installed'));
}

function send(options, callback) {
  var self = this;
  setImmediate(function() {
    var request = get_request();
    if (request) {
      if (typeof options === 'string') {
        options = {url:options};
      }
      options.headers = options.headers || {};
      options.headers['Content-Type'] = as.mediaType;
      self.pipe(
        request.post(options)
               .on('response', function(res) {
                 setImmediate(function() {
                   callback(null,res.statusCode,res);
                 });
               })
               .on('error', function(err) {
                 setImmediate(function() {
                   callback(err);
                 });
               }), options
      );
    } else {
      callback(Error('request module not installed'));
    }
  });
}

function include_send(prototype) {
  var request = get_request();
  Object.defineProperty(prototype, 'send', {
    configurable: false,
    enumerable: true,
    value: request ? send : noop
  });
}

module.exports = include_send;
