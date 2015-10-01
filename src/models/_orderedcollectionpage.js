'use strict';

const  as = require('linkeddata-vocabs').as;
const  utils = require('../utils');
const  CollectionPage = require('./_collectionpage');

class OrderedCollectionPage extends CollectionPage {
  constructor(expanded, builder) {
    super(expanded, builder || OrderedCollectionPage.Builder);
  }

  get startIndex() {
    var ret = Math.max(0,this.get(as.startIndex));
    return isNaN(ret) ? 0 : ret;
  }
}

class OrderedCollectionPageBuilder extends CollectionPage.Builder {
  constructor(types, base) {
    types = (types || []).concat([as.OrderedCollectionPage]);
    super(types, base || new OrderedCollectionPage({}));
  }

  startIndex(val) {
    utils.set_non_negative_int.call(this, as.startIndex, val);
    return this;
  }

  items() {
    return this.orderedItems.apply(this, arguments);
  }
}
OrderedCollectionPage.Builder = OrderedCollectionPageBuilder;

module.exports = OrderedCollectionPage;
