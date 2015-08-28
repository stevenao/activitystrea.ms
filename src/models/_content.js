'use strict';

var as = require('linkeddata-vocabs').as;
var util = require('util');
var utils = require('../utils');
var AsObject = require('./_object');

function Content(expanded, builder) {
  if (!(this instanceof Content))
    return new Content(expanded, builder);
  AsObject.call(this, expanded, builder || Content.Builder);
}
util.inherits(Content, AsObject);

Content.Builder = function(types, base) {
  if (!(this instanceof Content.Builder))
    return new Content.Builder(types, base);
  types = (types || []).concat([as.Content]);
  AsObject.Builder.call(this, types, base || new Content({}));
};
util.inherits(Content.Builder, AsObject.Builder);

utils.defineProperty(
  'height',Content,
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
  'width',Content,
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
  'duration',Content,
  function() {
    return this.get(as.duration);
  },
  function(val) {
    utils.set_duration_val.call(this, as.duration, val);
    return this;
  }
);

module.exports = Content;
