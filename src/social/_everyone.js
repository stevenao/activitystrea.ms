'use strict';

const Population = require('./_population');
const social = require('vocabs-social');

class Everyone extends Population {
  constructor(expanded, builder, environment) {
    super(expanded, builder || Everyone.Builder, environment);
  }

  get havingRelationship() {
    return this.get(social.havingRelationship);
  }

  get havingRole() {
    return this.get(social.havingRole);
  }
}

class EveryoneBuilder extends Population.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([social.Everyone]);
    super(types, base || new Everyone({}, undefined, environment));
  }

  havingRelationship(val) {
    this.set(social.havingRelationship, val);
    return this;
  }

  havingRole(val) {
    this.set(social.havingRole, val);
    return this;
  }
}
Everyone.Builder = EveryoneBuilder;

module.exports = Everyone;
