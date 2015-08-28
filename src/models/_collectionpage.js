'use strict';

const  vocabs = require('linkeddata-vocabs');
const  util = require('util');
const  utils = require('../utils');
const  Collection = require('./_collection');
const  as = vocabs.as;

function CollectionPage(expanded, builder) {
  if (!(this instanceof CollectionPage))
    return new CollectionPage(expanded, builder);
  Collection.call(this, expanded, builder || CollectionPage.Builder);
}
util.inherits(CollectionPage, Collection);

CollectionPage.Builder = function(types, base) {
  if (!(this instanceof CollectionPage.Builder))
    return new CollectionPage.Builder(types, base);
  types = (types || []).concat([as.CollectionPage]);
  Collection.Builder.call(
    this,
    types,
    base || new CollectionPage({}));
};
util.inherits(CollectionPage.Builder, Collection.Builder);

utils.defineProperty(
  'partOf', CollectionPage,
  function() {
    return this.get(as.partOf);
  },
  function(val) {
    this.set(as.partOf, val);
    return this;
  }
);

utils.defineProperty(
  'next', CollectionPage,
  function() {
    return this.get(as.next);
  },
  function(val) {
    this.set(as.next, val);
    return this;
  }
);

utils.defineProperty(
  'prev', CollectionPage,
  function() {
    return this.get(as.prev);
  },
  function(val) {
    this.set(as.prev, val);
    return this;
  }
);

module.exports = CollectionPage;
