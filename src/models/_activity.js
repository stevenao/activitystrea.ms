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
var util     = require('util');
var vocabs   = require('linkeddata-vocabs');
var reasoner = require('../reasoner');
var utils    = require('../utils');
var AsObject = require('./_object');

function Activity(expanded) {
  if (!(this instanceof Activity))
    return new Activity(expanded);
  AsObject.call(this, expanded);
}
util.inherits(Activity, AsObject);

utils.define(Activity.prototype, 'actor', function() {
  return this.get(vocabs.as.actor);
});
utils.define(Activity.prototype, 'object', function() {
  return this.get(vocabs.as.object);
});
utils.define(Activity.prototype, 'target', function() {
  return this.get(vocabs.as.target);
});
utils.define(Activity.prototype, 'result', function() {
  return this.get(vocabs.as.result);
});
utils.define(Activity.prototype, 'origin', function() {
  return this.get(vocabs.as.origin);
});
utils.define(Activity.prototype, 'priority', function() {
  return this.get(vocabs.as.priority);
});
utils.define(Activity.prototype, 'instrument', function() {
  return this.get(vocabs.as.instrument);
});

Activity.Builder = function(types, base) {
  if (!(this instanceof Activity.Builder))
    return new Activity.Builder(types, base);
  AsObject.Builder.call(
    this,
    utils.merge_types(reasoner,vocabs.as.Activity, types),
    base || new Activity({}));
};
util.inherits(Activity.Builder, AsObject.Builder);

Activity.Builder.prototype.actor = function(val) {
  this.set(vocabs.as.actor, val);
  return this;
};
Activity.Builder.prototype.object = function(val) {
  this.set(vocabs.as.object, val);
  return this;
};
Activity.Builder.prototype.target = function(val) {
  this.set(vocabs.as.target, val);
  return this;
};
Activity.Builder.prototype.result = function(val) {
  this.set(vocabs.as.result, val);
  return this;
};
Activity.Builder.prototype.origin = function(val) {
  this.set(vocabs.as.origin, val);
  return this;
};
Activity.Builder.prototype.instrument = function(val) {
  this.set(vocabs.as.instrument, val);
  return this;
};
Activity.Builder.prototype.priority = function(val) {
  utils.set_ranged_val.call(
    this,
    vocabs.as.priority,
    val, 0.0, 1.0,
    vocabs.xsd.float);
  return this;
};
module.exports = Activity;
