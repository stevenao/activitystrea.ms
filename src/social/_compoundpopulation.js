'use strict';

const Population = require('./_population');
const util = require('util');
const utils = require('../utils');
const social = require('linkeddata-vocabs').social;

function CompoundPopulation(expanded,builder) {
  if (!(this instanceof CompoundPopulation))
    return new CompoundPopulation(expanded,builder);
  Population.call(this, expanded, builder || CompoundPopulation.Builder);
}
util.inherits(CompoundPopulation, Population);

CompoundPopulation.Builder = function(types,base) {
  if (!(this instanceof CompoundPopulation.Builder))
    return new CompoundPopulation.Builder(types,base);
  types = (types || []).concat([social.CompoundPopulation]);
  Population.Builder.call(this, types, base || new CompoundPopulation({}));
};
util.inherits(CompoundPopulation.Builder,Population.Builder);

utils.defineProperty(
  'member',CompoundPopulation,
  function() {
    return this.get(social.member);
  },
  function(val) {
    this.set(social.member, val);
    return this;
  }
);

module.exports = CompoundPopulation;
