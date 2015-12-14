'use strict';

const Base = require('../models').Base;
const composedType = Base.composedType;
const social = require('vocabs-social');
const utils = require('../utils');
const range = utils.range;
const is_integer = utils.is_integer;
const throwif = utils.throwif;
const xsd = require('vocabs-xsd');
const Population = require('./_population');

const Common = composedType(Population, {
  get havingDimension() {
    return this.get(social.havingDimension);
  },
  get confidence() {
    let ret = range(0, 100, this.get(social.confidence));
    return isNaN(ret) ? undefined : ret;
  }
});

const CommonBuilder = composedType(Population.Builder, {
  havingDimension(val) {
    this.set(social.havingDimension, val);
    return this;
  },
  confidence(val) {
    throwif(
      !is_integer(val),
      'confidence must be an integer between 0 and 100');
    this.set(
      social.confidence,
      range(0, 100, val));
    return this;
  }
});
Common.Builder = CommonBuilder;

module.exports = Common;
