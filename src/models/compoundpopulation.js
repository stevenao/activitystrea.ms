var Population = require('./population'),
    util = require('util'),
    utils = require('../utils'),
    vocabs = require('../vocabs');

function CompoundPopulation(store, reasoner, id, subject) {
  if (!(this instanceof CompoundPopulation))
    return new CompoundPopulation(store, reasoner, id, subject);
  Population.call(this, store, reasoner, id, subject);
}
util.inherits(CompoundPopulation, Population);
['member'].forEach(function(key) {
  utils.defineProperty(CompoundPopulation.prototype, key, function() {
    return this.get(vocabs.social[key]);
  });
});

CompoundPopulation.Builder = function(reasoner,types,base) {
  if (!(this instanceof CompoundPopulation.Builder))
    return new CompoundPopulation.Builder(reasoner,types,base);
  Population.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.social.CompoundPopulation, types),
    base || new CompoundPopulation(undefined,reasoner));
};
util.inherits(CompoundPopulation.Builder,Population.Builder);

CompoundPopulation.Builder.prototype.member = function(val) {
  this.set(vocabs.social.member, val);
  return this;
}

module.exports = CompoundPopulation;
