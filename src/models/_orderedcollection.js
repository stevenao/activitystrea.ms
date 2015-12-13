'use strict';

const Collection = require('./_collection');
const as = require('vocabs-as');
const slice = Array.prototype.slice;

class OrderedCollection extends Collection {
  constructor(expanded, builder, environment) {
    super(expanded, builder || OrderedCollection.Builder, environment);
  }
}

class OrderedCollectionBuilder extends Collection.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([as.OrderedCollection]);
    super(types, base || new OrderedCollection({}, undefined, environment));
  }

  get items() {
    return this.orderedItems;
  }
}
OrderedCollection.Builder = OrderedCollectionBuilder;

module.exports = OrderedCollection;
