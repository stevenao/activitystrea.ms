'use strict';

const  as = require('linkeddata-vocabs').as;
const  utils = require('../utils');
const  Collection = require('./_collection');

class CollectionPage extends Collection {
  constructor(expanded, builder) {
    super(expanded, builder || CollectionPage.Builder);
  }

  get partOf() {
    return this.get(as.partOf);
  }

  get next() {
    return this.get(as.next);
  }

  get prev() {
    return this.get(as.prev);
  }
}

class CollectionPageBuilder extends Collection.Builder {
  constructor(types, base) {
    types = (types || []).concat([as.CollectionPage]);
    super(types, base || new CollectionPage({}));
  }

  partOf(val) {
    return this.set(as.partOf, val);
  }

  next(val) {
    return this.set(as.next, val);
  }

  prev(val) {
    return this.set(as.prev, val);
  }
}
CollectionPage.Builder = CollectionPageBuilder;

module.exports = CollectionPage;
