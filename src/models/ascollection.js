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
var AsObject = require('./asobject');
var Base     = require('./base');
var util     = require('util');
var utils    = require('../utils');
var vocabs   = require('linkeddata-vocabs');
var models   = require('../models');

function is_ordered(base) {
  var i = base.get(vocabs.as.items);
  return i.length && i[0].get(vocabs.rdf.first);
}

function AsCollection(store, reasoner, id, subject) {
  if (!(this instanceof AsCollection))
    return new AsCollection(store, reasoner, id, subject);
  AsObject.call(this, store, reasoner, id, subject);
  utils.hidden(this, 'ordered', is_ordered(this));
}
util.inherits(AsCollection, AsObject);

utils.define(AsCollection.prototype, 'totalItems', function() {
  var ret = Math.max(0,this.get(vocabs.as.totalItems));
  return isNaN(ret) ? 0 : ret ;
});
utils.define(AsCollection.prototype, 'itemsPerPage', function() {
  var ret = Math.max(0,this.get(vocabs.as.itemsPerPage));
  return isNaN(ret) ? 0 : ret ;
});
utils.define(AsCollection.prototype, 'current', function() {
  return this.get(vocabs.as.current);
});
utils.define(AsCollection.prototype, 'next', function() {
  return this.get(vocabs.as.next);
});
utils.define(AsCollection.prototype, 'prev', function() {
  return this.get(vocabs.as.prev);
});
utils.define(AsCollection.prototype, 'last', function() {
  return this.get(vocabs.as.last);
});
utils.define(AsCollection.prototype, 'first', function() {
  return this.get(vocabs.as.first);
});
utils.define(AsCollection.prototype, 'self', function() {
  return this.get(vocabs.as.self);
});

utils.define(AsCollection.prototype, 'indexRange', function() {
  return this.get(vocabs.asx.indexRange);
});
utils.define(AsCollection.prototype, 'publishedRange', function() {
  return this.get(vocabs.asx.publishedRange);
});
utils.define(AsCollection.prototype, 'startTimeRange', function() {
  return this.get(vocabs.asx.startTimeRange);
});

utils.define(AsCollection.prototype, 'items', function() {
  var val = this.get(vocabs.as.items);
  if (this.ordered && !this._cache[vocabs.as.items]._unwound) {
    var current = val[0];
    var ret = [];
    while(true) {
      ret.push(current.get(vocabs.rdf.first));
      current = current.get(vocabs.rdf.rest);
      if (current.id == vocabs.rdf.nil) break;
    }
    val = ret;
    this._cache[vocabs.as.items]._unwound = true;
  }
  return val;
});

function set_current_item(current, val) {
  var builder = Base.Builder();
  builder.set(vocabs.rdf.first, val);
  builder.set(vocabs.rdf.rest, vocabs.rdf.nil);
  val = builder.get();
  var _store = this._base._store;
  var _base = this._base;
  var id;
  if (!current) {
    id = Base.merge_into.call(_base, vocabs.as.items, val);
  } else {
    _store.findByUri(current._subject, vocabs.rdf.rest, null).forEach(_store.removeTriple);
    id = Base.merge_into.call(current, vocabs.rdf.rest, val);
  }
  current = models.wrap_object(_store,_base._reasoner,id,id);
  return current;
}

AsCollection.Builder = function(reasoner, types, base) {
  if (!(this instanceof AsCollection.Builder))
    return new AsCollection.Builder(reasoner, types, base);
  AsObject.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner, vocabs.as.Collection, types), 
    base || new AsCollection(undefined, reasoner));
  utils.hidden(this, '_current', null, true);
  utils.hidden(this, '_ordered', 0, true);
};
util.inherits(AsCollection.Builder, AsObject.Builder);

AsCollection.Builder.prototype.totalItems = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.totalItems, val);
  return this;
};
AsCollection.Builder.prototype.itemsPerPage = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.itemsPerPage, val);
  return this;
};
AsCollection.Builder.prototype.current = function(val) {
  this.set(vocabs.as.current, val);
  return this;
};
AsCollection.Builder.prototype.next = function(val) {
  this.set(vocabs.as.next, val);
  return this;
};
AsCollection.Builder.prototype.prev = function(val) {
  this.set(vocabs.as.prev, val);
  return this;
};
AsCollection.Builder.prototype.first = function(val) {
  this.set(vocabs.as.first, val);
  return this;
};
AsCollection.Builder.prototype.last = function(val) {
  this.set(vocabs.as.last, val);
  return this;
};
AsCollection.Builder.prototype.self = function(val) {
  this.set(vocabs.as.self, val);
  return this;
};

AsCollection.Builder.prototype.indexRange = function(val) {
  this.set(vocabs.asx.indexRange, val);
  return this;
};
AsCollection.Builder.prototype.publishedRange = function(val) {
  this.set(vocabs.asx.publishedRange, val);
  return this;
};
AsCollection.Builder.prototype.startTimeRange = function(val) {
  this.set(vocabs.asx.startTimeRange, val);
  return this;
};

var slice = Array.prototype.slice;

AsCollection.Builder.prototype.items = function(val) {
  utils.throwif(this._ordered > 0, 'Unordered items cannot be added when the collection already contains ordered items');
  this._ordered = -1;
  if (!val) return this;
  if (!Array.isArray(val) && arguments.length > 1)
    val = slice.call(arguments);
  this.set(vocabs.as.items, val);
  return this;
};
AsCollection.Builder.prototype.orderedItems = function(val) {
  utils.throwif(this._ordered < 0, 'Ordered items cannot be added when the collection already contains unordered items');
  this._ordered = 1;
  if (!val) return this;
  if (!Array.isArray(val)) {
    val = arguments.length > 1 ?
      slice.call(arguments) :
      [val] ;
  }
  for (var n = 0, l = val.length; n < l; n++) {
    this._current = set_current_item.call(this, this._current, val[n]);
  }
  return this;
};

module.exports = AsCollection;


