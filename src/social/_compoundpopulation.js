'use strict';

const Population = require('./_population');
const social = require('vocabs-social');

class CompoundPopulation extends Population {
  constructor(expanded, builder, environment) {
    super(expanded, builder || CompoundPopulation.Builder, environment);
  }

  get member() {
    return this.get(social.member);
  }
}

class CompoundPopulationBuilder extends Population.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([social.CompoundPopulation]);
    super(types, base || new CompoundPopulation({}, undefined, environment));
  }

  member(val) {
    this.set(social.member, val);
    return this;
  }
}
CompoundPopulation.Builder = CompoundPopulationBuilder;

module.exports = CompoundPopulation;
