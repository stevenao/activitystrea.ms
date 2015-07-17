/**
 * Copyright 2013 International Business Machines Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Utility library for working with Activity Streams Actions
 * Requires underscorejs.
 *
 * @author James M Snell (jasnell@us.ibm.com)
 */
var vocabs   = require('linkeddata-vocabs');
var util     = require('util');
var reasoner = require('../reasoner');
var utils    = require('../utils');
var models   = require('../models');
var AsObject = require('./_object');
var Base     = require('./_base');
var as = vocabs.as;
var rdf = vocabs.rdf;

var _ordered = Symbol('ordered');
var slice = Array.prototype.slice;

function is_ordered(base) {
  var i = base.get(as.items);
  return i && i.length && i[0].get(rdf.first);
}

function Collection(expanded, builder) {
  if (!(this instanceof Collection))
    return new Collection(expanded, builder);
  AsObject.call(this, expanded, builder || Collection.Builder);
  this[_ordered] = is_ordered(this);
}
util.inherits(Collection, AsObject);

Collection.Builder = function(types, base) {
  if (!(this instanceof Collection.Builder))
    return new Collection.Builder(types, base);
  AsObject.Builder.call(
    this,
    utils.merge_types(reasoner, as.Collection, types),
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
    return val['@list'] || val;
  },
  function(val) {
    utils.throwif(this[_ordered] > 0, 'Unordered items cannot be added when the collection already contains ordered items');
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
  utils.throwif(this[_ordered] < 0, 'Ordered items cannot be added when the collection already contains unordered items');
  this[_ordered] = 1;
  if (!val) return this;
  if (!Array.isArray(val) && arguments.length > 1)
    val = slice.call(arguments);
  var _list = Base.Builder();
  _list.set('@list', val);
  this.set(as.items,_list.get());
  return this;
};

module.exports = Collection;
