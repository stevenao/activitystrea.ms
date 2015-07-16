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

var _ordered = Symbol('ordered');

function is_ordered(base) {
  var i = base.get(vocabs.as.items);
  return i && i.length && i[0].get(vocabs.rdf.first);
}

function Collection(expanded) {
  if (!(this instanceof Collection))
    return new Collection(expanded);
  AsObject.call(this, expanded);
  this[_ordered] = is_ordered(this);
}
util.inherits(Collection, AsObject);

utils.define(Collection.prototype, 'totalItems', function() {
  var ret = Math.max(0,this.get(vocabs.as.totalItems));
  return isNaN(ret) ? 0 : ret ;
});
utils.define(Collection.prototype, 'itemsPerPage', function() {
  var ret = Math.max(0,this.get(vocabs.as.itemsPerPage));
  return isNaN(ret) ? 0 : ret ;
});
utils.define(Collection.prototype, 'current', function() {
  return this.get(vocabs.as.current);
});
utils.define(Collection.prototype, 'next', function() {
  return this.get(vocabs.as.next);
});
utils.define(Collection.prototype, 'prev', function() {
  return this.get(vocabs.as.prev);
});
utils.define(Collection.prototype, 'last', function() {
  return this.get(vocabs.as.last);
});
utils.define(Collection.prototype, 'first', function() {
  return this.get(vocabs.as.first);
});
utils.define(Collection.prototype, 'self', function() {
  return this.get(vocabs.as.self);
});
utils.define(Collection.prototype, 'ordered', function() {
  return this[_ordered];
});

utils.define(Collection.prototype, 'items', function() {
  var val = this.get(vocabs.as.items);
  if (!val) return undefined;
  return val['@list'] || val;
});

Collection.Builder = function(types, base) {
  if (!(this instanceof Collection.Builder))
    return new Collection.Builder(types, base);
  AsObject.Builder.call(
    this,
    utils.merge_types(reasoner, vocabs.as.Collection, types),
    base || new Collection({}));
  this[_ordered] = 0;
};
util.inherits(Collection.Builder, AsObject.Builder);

Collection.Builder.prototype.totalItems = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.totalItems, val);
  return this;
};
Collection.Builder.prototype.itemsPerPage = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.itemsPerPage, val);
  return this;
};
Collection.Builder.prototype.current = function(val) {
  this.set(vocabs.as.current, val);
  return this;
};
Collection.Builder.prototype.next = function(val) {
  this.set(vocabs.as.next, val);
  return this;
};
Collection.Builder.prototype.prev = function(val) {
  this.set(vocabs.as.prev, val);
  return this;
};
Collection.Builder.prototype.first = function(val) {
  this.set(vocabs.as.first, val);
  return this;
};
Collection.Builder.prototype.last = function(val) {
  this.set(vocabs.as.last, val);
  return this;
};
Collection.Builder.prototype.self = function(val) {
  this.set(vocabs.as.self, val);
  return this;
};

var slice = Array.prototype.slice;

Collection.Builder.prototype.items = function(val) {
  utils.throwif(this[_ordered] > 0, 'Unordered items cannot be added when the collection already contains ordered items');
  this[_ordered] = -1;
  if (!val) return this;
  if (!Array.isArray(val) && arguments.length > 1)
    val = slice.call(arguments);
  this.set(vocabs.as.items, val);
  return this;
};
Collection.Builder.prototype.orderedItems = function(val) {
  utils.throwif(this[_ordered] < 0, 'Ordered items cannot be added when the collection already contains unordered items');
  this[_ordered] = 1;
  if (!val) return this;
  if (!Array.isArray(val) && arguments.length > 1)
    val = slice.call(arguments);
  var _list = Base.Builder();
  _list.set('@list', val);
  this.set(vocabs.as.items,_list.get());
  return this;
};

module.exports = Collection;
