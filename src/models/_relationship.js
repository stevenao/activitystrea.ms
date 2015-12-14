'use strict';

const Base = require('./_base');
const composedType = Base.composedType;
const as = require('vocabs-as');
const AsObject = require('./_object');

const Relationship = composedType(undefined, {
  get subject() {
    return this.get(as.subject);
  },
  get object() {
    return this.get(as.object);
  },
  get relationship() {
    return this.get(as.relationship);
  }
});

const RelationshipBuilder = composedType(undefined, {
  subject(val) {
    return this.set(as.subject, val);
  },
  object(val) {
    return this.set(as.object, val);
  },
  relationship(val) {
    return this.set(as.relationship, val);
  }
});
Relationship.Builder = RelationshipBuilder;

module.exports = Relationship;
