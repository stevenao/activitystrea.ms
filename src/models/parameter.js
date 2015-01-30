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
var Base = require('./base');
var util = require('util');
var utils = require('../utils');
var vocabs = require('../vocabs');

function Parameter(store, reasoner, id, subject) {
  if (!(this instanceof Parameter))
    return new Parameter(store, reasoner, id, subject);
  Base.call(this, store, reasoner, id, subject);
}
util.inherits(Parameter, Base);

utils.define(Parameter.prototype, 'name', function() {
  return this.get(vocabs.as.name);
});
utils.define(Parameter.prototype, 'role', function() {
  return this.get(vocabs.as.role);
});
utils.define(Parameter.prototype, 'optional', function() {
  return this.get(vocabs.as.optional);
});
utils.define(Parameter.prototype, 'shape', function() {
  return this.get(vocabs.as.shape);
});

Parameter.Builder = function(reasoner,types, base) {
  if (!(this instanceof Parameter.Builder))
    return new Parameter.Builder(reasoner, types, base);
  Base.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.Parameter, types),
    base || new Parameter(undefined, reasoner));
};
util.inherits(Parameter.Builder, Base.Builder);

Parameter.Builder.prototype.name = function(val) {
  this.set(vocabs.as.name, val);
  return this;
};
Parameter.Builder.prototype.role = function(val) {
  this.set(vocabs.as.role, val);
  return this;
};
Parameter.Builder.prototype.shape = function(val) {
  this.set(vocabs.as.shape, val);
  return this;
};
Parameter.Builder.prototype.optional = function(val) {
  if (typeof val === 'undefined') val = true;
  this.set(vocabs.as.optional, Boolean(val).valueOf(), {type:vocabs.xsd.boolean});
  return this;
};

module.exports = Parameter;
