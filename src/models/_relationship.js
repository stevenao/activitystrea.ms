'use strict';

const util = require('util');
const utils = require('../utils');
const as = require('linkeddata-vocabs').as;
const AsObject = require('./_object');

function Relationship(expanded, builder) {
  if (!(this instanceof Relationship))
    return new Relationship(expanded, builder);
  AsObject.call(this, expanded, builder || Relationship.Builder);
}
util.inherits(Relationship, AsObject);

Relationship.Builder = function(types,base) {
  if (!(this instanceof Relationship.Builder))
    return new Relationship.Builder(types,base);
  types = (types || []).concat([as.Relationship]);
  AsObject.Builder.call(this, types,base || new Relationship({}));
};
util.inherits(Relationship.Builder,AsObject.Builder);

utils.defineProperty(
  'subject',Relationship,
  function() {
    return this.get(as.subject);
  },
  function(val) {
    this.set(as.subject, val);
    return this;
  }
);

utils.defineProperty(
  'object',Relationship,
  function() {
    return this.get(as.object);
  },
  function(val) {
    this.set(as.object, val);
    return this;
  }
);

utils.defineProperty(
  'relationship',Relationship,
  function() {
    return this.get(as.relationship);
  },
  function(val) {
    this.set(as.relationship, val);
    return this;
  }
);

module.exports = Relationship;
