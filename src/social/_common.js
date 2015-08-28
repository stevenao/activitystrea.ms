'use strict';

const social = require('linkeddata-vocabs').social;
const util = require('util');
const utils = require('../utils');
const Population = require('./_population');

function Common(expanded,builder) {
  if (!(this instanceof Common))
    return new Common(expanded, builder);
  Population.call(this, expanded, builder || Common.Builder);
}
util.inherits(Common, Population);

Common.Builder = function(types,base) {
  if (!(this instanceof Common.Builder))
    return new Common.Builder(types,base);
  types = (types || []).concat([social.Common]);
  Population.Builder.call(this, types, base || new Common({}));
};
util.inherits(Common.Builder,Population.Builder);

utils.defineProperty(
  'havingDimension', Common,
  function() {
    return this.get(social.havingDimension);
  },
  function(val) {
    this.set(social.havingDimension, val);
    return this;
  }
);

utils.defineProperty(
  'confidence', Common,
  function() {
    var ret = Math.min(100,Math.max(0,this.get(social.confidence)));
    return isNaN(ret) ? undefined : ret;
  },
  function(val) {
    if (!utils.is_integer(val))
      throw Error('confidence must be an integer between 0 and 100');
    val = Math.max(0, Math.min(100, val));
    this.set(social.confidence, val);
    return this;
  }
);

module.exports = Common;
