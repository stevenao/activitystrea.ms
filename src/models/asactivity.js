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
var util     = require('util');
var utils    = require('../utils');
var vocabs   = require('../vocabs');

function AsActivity(store, reasoner, id, subject) {
  if (!(this instanceof AsActivity))
    return new AsActivity(store, reasoner, id, subject);
  AsObject.call(this, store, reasoner, id, subject);
}
util.inherits(AsActivity, AsObject);

utils.define(AsActivity.prototype, 'actor', function() {
  return this.get(vocabs.as.actor);
});
utils.define(AsActivity.prototype, 'object', function() {
  return this.get(vocabs.as.object);
});
utils.define(AsActivity.prototype, 'target', function() {
  return this.get(vocabs.as.target);
});
utils.define(AsActivity.prototype, 'result', function() {
  return this.get(vocabs.as.result);
});
utils.define(AsActivity.prototype, 'origin', function() {
  return this.get(vocabs.as.origin);
});
utils.define(AsActivity.prototype, 'priority', function() {
  return this.get(vocabs.as.priority);
});
utils.define(AsActivity.prototype, 'to', function() {
  return this.get(vocabs.as.to);
});
utils.define(AsActivity.prototype, 'bto', function() {
  return this.get(vocabs.as.bto);
});
utils.define(AsActivity.prototype, 'cc', function() {
  return this.get(vocabs.as.cc);
});
utils.define(AsActivity.prototype, 'bcc', function() {
  return this.get(vocabs.as.bcc);
});
utils.define(AsActivity.prototype, 'using', function() {
  return this.get(vocabs.as.using);
});

AsActivity.Builder = function(reasoner, types, base) {
  if (!(this instanceof AsActivity.Builder))
    return new AsActivity.Builder(reasoner, types, base);
  AsObject.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.Activity, types), 
    base || new AsActivity(undefined, reasoner));
};
util.inherits(AsActivity.Builder, AsObject.Builder);

AsActivity.Builder.prototype.actor = function(val) {
  this.set(vocabs.as.actor, val);
  return this;
};
AsActivity.Builder.prototype.object = function(val) {
  this.set(vocabs.as.object, val);
  return this;
};
AsActivity.Builder.prototype.target = function(val) {
  this.set(vocabs.as.target, val);
  return this;
};
AsActivity.Builder.prototype.result = function(val) {
  this.set(vocabs.as.result, val);
  return this;
};
AsActivity.Builder.prototype.origin = function(val) {
  this.set(vocabs.as.origin, val);
  return this;
};
AsActivity.Builder.prototype.to = function(val) {
  this.set(vocabs.as.to, val);
  return this;
};
AsActivity.Builder.prototype.bto = function(val) {
  this.set(vocabs.as.bto, val);
  return this;
};
AsActivity.Builder.prototype.cc = function(val) {
  this.set(vocabs.as.cc, val);
  return this;
};
AsActivity.Builder.prototype.bcc = function(val) {
  this.set(vocabs.as.bcc, val);
  return this;
};
AsActivity.Builder.prototype.priority = function(val) {
  utils.set_ranged_val.call(
    this, 
    vocabs.as.priority, 
    val, 0.0, 1.0, 
    vocabs.xsd.float);
  return this;
};
AsActivity.Builder.prototype.using = function(val) {
  this.set(vocabs.as.using, val);
  return this;
};

module.exports = AsActivity;
