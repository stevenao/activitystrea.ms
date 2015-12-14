'use strict';

const Base = require('../models').Base;
const composedType = Base.composedType;
const Population = require('./_population');
const social = require('vocabs-social');

const Everyone = composedType(Population, {
  get havingRelationship() {
    return this.get(social.havingRelationship);
  },
  get havingRole() {
    return this.get(social.havingRole);
  }
});

const EveryoneBuilder = composedType(Population.Builder, {
  havingRelationship(val) {
    this.set(social.havingRelationship, val);
    return this;
  },
  havingRole(val) {
    this.set(social.havingRole, val);
    return this;
  }
});
Everyone.Builder = EveryoneBuilder;

module.exports = Everyone;
