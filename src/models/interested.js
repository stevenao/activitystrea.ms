var Population = require('./population'),
    util = require('util'),
    utils = require('../utils'),
    vocabs = require('../vocabs');

function Interested(store, reasoner, id, subject) {
  if (!(this instanceof Interested))
    return new Interested(store, reasoner, id, subject);
  Population.call(this, store, reasoner, id, subject);
}
util.inherits(Interested, Population);
['confidence'].forEach(function(key) {
  utils.defineProperty(Interested.prototype, key, function() {
    return this.get(vocabs.social[key]);
  });
});

Interested.Builder = function(reasoner,types,base) {
  if (!(this instanceof Interested.Builder))
    return new Interested.Builder(reasoner,types,base);
  Population.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.social.Interested, types),
    base || new Interested(undefined,reasoner));
};
util.inherits(Interested.Builder,Population.Builder);

Interested.Builder.prototype.confidence = function(val) {
  if (!utils.is_integer(val))
    throw new Error('confidence must be an integer between 0 and 100');
  val = Math.max(0, Math.min(100, val));
  this.set(vocabs.social.confidence, val);
  return this;
}

module.exports = Interested;
