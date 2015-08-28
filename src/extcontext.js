'use strict';

var ctx = [];

exports.add = function(context) {
  // todo add checking...
  ctx.push(context);
};

exports.get = function() {
  return ctx;
};
