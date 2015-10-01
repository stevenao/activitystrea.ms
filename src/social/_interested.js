'use strict';

const Population = require('./_population');
const utils = require('../utils');
const social = require('linkeddata-vocabs').social;

class Interested extends Population {
  constructor(expanded, builder) {
    super(expanded, builder || Interested.Builder);
  }

  get confidence() {
    var ret = Math.min(100,Math.max(0,this.get(social.confidence)));
    return isNaN(ret) ? undefined : ret;
  }
}

class InterestedBuilder extends Population.Builder {
  constructor(types, base) {
    types = (types || []).concat([social.Interested]);
    super(types, base || new Interested({}));
  }

  confidence(val) {
    if (!utils.is_integer(val))
      throw Error('confidence must be an integer between 0 and 100');
    val = Math.max(0, Math.min(100, val));
    this.set(social.confidence, val);
    return this;
  }
}
Interested.Builder = InterestedBuilder;

module.exports = Interested;
