'use strict';

const util       = require('util');
const Population = require('./_population');
const utils      = require('../utils');
const social     = require('linkeddata-vocabs').social;

function Interested(expanded, builder) {
  if (!(this instanceof Interested))
    return new Interested(expanded, builder);
  Population.call(this, expanded, builder || Interested.Builder);
}
util.inherits(Interested, Population);

Interested.Builder = function(types,base) {
  if (!(this instanceof Interested.Builder))
    return new Interested.Builder(types,base);
  types = (types || []).concat([social.Interested]);
  Population.Builder.call(this, types, base || new Interested({}));
};
util.inherits(Interested.Builder,Population.Builder);

utils.defineProperty(
  'confidence',Interested,
  function() {
    var ret = Math.min(100,Math.max(0,this.get(social.confidence)));
    return isNaN(ret) ? undefined : ret;
  },
  function(val) {
    if (!utils.is_integer(val))
      throw Error('confidence must be an integer between 0 and 100');
    val = Math.max(0, Math.min(100, val));
    this.set(social.confidence, val);
    return this;
  }
);

module.exports = Interested;
