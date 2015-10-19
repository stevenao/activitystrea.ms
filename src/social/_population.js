'use strict';

const AsObject = require('../models').Object;
const utils    = require('../utils');
const social   = require('linkeddata-vocabs').social;

class Population extends AsObject {
  constructor(expanded, builder) {
    super(expanded, builder || Population.Builder);
  }

  get distance() {
    let ret = Math.max(0,this.get(social.distance));
    return isNaN(ret) ? undefined : ret;
  }
}

class PopulationBuilder extends AsObject.Builder {
  constructor(types, base) {
    types = (types || []).concat([social.Population]);
    super(types,base || new Population({}));
  }

  distance(val) {
    utils.set_non_negative_int.call(this, social.distance, val);
    return this;
  }
}
Population.Builder = PopulationBuilder;

module.exports = Population;
