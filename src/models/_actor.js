'use strict';

const as = require('vocabs-as');
const AsObject = require('./_object');

class Actor extends AsObject {
  constructor(expanded, builder) {
    super(expanded, builder || Actor.Builder);
  }
}

class ActorBuilder extends AsObject.Builder {
  constructor(types, base) {
    types = (types || []).concat([as.Actor]);
    super(types, base || new Actor({}));
  }
}
Actor.Builder = ActorBuilder;

module.exports = Actor;
