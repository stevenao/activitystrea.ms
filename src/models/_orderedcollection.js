'use strict';

const Collection = require('./_collection');
const util = require('util');
const utils = require('../utils');
const as = require('linkeddata-vocabs').as;

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

OrderedCollection.Builder.prototype.items = function() {
  return this.orderedItems.apply(this,arguments);
};

module.exports = OrderedCollection;
