'use strict';

const Population = require('./_population');
const utils = require('../utils');
const throwif = utils.throwif;
const is_integer = utils.is_integer;
const range = utils.range;
const social = require('vocabs-social');

class Interested extends Population {
  constructor(expanded, builder, environment) {
    super(expanded, builder || Interested.Builder, environment);
  }

  get confidence() {
    let ret = range(0,100,this.get(social.confidence));
    return isNaN(ret) ? undefined : ret;
  }
}

class InterestedBuilder extends Population.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([social.Interested]);
    super(types, base || new Interested({}, undefined, environment));
  }

  confidence(val) {
    throwif(
      !is_integer(val),
      'confidence must be an integer between 0 and 100'
    );
    this.set(social.confidence, range(0,100,val));
    return this;
  }
}
Interested.Builder = InterestedBuilder;

module.exports = Interested;
