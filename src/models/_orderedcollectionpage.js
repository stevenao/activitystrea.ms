'use strict';

const  vocabs = require('linkeddata-vocabs');
const  util = require('util');
const  utils = require('../utils');
const  CollectionPage = require('./_collectionpage');
const  as = vocabs.as;

function OrderedCollectionPage(expanded, builder) {
  if (!(this instanceof OrderedCollectionPage))
    return new OrderedCollectionPage(expanded, builder);
  CollectionPage.call(this, expanded,
    builder || OrderedCollectionPage.Builder);
}
util.inherits(OrderedCollectionPage, CollectionPage);

OrderedCollectionPage.Builder = function(types, base) {
  if (!(this instanceof OrderedCollectionPage.Builder))
    return new OrderedCollectionPage.Builder(types, base);
  types = (types || []).concat([as.OrderedCollectionPage]);
  CollectionPage.Builder.call(
    this,
    types,
    base || new OrderedCollectionPage({}));
};
util.inherits(OrderedCollectionPage.Builder, CollectionPage.Builder);

utils.defineProperty(
  'startIndex',OrderedCollectionPage,
  function() {
    var ret = Math.max(0,this.get(as.startIndex));
    return isNaN(ret) ? 0 : ret;
  },
  function(val) {
    utils.set_non_negative_int.call(this, as.startIndex, val);
    return this;
  }
);

OrderedCollectionPage.Builder.prototype.items = function() {
  return this.orderedItems.apply(this,arguments);
};

module.exports = OrderedCollectionPage;
