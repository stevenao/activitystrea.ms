'use strict';

const as = require('vocabs-as');
const xsd = require('vocabs-xsd');
const range = require('../utils').range;
const CollectionPage = require('./_collectionpage');

class OrderedCollectionPage extends CollectionPage {
  constructor(expanded, builder, environment) {
    super(expanded, builder || OrderedCollectionPage.Builder, environment);
  }

  get startIndex() {
    let ret = Math.max(0,this.get(as.startIndex));
    return isNaN(ret) ? 0 : ret;
  }
}

class OrderedCollectionPageBuilder extends CollectionPage.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([as.OrderedCollectionPage]);
    super(types, base || new OrderedCollectionPage({}, undefined, environment));
  }

  startIndex(val) {
    this.set(
      as.startIndex,
      range(0, Infinity, val),
      {type: xsd.nonNegativeInteger});
    return this;
  }

  items() {
    return this.orderedItems.apply(this, arguments);
  }
}
OrderedCollectionPage.Builder = OrderedCollectionPageBuilder;

module.exports = OrderedCollectionPage;
