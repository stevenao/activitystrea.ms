var Population = require('./population'),
    util = require('util'),
    utils = require('../utils'),
    vocabs = require('../vocabs');

function Common(store, reasoner, id, subject) {
  if (!(this instanceof Common))
    return new Common(store, reasoner, id, subject);
  Population.call(this, store, reasoner, id, subject);
}
util.inherits(Common, Population);
['havingDimension', 'confidence'].forEach(function(key) {
  utils.defineProperty(Common.prototype, key, function() {
    return this.get(vocabs.social[key]);
  });
});

Common.Builder = function(reasoner,types,base) {
  if (!(this instanceof Common.Builder))
    return new Common.Builder(reasoner,types,base);
  Population.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.social.Common, types),
    base || new Common(undefined,reasoner));
};
util.inherits(Common.Builder,Population.Builder);

Common.Builder.prototype.havingDimension = function(val) {
  this.set(vocabs.social.havingDimension, val);
  return this;
}

Common.Builder.prototype.confidence = function(val) {
  if (!utils.is_integer(val))
    throw new Error('confidence must be an integer between 0 and 100');
  val = Math.max(0, Math.min(100, val));
  this.set(vocabs.social.confidence, val);
  return this;
}

module.exports = Common;
