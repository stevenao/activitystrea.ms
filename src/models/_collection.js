'use strict';

const  vocabs   = require('linkeddata-vocabs');
const  utils    = require('../utils');
const  AsObject = require('./_object');
const  Base     = require('./_base');
const  as = vocabs.as;

const  _ordered = Symbol('ordered');
const  _items = Symbol('items');
const  slice = Array.prototype.slice;

function isIterable(i) {
  return i && (typeof i.next === 'function' ||
               typeof i[Symbol.iterator] === 'function');
}

class Collection extends AsObject {
  constructor(expanded, builder) {
    super(expanded, builder || Collection.Builder);
  }

  get totalItems() {
    var ret = Math.max(0,this.get(as.totalItems));
    return isNaN(ret) ? 0 : ret ;
  }

  get current() {
    return this.get(as.current);
  }

  get last() {
    return this.get(as.last);
  }

  get first() {
    return this.get(as.first);
  }

  get items() {
    var val = this.get(as.items);
    if (!val) return undefined;
    return Array.isArray(val) && Array.isArray(val[0]) ? val[0] : val;
  }

}

class CollectionBuilder extends AsObject.Builder {
  constructor(types, base) {
    types = (types || []).concat([as.Collection]);
    super(types, base || new Collection({}));
    this[_ordered] = 0;
  }

  totalItems(val) {
    utils.set_non_negative_int.call(this, as.totalItems, val);
    return this;
  }

  current(val) {
    return this.set(as.current, val);
  }

  last(val) {
    return this.set(as.last, val);
  }

  first(val) {
    return this.set(as.first, val);
  }

  items(val) {
    utils.throwif(this[_ordered] > 0,
      'Unordered items cannot be added when the collection already ' +
      'contains ordered items');
    this[_ordered] = -1;
    if (!val) return this;
    if (!Array.isArray(val) && arguments.length > 1)
      val = slice.call(arguments);
    this.set(as.items, val);
    return this;
  }

  orderedItems(val) {
    utils.throwif(this[_ordered] < 0,
      'Ordered items cannot be added when the collection already ' +
      'contains unordered items');
    this[_ordered] = 1;
    if (!val) return this;
    if (!Array.isArray(val) && arguments.length > 1)
      val = slice.call(arguments);
    var set = false;
    if (!this[_items]) {
      this[_items] = new Base.Builder();
      set = true;
    }
    this[_items].set('@list', val);
    if (set)
      this.set(as.items,this[_items].get());
    return this;
  }

  get ordered() {
    return this[_ordered];
  }
}
Collection.Builder = CollectionBuilder;

module.exports = Collection;
