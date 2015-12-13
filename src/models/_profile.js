'use strict';

const as = require('vocabs-as');
const AsObject = require('./_object');

class Profile extends AsObject {
  constructor(expanded, builder, environment) {
    super(expanded, builder || Profile.Builder, environment);
  }

  get describes() {
    return this.get(as.describes);
  }

}

class ProfileBuilder extends AsObject.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([as.Profile]);
    super(types, base || new Profile({}, undefined, environment));
  }

  describes(val) {
    return this.set(as.describes, val);
  }
}
Profile.Builder = ProfileBuilder;

module.exports = Profile;
