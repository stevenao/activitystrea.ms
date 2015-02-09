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

function AsObject(expanded, reasoner, parent) {
  if (!(this instanceof AsObject))
    return new AsObject(expanded, reasoner, parent);
  Base.call(this, expanded, reasoner, parent);
}
util.inherits(AsObject, Base);

utils.define(AsObject.prototype, 'alias', function() {
  return this.get(vocabs.as.alias);
});
utils.define(AsObject.prototype, 'attachedTo', function() {
  return this.get(vocabs.as.attachedTo);
});
utils.define(AsObject.prototype, 'attachment', function() {
  return this.get(vocabs.as.attachment);
});
utils.define(AsObject.prototype, 'attributedTo', function() {
  return this.get(vocabs.as.attributedTo);
});
utils.define(AsObject.prototype, 'attributedWith', function() {
  return this.get(vocabs.as.attributedWith);
});
utils.define(AsObject.prototype, 'content', function() {
  return this.get(vocabs.as.content);
});
utils.define(AsObject.prototype, 'context', function() {
  return this.get(vocabs.as.context);
});
utils.define(AsObject.prototype, 'contextOf', function() {
  return this.get(vocabs.as.contextOf);
});
utils.define(AsObject.prototype, 'displayName', function() {
  return this.get(vocabs.as.displayName);
});
utils.define(AsObject.prototype, 'endTime', function() {
  return this.get(vocabs.as.endTime);
});
utils.define(AsObject.prototype, 'generator', function() {
  return this.get(vocabs.as.generator);
});
utils.define(AsObject.prototype, 'generatorOf', function() {
  return this.get(vocabs.as.generatorOf);
});
utils.define(AsObject.prototype, 'icon', function() {
  return this.get(vocabs.as.icon);
});
utils.define(AsObject.prototype, 'image', function() {
  return this.get(vocabs.as.image);
});
utils.define(AsObject.prototype, 'inReplyTo', function() {
  return this.get(vocabs.as.inReplyTo);
});
utils.define(AsObject.prototype, 'memberOf', function() {
  return this.get(vocabs.as.memberOf);
});
utils.define(AsObject.prototype, 'location', function() {
  return this.get(vocabs.as.location);
});
utils.define(AsObject.prototype, 'locationOf', function() {
  return this.get(vocabs.as.locationOf);
});
utils.define(AsObject.prototype, 'objectOf', function() {
  return this.get(vocabs.as.objectOf);
});
utils.define(AsObject.prototype, 'originOf', function() {
  return this.get(vocabs.as.originOf);
});
utils.define(AsObject.prototype, 'preview', function() {
  return this.get(vocabs.as.preview);
});
utils.define(AsObject.prototype, 'previewOf', function() {
  return this.get(vocabs.as.previewOf);
});
utils.define(AsObject.prototype, 'published', function() {
  return this.get(vocabs.as.published);
});
utils.define(AsObject.prototype, 'rating', function() {
  return this.get(vocabs.as.rating);
});
utils.define(AsObject.prototype, 'resultOf', function() {
  return this.get(vocabs.as.resultOf);
});
utils.define(AsObject.prototype, 'replies', function() {
  return this.get(vocabs.as.replies);
});
utils.define(AsObject.prototype, 'scope', function() {
  return this.get(vocabs.as.scope);
});
utils.define(AsObject.prototype, 'scopeOf', function() {
  return this.get(vocabs.as.scopeOf);
});
utils.define(AsObject.prototype, 'startTime', function() {
  return this.get(vocabs.as.startTime);
});
utils.define(AsObject.prototype, 'summary', function() {
  return this.get(vocabs.as.summary);
});
utils.define(AsObject.prototype, 'tag', function() {
  return this.get(vocabs.as.tag);
});
utils.define(AsObject.prototype, 'tagOf', function() {
  return this.get(vocabs.as.tagOf);
});
utils.define(AsObject.prototype, 'targetOf', function() {
  return this.get(vocabs.as.targetOf);
});
utils.define(AsObject.prototype, 'title', function() {
  return this.get(vocabs.as.title);
});
utils.define(AsObject.prototype, 'updated', function() {
  return this.get(vocabs.as.updated);
});
utils.define(AsObject.prototype, 'url', function() {
  return this.get(vocabs.as.url);
});
utils.define(AsObject.prototype, 'action', function() {
  return this.get(vocabs.as.action);
});

AsObject.Builder = function(reasoner, types, base) {
  if (!(this instanceof AsObject.Builder))
    return new AsObject.Builder(reasoner, types, base);
  Base.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.Object,types),
    base || new AsObject({}, reasoner));
};
util.inherits(AsObject.Builder, Base.Builder);

