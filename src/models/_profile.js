'use strict';

const as = require('linkeddata-vocabs').as;
const Content = require('./_content');

class Profile extends Content {
  constructor(expanded, builder) {
    super(expanded, builder || Profile.Builder);
  }

  get describes() {
    return this.get(as.describes);
  }

}

class ProfileBuilder extends Content.Builder {
  constructor(types, base) {
    types = (types || []).concat([as.Profile]);
    super(types, base || new Profile({}));
  }

  describes(val) {
    return this.set(as.describes, val);
  }
}
Profile.Builder = ProfileBuilder;

module.exports = Profile;
