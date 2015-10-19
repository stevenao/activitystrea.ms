'use strict';

const social = require('linkeddata-vocabs').social;
const utils = require('../utils');
const Population = require('./_population');

class Common extends Population {
  constructor(expanded, builder) {
    super(expanded, builder || Common.Builder);
  }

  get havingDimension() {
    return this.get(social.havingDimension);
  }

  get confidence() {
    let ret = Math.min(100,Math.max(0,this.get(social.confidence)));
    return isNaN(ret) ? undefined : ret;
  }
}

class CommonBuilder extends Population.Builder {
  constructor(types, base) {
    types = (types || []).concat([social.Common]);
    super(types, base || new Common({}));
  }

  havingDimension(val) {
    this.set(social.havingDimension, val);
    return this;
  }

  confidence(val) {
    if (!utils.is_integer(val))
      throw Error('confidence must be an integer between 0 and 100');
    val = Math.max(0, Math.min(100, val));
    this.set(social.confidence, val);
    return this;
  }
}
Common.Builder = CommonBuilder;

module.exports = Common;
