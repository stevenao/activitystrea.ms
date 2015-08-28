'use strict';

var util = require('util');
var utils = require('../utils');
var as = require('linkeddata-vocabs').as;
var Base = require('./_base');

function Link(expanded, builder) {
  if (!(this instanceof Link))
    return new Link(expanded, builder);
  Base.call(this, expanded, builder || Link.Builder);
}
util.inherits(Link, Base);

Link.Builder = function(types, base) {
  if (!(this instanceof Link.Builder))
    return new Link.Builder(types, base);
  types = (types || []).concat([as.Link]);
  Base.Builder.call(this, types, base || new Link({}));
};
util.inherits(Link.Builder, Base.Builder);

utils.defineProperty(
  'href',Link,
  function() {
    var ret = this.get(as.href);
    return ret ? ret.id : undefined;
  },
  function(val) {
    this.set(as.href, val);
    return this;
  }
);

utils.defineProperty(
  'rel',Link,
  function() {
    return this.get(as.rel);
  },
  function(val) {
    this.set(as.rel, val);
    return this;
  }
);

utils.defineProperty(
  'mediaType',Link,
  function() {
    return this.get(as.mediaType);
  },
  function(val) {
    this.set(as.mediaType, val);
    return this;
  }
);

utils.defineProperty(
  'displayName',Link,
  function() {
    return this.get(as.displayName);
  },
  function(val, lang) {
    utils.set_lang_val.call(this, as.displayName, val, lang);
    return this;
  }
);

utils.defineProperty(
  'title',Link,
  function() {
    return this.get(as.title);
  },
  function(val, lang) {
    utils.set_lang_val.call(this, as.title, val, lang);
    return this;
  }
);

utils.defineProperty(
  'hreflang',Link,
  function() {
    return this.get(as.hreflang);
  },
  function(val) {
    this.set(as.hreflang, val);
    return this;
  }
);

utils.defineProperty(
  'height',Link,
  function() {
    var ret = Math.max(0, this.get(as.height));
    return isNaN(ret) ? 0 : ret;
  },
  function(val) {
    utils.set_non_negative_int.call(this, as.height, val);
    return this;
  }
);

utils.defineProperty(
  'width',Link,
  function() {
    var ret = Math.max(0, this.get(as.width));
    return isNaN(ret) ? 0 : ret;
  },
  function(val) {
    utils.set_non_negative_int.call(this, as.width, val);
    return this;
  }
);

utils.defineProperty(
  'duration',Link,
  function() {
    return this.get(as.duration);
  },
  function(val) {
    utils.set_duration_val.call(this, as.duration, val);
    return this;
  }
);

module.exports = Link;
