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
var Link = require('./aslink');
var util = require('util');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');

function BrowserView(store, reasoner, id, subject) {
  if (!(this instanceof BrowserView))
    return new BrowserView(store, reasoner, id, subject);
  ActivityHandler.call(this, store, reasoner, id, subject);
}
util.inherits(BrowserView, ActivityHandler);
utils.mixin(BrowserView, Link);

utils.define(BrowserView.prototype, 'browserContext', function() {
  return this.get(vocabs.as.browserContext);
});
utils.define(BrowserView.prototype, 'hreftemplate', function() {
  return this.get(vocabs.as.hreftemplate);
});
utils.define(BrowserView.prototype, 'method', function() {
  return this.get(vocabs.as.method);
});
utils.define(BrowserView.prototype, 'sandbox', function() {
  return this.get(vocabs.as.sandbox);
});

BrowserView.Builder = function(reasoner, types, base) {
  if (!(this instanceof BrowserView.Builder))
    return new BrowserView.Builder(reasoner, types, base);
  ActivityHandler.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.BrowserView, types),
    base || new BrowserView(undefined, reasoner));
};
util.inherits(BrowserView.Builder, ActivityHandler.Builder);
utils.mixin(BrowserView.Builder, Link.Builder);

BrowserView.Builder.prototype.browserContext = function(val) {
  this.set(vocabs.as.browserContext, val);
  return this;
};
BrowserView.Builder.prototype.hreftemplate = function(val) {
  utils.throwif(
    !(val instanceof UrlTemplate) || !(val instanceof UrlTemplate.Builder), 
    'hreftemplate MUST be an instance of as.models.UrlTemplate');
  this.set(vocabs.as.hreftemplate, val);
  return this;
};
BrowserView.Builder.prototype.method = function(val) {
  this.set(vocabs.as.method, String(val).toUpperCase().valueOf());
  return this;
};
BrowserView.Builder.prototype.sandbox = function(val) {
  this.set(vocabs.as.sandbox, val);
  return this;
};

module.exports = BrowserView;
