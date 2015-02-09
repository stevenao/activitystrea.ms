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
var Base = require('./_base');
var util = require('util');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');

function HttpHeader(expanded, reasoner, parent) {
  if (!(this instanceof HttpHeader))
    return new HttpHeader(expanded, reasoner, parent);
  Base.call(this, expanded, reasoner, parent);
}
util.inherits(HttpHeader, Base);

utils.define(HttpHeader.prototype, 'name', function() {
  return this.get(vocabs.as.name);
});
utils.define(HttpHeader.prototype, 'shape', function() {
  return this.get(vocabs.as.shape);
});

HttpHeader.Builder = function(reasoner,types, base) {
  if (!(this instanceof HttpHeader.Builder))
    return new HttpHeader.Builder(reasoner, types, base);
  Base.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.HttpHeader, types),
    base || new HttpHeader({}, reasoner));
};
util.inherits(HttpHeader.Builder, Base.Builder);

HttpHeader.Builder.prototype.name = function(val) {
  this.set(vocabs.as.name, val);
  return this;
};
HttpHeader.Builder.prototype.shape = function(val) {
  this.set(vocabs.as.shape, val);
  return this;
};

module.exports = HttpHeader;
