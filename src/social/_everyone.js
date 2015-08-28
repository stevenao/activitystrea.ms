'use strict';

const util       = require('util');
const Population = require('./_population');
const utils      = require('../utils');
const social     = require('linkeddata-vocabs').social;

function Everyone(expanded, builder) {
  if (!(this instanceof Everyone))
    return new Everyone(expanded, builder);
  Population.call(this, expanded, builder || Everyone.Builder);
}
util.inherits(Everyone, Population);

Everyone.Builder = function(types,base) {
  if (!(this instanceof Everyone.Builder))
    return new Everyone.Builder(types,base);
  types = (types || []).concat([social.Everyone]);
  Population.Builder.call(this, types, base || new Everyone({}));
};
util.inherits(Everyone.Builder,Population.Builder);

utils.defineProperty(
  'havingRelationship',Everyone,
  function() {
    return this.get(social.havingRelationship);
  },
  function(val) {
    this.set(social.havingRelationship, val);
    return this;
  }
);

utils.defineProperty(
  'havingRole',Everyone,
  function() {
    return this.get(social.havingRole);
  },
  function(val) {
    this.set(social.havingRole, val);
    return this;
  }
);

module.exports = Everyone;
