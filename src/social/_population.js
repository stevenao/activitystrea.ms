'use strict';

const Base = require('../models').Base;
const composedType = Base.composedType;
const AsObject = require('../models').Object;
const utils = require('../utils');
const range = utils.range;
const xsd = require('vocabs-xsd');
const social = require('vocabs-social');

const Population = composedType(undefined, {
  get distance() {
    let ret = range(0, Infinity, this.get(social.distance));
    return isNaN(ret) ? undefined : ret;
  }
});

const PopulationBuilder = composedType(undefined, {
  distance(val) {
    this.set(
      social.distance,
      range(0, Infinity, val)
    );
    return this;
  }
});
Population.Builder = PopulationBuilder;

module.exports = Population;
