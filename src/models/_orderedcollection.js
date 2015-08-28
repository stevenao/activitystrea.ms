'use strict';

var Collection = require('./_collection');
var util = require('util');
var utils = require('../utils');
var as = require('linkeddata-vocabs').as;

function OrderedCollection(expanded,builder) {
  if (!(this instanceof OrderedCollection))
    return new OrderedCollection(expanded,builder);
  Collection.call(this,expanded,builder || OrderedCollection.Builder);
}
util.inherits(OrderedCollection, Collection);

OrderedCollection.Builder = function(types, base) {
  if (!(this instanceof OrderedCollection.Builder))
    return new OrderedCollection.Builder(types, base);
  types = (types || []).concat([as.OrderedCollection]);
  Collection.Builder.call(this, types, base || new OrderedCollection({}));
};
util.inherits(OrderedCollection.Builder, Collection.Builder);

utils.defineProperty(
  'startIndex',OrderedCollection,
  function() {
    var ret = Math.max(0,this.get(as.startIndex));
    return isNaN(ret) ? 0 : ret;
  },
  function(val) {
    utils.set_non_negative_int.call(this, as.startIndex, val);
    return this;
  }
);

OrderedCollection.Builder.prototype.items = function() {
  return this.orderedItems.apply(this,arguments);
};

module.exports = OrderedCollection;
