'use strict';

const as = require('vocabs-as');
const AsObject = require('./_object');
const Base = require('./_base');
const composedType = Base.composedType;

const Profile = composedType(undefined, {
  get describes() {
    return this.get(as.describes);
  }
});

const ProfileBuilder = composedType(undefined, {
  describes(val) {
    return this.set(as.describes, val);
  }
});

Profile.Builder = ProfileBuilder;

module.exports = Profile;
