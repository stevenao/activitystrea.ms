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

function ActivityHandler(store, reasoner, id, subject) {
  if (!(this instanceof ActivityHandler))
    return new ActivityHandler(store, reasoner, id, subject);
  Base.call(this, store, reasoner, id, subject);
}
util.inherits(ActivityHandler, Base);

utils.define(ActivityHandler.prototype, 'confirm', function() {
  return this.get(vocabs.as.confirm);
});
utils.define(ActivityHandler.prototype, 'handlerFor', function() {
  return this.get(vocabs.as.handlerFor);
});
utils.define(ActivityHandler.prototype, 'hasExpectedInput', function() {
  return this.get(vocabs.as.hasExpectedInput);
});
utils.define(ActivityHandler.prototype, 'hasPotentialResult', function() {
  return this.get(vocabs.as.hasPotentialResult);
});
utils.define(ActivityHandler.prototype, 'hasPreference', function() {
  return this.get(vocabs.as.hasPreference);
});
utils.define(ActivityHandler.prototype, 'hasRequirement', function() {
  return this.get(vocabs.as.hasRequirement);
});

ActivityHandler.Builder = function(reasoner,types, base) {
  if (!(this instanceof ActivityHandler.Builder))
    return new ActivityHandler.Builder(reasoner, types, base);
  Base.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.ActivityHandler, types),
    base || new ActivityHandler(undefined, reasoner));
};
util.inherits(ActivityHandler.Builder, Base.Builder);

ActivityHandler.Builder.prototype.confirm = function(val) {
  if (typeof val === 'undefined') val = true;
  this.set(vocabs.as.confirm, Boolean(val).valueOf(), {type:vocabs.xsd.boolean});
  return this;
};
ActivityHandler.Builder.prototype.handlerFor = function(val) {
  this.set(vocabs.as.handlerFor, val);
  return this;
};
ActivityHandler.Builder.prototype.hasExpectedInput = function(val) {
  this.set(vocabs.as.hasExpectedInput, val);
  return this;
};
ActivityHandler.Builder.prototype.hasPotentialResult = function(val) {
  this.set(vocabs.as.hasPotentialResult, val);
  return this;
};
ActivityHandler.Builder.prototype.hasPreference = function(val) {
  this.set(vocabs.as.hasPreference, val);
  return this;
};
ActivityHandler.Builder.prototype.hasRequirement = function(val) {
  this.set(vocabs.as.hasRequirement, val);
  return this;
};

module.exports = ActivityHandler;
