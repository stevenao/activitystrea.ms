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
'use strict';

var Collection = require('./_collection');
var util = require('util');
var utils = require('../utils');
var as = require('linkeddata-vocabs').as;

function OrderedCollection(expanded,builder) {
  if (!(this instanceof OrderedCollection))
    return new OrderedCollection(expanded,builder);
  Collection.call(this,expanded,builder || OrderedCollection.Builder);
}
util.inherits(OrderedCollection, Collection);

OrderedCollection.Builder = function(types, base) {
  if (!(this instanceof OrderedCollection.Builder))
    return new OrderedCollection.Builder(types, base);
  types = (types || []).concat([as.OrderedCollection]);
  Collection.Builder.call(this, types, base || new OrderedCollection({}));
};
util.inherits(OrderedCollection.Builder, Collection.Builder);

utils.defineProperty(
  'startIndex',OrderedCollection,
  function() {
    var ret = Math.max(0,this.get(as.startIndex));
    return isNaN(ret) ? 0 : ret;
  },
  function(val) {
    utils.set_non_negative_int.call(this, as.startIndex, val);
    return this;
  }
);

OrderedCollection.Builder.prototype.items = function() {
  return this.orderedItems.apply(this,arguments);
};

module.exports = OrderedCollection;
