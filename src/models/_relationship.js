'use strict';

const as = require('vocabs-as');
const AsObject = require('./_object');

class Relationship extends AsObject {
  constructor(expanded, builder, environment) {
    super(expanded, builder || Relationship.Builder, environment);
  }

  get subject() {
    return this.get(as.subject);
  }

  get object() {
    return this.get(as.object);
  }

  get relationship() {
    return this.get(as.relationship);
  }

}

class RelationshipBuilder extends AsObject.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([as.Relationship]);
    super(types, base || new Relationship({}, undefined, environment));
  }

  subject(val) {
    return this.set(as.subject, val);
  }

  object(val) {
    return this.set(as.object, val);
  }

  relationship(val) {
    return this.set(as.relationship, val);
  }
}
Relationship.Builder = RelationshipBuilder;

module.exports = Relationship;
