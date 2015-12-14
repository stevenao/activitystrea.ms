'use strict';

const as = require('vocabs-as');
const Collection = require('./_collection');
const Base = require('./_base');
const composedType = Base.composedType;

const CollectionPage = composedType(Collection, {
  get partOf() {
    return this.get(as.partOf);
  },
  get next() {
    return this.get(as.next);
  },
  get prev() {
    return this.get(as.prev);
  }
});

const CollectionPageBuilder = composedType(Collection.Builder, {
  partOf(val) {
    return this.set(as.partOf, val);
  },
  next(val) {
    return this.set(as.next, val);
  },
  prev(val) {
    return this.set(as.prev, val);
  }
});

CollectionPage.Builder = CollectionPageBuilder;

module.exports = CollectionPage;
