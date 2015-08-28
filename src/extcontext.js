'use strict';

const ctx = [];

exports.add = function(context) {
  // todo add checking...
  ctx.push(context);
};

exports.get = function() {
  return ctx;
};
