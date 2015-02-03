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
var ActivityHandler = require('./activityhandler');
var Content = require('./ascontent');
var ASObject = require('./asobject');
var util = require('util');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');

function EmbeddedView(store, reasoner, id, subject) {
  if (!(this instanceof EmbeddedView))
    return new EmbeddedView(store, reasoner, id, subject);
  ActivityHandler.call(this, store, reasoner, id, subject);
}
util.inherits(EmbeddedView, ActivityHandler);
utils.mixin(EmbeddedView, Content);
utils.mixin(EmbeddedView, ASObject);

utils.define(EmbeddedView.prototype, 'mediaType', function() {
  return this.get(vocabs.as.mediaType);
});
utils.define(EmbeddedView.prototype, 'sandbox', function() {
  return this.get(vocabs.as.sandbox);
});

EmbeddedView.Builder = function(reasoner, types, base) {
  if (!(this instanceof EmbeddedView.Builder))
    return new EmbeddedView.Builder(reasoner, types, base);
  ActivityHandler.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.EmbeddedView, types),
    base || new EmbeddedView(undefined, reasoner));
};
util.inherits(EmbeddedView.Builder, ActivityHandler.Builder);
utils.mixin(EmbeddedView.Builder, Content.Builder);
utils.mixin(EmbeddedView.Builder, ASObject.Builder);

EmbeddedView.Builder.prototype.mediaType = function(val) {
  this.set(vocabs.as.mediaType, val);
  return this;
};
EmbeddedView.Builder.prototype.sandbox = function(val) {
  this.set(vocabs.as.sandbox, val);
  return this;
};

module.exports = EmbeddedView;