AsObject.Builder.prototype.alias = function(val) {
  this.set(vocabs.as.alias, val);
  return this;
};
AsObject.Builder.prototype.attachedTo = function(val) {
  this.set(vocabs.as.attachedTo, val);
  return this;
};
AsObject.Builder.prototype.attachment = function(val) {
  this.set(vocabs.as.attachment, val);
  return this;
};
AsObject.Builder.prototype.attributedTo = function(val) {
  this.set(vocabs.as.attributedTo, val);
  return this;
};
AsObject.Builder.prototype.attributedWith = function(val) {
  this.set(vocabs.as.attributedWith, val);
  return this;
};
AsObject.Builder.prototype.context = function(val) {
  this.set(vocabs.as.context, val);
  return this;
};
AsObject.Builder.prototype.contextOf = function(val) {
  this.set(vocabs.as.contextOf, val);
  return this;
};
AsObject.Builder.prototype.generator = function(val) {
  this.set(vocabs.as.generator, val);
  return this;
};
AsObject.Builder.prototype.generatorOf = function(val) {
  this.set(vocabs.as.generatorOf, val);
  return this;
};
AsObject.Builder.prototype.icon = function(val) {
  this.set(vocabs.as.icon, val);
  return this;
};
AsObject.Builder.prototype.image = function(val) {
  this.set(vocabs.as.image, val);
  return this;
};
AsObject.Builder.prototype.inReplyTo = function(val) {
  this.set(vocabs.as.inReplyTo, val);
  return this;
};
AsObject.Builder.prototype.memberOf = function(val) {
  this.set(vocabs.as.memberOf, val);
  return this;
};
AsObject.Builder.prototype.location = function(val) {
  this.set(vocabs.as.location, val);
  return this;
};
AsObject.Builder.prototype.locationOf = function(val) {
  this.set(vocabs.as.locationOf, val);
  return this;
};
AsObject.Builder.prototype.originOf = function(val) {
  this.set(vocabs.as.originOf, val);
  return this;
};
AsObject.Builder.prototype.objectOf = function(val) {
  this.set(vocabs.as.objectOf, val);
  return this;
};
AsObject.Builder.prototype.preview = function(val) {
  this.set(vocabs.as.preview, val);
  return this;
};
AsObject.Builder.prototype.previewOf = function(val) {
  this.set(vocabs.as.previewOf, val);
  return this;
};
AsObject.Builder.prototype.provider = function(val) {
  this.set(vocabs.as.provider, val);
  return this;
};
AsObject.Builder.prototype.providerOf = function(val) {
  this.set(vocabs.as.providerOf, val);
  return this;
};
AsObject.Builder.prototype.resultOf = function(val) {
  this.set(vocabs.as.resultOf, val);
  return this;
};
AsObject.Builder.prototype.replies = function(val) {
  this.set(vocabs.as.replies, val);
  return this;
};
AsObject.Builder.prototype.scope = function(val) {
  this.set(vocabs.as.scope, val);
  return this;
};
AsObject.Builder.prototype.scopeOf = function(val) {
  this.set(vocabs.as.scopeOf, val);
  return this;
};
AsObject.Builder.prototype.tag = function(val) {
  this.set(vocabs.as.tag, val);
  return this;
};
AsObject.Builder.prototype.tagOf = function(val) {
  this.set(vocabs.as.tagOf, val);
  return this;
};
AsObject.Builder.prototype.targetOf = function(val) {
  this.set(vocabs.as.targetOf, val);
  return this;
};
AsObject.Builder.prototype.url = function(val) {
  this.set(vocabs.as.url, val);
  return this;
};
AsObject.Builder.prototype.action = function(val) {
  this.set(vocabs.as.action, val);
  return this;
};

AsObject.Builder.prototype.content = function(val, lang) {
  utils.set_lang_val.call(this, vocabs.as.content, val, lang);
  return this;
};
AsObject.Builder.prototype.displayName = function(val, lang) {
  utils.set_lang_val.call(this, vocabs.as.displayName, val, lang);
  return this;
};
AsObject.Builder.prototype.title = function(val, lang) {
  utils.set_lang_val.call(this, vocabs.as.title, val, lang);
  return this;
};
AsObject.Builder.prototype.summary = function(val, lang) {
  utils.set_lang_val.call(this, vocabs.as.summary, val, lang);
  return this;
};

AsObject.Builder.prototype.endTime = function(val) {
  utils.set_date_val.call(this,vocabs.as.endTime,val);
  return this;
};
AsObject.Builder.prototype.endTimeNow = function() {
  return this.endTime(new Date());
};

AsObject.Builder.prototype.published = function(val) {
  utils.set_date_val.call(this,vocabs.as.published,val);
  return this;
};
AsObject.Builder.prototype.publishedNow = function() {
  return this.published(new Date());
};

AsObject.Builder.prototype.startTime = function(val) {
  utils.set_date_val.call(this,vocabs.as.startTime,val);
  return this;
};
AsObject.Builder.prototype.startTimeNow = function() {
  return this.startTime(new Date());
};

AsObject.Builder.prototype.updated = function(val) {
  utils.set_date_val.call(this,vocabs.as.updated,val);
  return this;
};
AsObject.Builder.prototype.updatedNow = function() {
  return this.updated(new Date());
};

AsObject.Builder.prototype.rating = function(val) {
  utils.set_ranged_val.call(
    this, 
    vocabs.as.rating, 
    val, 0.0, 5.0, 
    vocabs.xsd.float);
  return this;
};

module.exports = AsObject;