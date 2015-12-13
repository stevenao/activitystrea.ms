'use strict';

const as = require('vocabs-as');
const Collection = require('./_collection');

class CollectionPage extends Collection {
  constructor(expanded, builder, environment) {
    super(expanded, builder || CollectionPage.Builder, environment);
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
  constructor(types, base, environment) {
    types = (types || []).concat([as.CollectionPage]);
    super(types, base || new CollectionPage({}, undefined, environment));
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
