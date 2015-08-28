'use strict';

const  Symbol   = require('es6-symbol');
const  vocabs   = require('linkeddata-vocabs');
const  util     = require('util');
const  utils    = require('../utils');
const  AsObject = require('./_object');
const  Base     = require('./_base');
const  as = vocabs.as;

const  _ordered = Symbol('ordered');
const  _items = Symbol('items');

const  slice = Array.prototype.slice;

function Collection(expanded, builder) {
  if (!(this instanceof Collection))
    return new Collection(expanded, builder);
  AsObject.call(this, expanded, builder || Collection.Builder);
}
util.inherits(Collection, AsObject);

Collection.Builder = function(types, base) {
  if (!(this instanceof Collection.Builder))
    return new Collection.Builder(types, base);
  types = (types || []).concat([as.Collection]);
  AsObject.Builder.call(
    this,
    types,
    base || new Collection({}));
  this[_ordered] = 0;
};
util.inherits(Collection.Builder, AsObject.Builder);

utils.defineProperty(
  'totalItems', Collection,
  function() {
    var ret = Math.max(0,this.get(as.totalItems));
    return isNaN(ret) ? 0 : ret ;
  },
  function(val) {
    utils.set_non_negative_int.call(this, as.totalItems, val);
    return this;
  }
);

utils.defineProperty(
  'itemsPerPage', Collection,
  function() {
    var ret = Math.max(0,this.get(as.itemsPerPage));
    return isNaN(ret) ? 0 : ret ;
  },
  function(val) {
    utils.set_non_negative_int.call(this, as.itemsPerPage, val);
    return this;
  }
);

utils.defineProperty(
  'current', Collection,
  function() {
    return this.get(as.current);
  },
  function(val) {
    this.set(as.current, val);
    return this;
  }
);

utils.defineProperty(
  'next', Collection,
  function() {
    return this.get(as.next);
  },
  function(val) {
    this.set(as.next, val);
    return this;
  }
);

utils.defineProperty(
  'prev', Collection,
  function() {
    return this.get(as.prev);
  },
  function(val) {
    this.set(as.prev, val);
    return this;
  }
);

utils.defineProperty(
  'last', Collection,
  function() {
    return this.get(as.last);
  },
  function(val) {
    this.set(as.last, val);
    return this;
  }
);

utils.defineProperty(
  'first', Collection,
  function() {
    return this.get(as.first);
  },
  function(val) {
    this.set(as.first, val);
    return this;
  }
);

utils.defineProperty(
  'self', Collection,
  function() {
    return this.get(as.self);
  },
  function(val) {
    this.set(as.self, val);
    return this;
  }
);

utils.defineProperty(
  'items', Collection,
  function() {
    var val = this.get(as.items);
    if (!val) return undefined;
    return Array.isArray(val) && Array.isArray(val[0]) ? val[0] : val;
  },
  function(val) {
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
);

utils.define(Collection.prototype, 'ordered', function() {
  return this[_ordered];
});

Collection.Builder.prototype.orderedItems = function(val) {
  utils.throwif(this[_ordered] < 0,
    'Ordered items cannot be added when the collection already ' +
    'contains unordered items');
  this[_ordered] = 1;
  if (!val) return this;
  if (!Array.isArray(val) && arguments.length > 1)
    val = slice.call(arguments);
  var set = false;
  if (!this[_items]) {
    this[_items] = Base.Builder();
    set = true;
  }
  this[_items].set('@list', val);
  if (set)
    this.set(as.items,this[_items].get());
  return this;
};

module.exports = Collection;
