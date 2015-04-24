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
var util = require('util');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');
var AsObject = require('./_object');

function Connection(expanded, reasoner, parent) {
  if (!(this instanceof Connection))
    return new Connection(expanded, reasoner, parent);
  AsObject.call(this, expanded, reasoner, parent);
}
util.inherits(Connection, AsObject);

utils.define(Connection.prototype, 'a', function() {
  return this.get(vocabs.as.a);
});

utils.define(Connection.prototype, 'b', function() {
  return this.get(vocabs.as.b);
});

utils.define(Connection.prototype, 'relationship', function() {
  return this.get(vocabs.as.relationship);
});

Connection.Builder = function(reasoner,types,base) {
  if (!(this instanceof Connection.Builder))
    return new Connection.Builder(reasoner,types,base);
  AsObject.Builder.call(
    this,
    reasoner,
    utils.merge_types(reasoner,vocabs.as.Connection, types),
    base || new Connection({},reasoner));
};
util.inherits(Connection.Builder,AsObject.Builder);

Connection.Builder.prototype.a = function(val) {
  this.set(vocabs.as.a, val);
  return this;
};

Connection.Builder.prototype.b = function(val) {
  this.set(vocabs.as.b, val);
  return this;
};

Connection.Builder.prototype.relationship = function(val) {
  this.set(vocabs.as.relationship, val);
  return this;
};

module.exports = Connection;
