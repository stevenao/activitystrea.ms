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
var reasoner = require('../reasoner');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');
var Base = require('./_base');

function Link(expanded) {
  if (!(this instanceof Link))
    return new Link(expanded);
  Base.call(this, expanded);
}
util.inherits(Link, Base);
utils.define(Link.prototype, 'href', function() {
  var ret = this.get(vocabs.as.href);
  return ret ? ret.id : undefined;
});
utils.define(Link.prototype, 'rel', function() {
  return this.get(vocabs.as.rel);
});
utils.define(Link.prototype, 'mediaType', function() {
  return this.get(vocabs.as.mediaType);
});
utils.define(Link.prototype, 'displayName', function() {
  return this.get(vocabs.as.displayName);
});
utils.define(Link.prototype, 'title', function() {
  return this.get(vocabs.as.title);
});
utils.define(Link.prototype, 'hreflang', function() {
  return this.get(vocabs.as.hreflang);
});
utils.define(Link.prototype, 'height', function() {
  var ret = Math.max(0,this.get(vocabs.as.height));
  return isNaN(ret) ? 0 : ret;
});
utils.define(Link.prototype, 'width', function() {
  var ret = Math.max(0,this.get(vocabs.as.width));
  return isNaN(ret) ? 0 : ret;
});
utils.define(Link.prototype, 'duration', function() {
  return this.get(vocabs.as.duration);
});

Link.Builder = function(types, base) {
  if (!(this instanceof Link.Builder))
    return new Link.Builder(types, base);
  Base.Builder.call(
    this,
    utils.merge_types(reasoner, vocabs.as.Link,types),
    base || new Link({}));
};
util.inherits(Link.Builder, Base.Builder);
Link.Builder.prototype.href = function(val) {
  this.set(vocabs.as.href, val);
  return this;
};
Link.Builder.prototype.rel = function(val) {
  this.set(vocabs.as.rel, val);
  return this;
};
Link.Builder.prototype.hreflang = function(val) {
  this.set(vocabs.as.hreflang, val);
  return this;
};
Link.Builder.prototype.mediaType = function(val) {
  this.set(vocabs.as.mediaType, val);
  return this;
};
Link.Builder.prototype.displayName = function(val, lang) {
  utils.set_lang_val.call(this, vocabs.as.displayName, val, lang);
  return this;
};
Link.Builder.prototype.title = function(val, lang) {
  utils.set_lang_val.call(this, vocabs.as.title, val, lang);
  return this;
};

Link.Builder.prototype.height = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.height, val);
  return this;
};
Link.Builder.prototype.width = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.width, val);
  return this;
};

Link.Builder.prototype.duration = function(val) {
  utils.set_duration_val.call(this,vocabs.as.duration,val);
  return this;
};


module.exports = Link;
