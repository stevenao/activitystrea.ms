'use strict';

const as = require('vocabs-as');
const AsObject = require('./_object');

class Actor extends AsObject {
  constructor(expanded, builder, environment) {
    super(expanded, builder || Actor.Builder, environment);
  }
}

class ActorBuilder extends AsObject.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([as.Actor]);
    super(types, base || new Actor({}, undefined, environment));
  }
}
Actor.Builder = ActorBuilder;

module.exports = Actor;
