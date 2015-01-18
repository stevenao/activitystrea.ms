var Population = require('./population'),
    util = require('util'),
    utils = require('../utils'),
    vocabs = require('../vocabs');

function Everyone(store, reasoner, id, subject) {
  if (!(this instanceof Everyone))
    return new Everyone(store, reasoner, id, subject);
  Population.call(this, store, reasoner, id, subject);
}
util.inherits(Everyone, Population);
['havingRelationship', 'havingRole'].forEach(function(key) {
  utils.defineProperty(Everyone.prototype, key, function() {
    return this.get(vocabs.social[key]);
  });
});

Everyone.Builder = function(reasoner,types,base) {
  if (!(this instanceof Everyone.Builder))
    return new Everyone.Builder(reasoner,types,base);
  Population.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.social.Everyone, types),
    base || new Everyone(undefined,reasoner));
};
util.inherits(Everyone.Builder,Population.Builder);

['havingRelationship', 'havingRole'].forEach(function(key) {
  Everyone.Builder.prototype[key] = function(val) {
    this.set(vocabs.social[key], val);
    return this;
  }
});

module.exports = Everyone;
