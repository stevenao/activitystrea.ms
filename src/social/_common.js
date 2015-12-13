'use strict';

const social = require('vocabs-social');
const utils = require('../utils');
const range = utils.range;
const is_integer = utils.is_integer;
const throwif = utils.throwif;
const xsd = require('vocabs-xsd');
const Population = require('./_population');

class Common extends Population {
  constructor(expanded, builder, environment) {
    super(expanded, builder || Common.Builder, environment);
  }

  get havingDimension() {
    return this.get(social.havingDimension);
  }

  get confidence() {
    let ret = range(0, 100, this.get(social.confidence));
    return isNaN(ret) ? undefined : ret;
  }
}

class CommonBuilder extends Population.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([social.Common]);
    super(types, base || new Common({}, undefined, environment));
  }

  havingDimension(val) {
    this.set(social.havingDimension, val);
    return this;
  }

  confidence(val) {
    throwif(
      !is_integer(val),
      'confidence must be an integer between 0 and 100');
    this.set(social.confidence, range(0, 100, val));
    return this;
  }
}
Common.Builder = CommonBuilder;

module.exports = Common;
