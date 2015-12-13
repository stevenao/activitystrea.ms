'use strict';

const AsObject = require('../models').Object;
const utils = require('../utils');
const range = utils.range;
const xsd = require('vocabs-xsd');
const social = require('vocabs-social');

class Population extends AsObject {
  constructor(expanded, builder, environment) {
    super(expanded, builder || Population.Builder, environment);
  }

  get distance() {
    let ret = range(0, Infinity, this.get(social.distance));
    return isNaN(ret) ? undefined : ret;
  }
}

class PopulationBuilder extends AsObject.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([social.Population]);
    super(types,base || new Population({}, undefined, environment));
  }

  distance(val) {
    this.set(
      social.distance,
      range(0, Infinity, val),
      {type: xsd.nonNegativeInteger}
    );
    return this;
  }
}
Population.Builder = PopulationBuilder;

module.exports = Population;
