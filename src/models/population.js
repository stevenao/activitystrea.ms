var AsObject = require('./asobject'),
    util = require('util'),
    utils = require('../utils');
    vocabs = require('../vocabs');

function Population(store, reasoner, id, subject) {
  if (!(this instanceof Population))
    return new Population(store, reasoner, id, subject);
  AsObject.call(this, store, reasoner, id, subject);
}
util.inherits(Population, AsObject);
['distance'].forEach(function(key) {
  utils.defineProperty(Population.prototype, key, function() {
    return this.get(vocabs.social[key]);
  });
});

Population.Builder = function(reasoner,types, base) {
  if (!(this instanceof Population.Builder))
    return new Population.Builder(reasoner, types, base);
  AsObject.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.social.Population, types),
    base || new Population(undefined, reasoner));
};
util.inherits(Population.Builder, AsObject.Builder);

Population.Builder.prototype.distance = function(val) {
  if (!utils.is_integer(val))
    throw new Error('distance must be a non-negative integer');
  val = Math.max(0,val);
  var options = {
    type: vocabs.xsd.nonNegativeInteger
  };
  this.set(vocabs.social.distance, val, options);
  return this;
};

module.exports = Population;
