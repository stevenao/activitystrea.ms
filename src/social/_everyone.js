'use strict';

const Population = require('./_population');
const social = require('linkeddata-vocabs').social;

class Everyone extends Population {
  constructor(expanded, builder) {
    super(expanded, builder || Everyone.Builder);
  }

  get havingRelationship() {
    return this.get(social.havingRelationship);
  }

  get havingRole() {
    return this.get(social.havingRole);
  }
}

class EveryoneBuilder extends Population.Builder {
  constructor(types, base) {
    types = (types || []).concat([social.Everyone]);
    super(types, base || new Everyone({}));
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
