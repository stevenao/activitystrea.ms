'use strict';

const as       = require('linkeddata-vocabs').as;
const util     = require('util');
const AsObject = require('./_object');

function Actor(expanded,builder) {
  if (!(this instanceof Actor))
    return new Actor(expanded, builder);
  AsObject.call(this, expanded, builder || Actor.Builder);
}
util.inherits(Actor, AsObject);

Actor.Builder = function(types, base) {
  if (!(this instanceof Actor.Builder))
    return new Actor.Builder(types, base);
  types = (types || []).concat([as.Actor]);
  AsObject.Builder.call(
    this, types, base || new Actor({}));
};
util.inherits(Actor.Builder, AsObject.Builder);

module.exports = Actor;
