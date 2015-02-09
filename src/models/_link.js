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
var Base = require('./_base');

function Link(expanded, reasoner, parent) {
  if (!(this instanceof Link))
    return new Link(expanded, reasoner, parent);
  Base.call(this, expanded, reasoner, parent);
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
utils.define(Link.prototype, 'actorOf', function() {
  return this.get(vocabs.as.actorOf);
});
utils.define(Link.prototype, 'attachedTo', function() {
  return this.get(vocabs.as.attachedTo);
});
utils.define(Link.prototype, 'attributedWith', function() {
  return this.get(vocabs.as.attributedWith);
});
utils.define(Link.prototype, 'contextOf', function() {
  return this.get(vocabs.as.contextOf);
});
utils.define(Link.prototype, 'generatorOf', function() {
  return this.get(vocabs.as.generatorOf);
});
utils.define(Link.prototype, 'iconFor', function() {
  return this.get(vocabs.as.iconFor);
});
utils.define(Link.prototype, 'imageOf', function() {
  return this.get(vocabs.as.imageOf);
});
utils.define(Link.prototype, 'locationOf', function() {
  return this.get(vocabs.as.locationOf);
});
utils.define(Link.prototype, 'memberOf', function() {
  return this.get(vocabs.as.memberOf);
});
utils.define(Link.prototype, 'objectOf', function() {
  return this.get(vocabs.as.objectOf);
});
utils.define(Link.prototype, 'originOf', function() {
  return this.get(vocabs.as.originOf);
});
utils.define(Link.prototype, 'previewOf', function() {
  return this.get(vocabs.as.previewOf);
});
utils.define(Link.prototype, 'providerOf', function() {
  return this.get(vocabs.as.providerOf);
});
utils.define(Link.prototype, 'resultOf', function() {
  return this.get(vocabs.as.resultOf);
});
utils.define(Link.prototype, 'scopeOf', function() {
  return this.get(vocabs.as.scopeOf);
});
utils.define(Link.prototype, 'tagOf', function() {
  return this.get(vocabs.as.tagOf);
});
utils.define(Link.prototype, 'targetOf', function() {
  return this.get(vocabs.as.targetOf);
});


Link.Builder = function(reasoner, types, base) {
  if (!(this instanceof Link.Builder))
    return new Link.Builder(reasoner, types, base);
  Base.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.Link,types),
    base || new Link({}, reasoner));
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
Link.Builder.prototype.actorOf = function(val) {
  this.set(vocabs.as.actorOf, val);
  return this;
};
Link.Builder.prototype.attachedto = function(val) {
  this.set(vocabs.as.attachedTo, val);
  return this;
};
Link.Builder.prototype.attributedWith = function(val) {
  this.set(vocabs.as.attributedWith, val);
  return this;
};
Link.Builder.prototype.contextOf = function(val) {
  this.set(vocabs.as.contextOf, val);
  return this;
};
Link.Builder.prototype.generatorOf = function(val) {
  this.set(vocabs.as.generatorOf, val);
  return this;
};
Link.Builder.prototype.iconFor = function(val) {
  this.set(vocabs.as.iconFor, val);
  return this;
};
Link.Builder.prototype.imageOf = function(val) {
  this.set(vocabs.as.imageOf, val);
  return this;
};
Link.Builder.prototype.locationOf = function(val) {
  this.set(vocabs.as.locationOf, val);
  return this;
};
Link.Builder.prototype.memberOf = function(val) {
  this.set(vocabs.as.memberOf, val);
  return this;
};
Link.Builder.prototype.objectOf = function(val) {
  this.set(vocabs.as.objectOf, val);
  return this;
};
Link.Builder.prototype.originOf = function(val) {
  this.set(vocabs.as.originOf, val);
  return this;
};
Link.Builder.prototype.previewOf = function(val) {
  this.set(vocabs.as.previewOf, val);
  return this;
};
Link.Builder.prototype.providerOf = function(val) {
  this.set(vocabs.as.providerOf, val);
  return this;
};
Link.Builder.prototype.resultOf = function(val) {
  this.set(vocabs.as.resultOf, val);
  return this;
};
Link.Builder.prototype.scopeOf = function(val) {
  this.set(vocabs.as.scopeOf, val);
  return this;
};
Link.Builder.prototype.tagOf = function(val) {
  this.set(vocabs.as.tagOf, val);
  return this;
};
Link.Builder.prototype.targetOf = function(val) {
  this.set(vocabs.as.targetOf, val);
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
