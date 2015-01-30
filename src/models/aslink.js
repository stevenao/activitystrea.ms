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

function AsLink(store, reasoner, id, subject) {
  if (!(this instanceof AsLink))
    return new AsLink(store, reasoner, id, subject);
  Base.call(this, store, reasoner, id, subject);
}
util.inherits(AsLink, Base);
utils.define(AsLink.prototype, 'href', function() {
  return this.get(vocabs.as.href);
});
utils.define(AsLink.prototype, 'rel', function() {
  return this.get(vocabs.as.rel);
});
utils.define(AsLink.prototype, 'mediaType', function() {
  return this.get(vocabs.as.mediaType);
});
utils.define(AsLink.prototype, 'displayName', function() {
  return this.get(vocabs.as.displayName);
});
utils.define(AsLink.prototype, 'title', function() {
  return this.get(vocabs.as.title);
});
utils.define(AsLink.prototype, 'hreflang', function() {
  return this.get(vocabs.as.hreflang);
});
utils.define(AsLink.prototype, 'height', function() {
  var ret = Math.max(0,this.get(vocabs.as.height));
  return isNaN(ret) ? 0 : ret;
});
utils.define(AsLink.prototype, 'width', function() {
  var ret = Math.max(0,this.get(vocabs.as.width));
  return isNaN(ret) ? 0 : ret;
});
utils.define(AsLink.prototype, 'duration', function() {
  return this.get(vocabs.as.duration);
});
utils.define(AsLink.prototype, 'actorOf', function() {
  return this.get(vocabs.as.actorOf);
});
utils.define(AsLink.prototype, 'attachedTo', function() {
  return this.get(vocabs.as.attachedTo);
});
utils.define(AsLink.prototype, 'attributedWith', function() {
  return this.get(vocabs.as.attributedWith);
});
utils.define(AsLink.prototype, 'contextOf', function() {
  return this.get(vocabs.as.contextOf);
});
utils.define(AsLink.prototype, 'generatorOf', function() {
  return this.get(vocabs.as.generatorOf);
});
utils.define(AsLink.prototype, 'iconFor', function() {
  return this.get(vocabs.as.iconFor);
});
utils.define(AsLink.prototype, 'imageOf', function() {
  return this.get(vocabs.as.imageOf);
});
utils.define(AsLink.prototype, 'locationOf', function() {
  return this.get(vocabs.as.locationOf);
});
utils.define(AsLink.prototype, 'memberOf', function() {
  return this.get(vocabs.as.memberOf);
});
utils.define(AsLink.prototype, 'objectOf', function() {
  return this.get(vocabs.as.objectOf);
});
utils.define(AsLink.prototype, 'originOf', function() {
  return this.get(vocabs.as.originOf);
});
utils.define(AsLink.prototype, 'previewOf', function() {
  return this.get(vocabs.as.previewOf);
});
utils.define(AsLink.prototype, 'providerOf', function() {
  return this.get(vocabs.as.providerOf);
});
utils.define(AsLink.prototype, 'resultOf', function() {
  return this.get(vocabs.as.resultOf);
});
utils.define(AsLink.prototype, 'scopeOf', function() {
  return this.get(vocabs.as.scopeOf);
});
utils.define(AsLink.prototype, 'tagOf', function() {
  return this.get(vocabs.as.tagOf);
});
utils.define(AsLink.prototype, 'targetOf', function() {
  return this.get(vocabs.as.targetOf);
});


AsLink.Builder = function(reasoner, types, base) {
  if (!(this instanceof AsLink.Builder))
    return new AsLink.Builder(reasoner, types, base);
  Base.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.Link,types),
    base || new AsLink(undefined, reasoner));
};
util.inherits(AsLink.Builder, Base.Builder);
AsLink.Builder.prototype.href = function(val) {
  this.set(vocabs.as.href, val);
  return this;
};
AsLink.Builder.prototype.rel = function(val) {
  this.set(vocabs.as.rel, val);
  return this;
};
AsLink.Builder.prototype.hreflang = function(val) {
  this.set(vocabs.as.hreflang, val);
  return this;
};
AsLink.Builder.prototype.mediaType = function(val) {
  this.set(vocabs.as.mediaType, val);
  return this;
};
AsLink.Builder.prototype.actorOf = function(val) {
  this.set(vocabs.as.actorOf, val);
  return this;
};
AsLink.Builder.prototype.attachedto = function(val) {
  this.set(vocabs.as.attachedTo, val);
  return this;
};
AsLink.Builder.prototype.attributedWith = function(val) {
  this.set(vocabs.as.attributedWith, val);
  return this;
};
AsLink.Builder.prototype.contextOf = function(val) {
  this.set(vocabs.as.contextOf, val);
  return this;
};
AsLink.Builder.prototype.generatorOf = function(val) {
  this.set(vocabs.as.generatorOf, val);
  return this;
};
AsLink.Builder.prototype.iconFor = function(val) {
  this.set(vocabs.as.iconFor, val);
  return this;
};
AsLink.Builder.prototype.imageOf = function(val) {
  this.set(vocabs.as.imageOf, val);
  return this;
};
AsLink.Builder.prototype.locationOf = function(val) {
  this.set(vocabs.as.locationOf, val);
  return this;
};
AsLink.Builder.prototype.memberOf = function(val) {
  this.set(vocabs.as.memberOf, val);
  return this;
};
AsLink.Builder.prototype.objectOf = function(val) {
  this.set(vocabs.as.objectOf, val);
  return this;
};
AsLink.Builder.prototype.originOf = function(val) {
  this.set(vocabs.as.originOf, val);
  return this;
};
AsLink.Builder.prototype.previewOf = function(val) {
  this.set(vocabs.as.previewOf, val);
  return this;
};
AsLink.Builder.prototype.providerOf = function(val) {
  this.set(vocabs.as.providerOf, val);
  return this;
};
AsLink.Builder.prototype.resultOf = function(val) {
  this.set(vocabs.as.resultOf, val);
  return this;
};
AsLink.Builder.prototype.scopeOf = function(val) {
  this.set(vocabs.as.scopeOf, val);
  return this;
};
AsLink.Builder.prototype.tagOf = function(val) {
  this.set(vocabs.as.tagOf, val);
  return this;
};
AsLink.Builder.prototype.targetOf = function(val) {
  this.set(vocabs.as.targetOf, val);
  return this;
};
AsLink.Builder.prototype.displayName = function(val, lang) {
  utils.set_lang_val.call(this, vocabs.as.displayName, val, lang);
  return this;
};
AsLink.Builder.prototype.title = function(val, lang) {
  utils.set_lang_val.call(this, vocabs.as.title, val, lang);
  return this;
};

AsLink.Builder.prototype.height = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.height, val);
  return this;
};
AsLink.Builder.prototype.width = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.width, val);
  return this;
};

AsLink.Builder.prototype.duration = function(val) {
  utils.set_duration_val.call(this,vocabs.as.duration,val);
  return this;
};


module.exports = AsLink;
