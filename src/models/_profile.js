'use strict';

const as = require('linkeddata-vocabs').as;
const AsObject = require('./_object');

class Profile extends AsObject {
  constructor(expanded, builder) {
    super(expanded, builder || Profile.Builder);
  }

  get describes() {
    return this.get(as.describes);
  }

}

class ProfileBuilder extends AsObject.Builder {
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
