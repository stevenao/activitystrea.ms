'use strict';

const util = require('util');
const utils = require('../utils');
const as = require('linkeddata-vocabs').as;
const Content = require('./_content');

function Profile(expanded, builder) {
  if (!(this instanceof Profile))
    return new Profile(expanded, builder);
  Content.call(this, expanded, builder || Profile.Builder);
}
util.inherits(Profile, Content);

Profile.Builder = function(types,base) {
  if (!(this instanceof Profile.Builder))
    return new Profile.Builder(types,base);
  types = (types || []).concat([as.Profile]);
  Content.Builder.call(this, types, base || new Profile({}));
};
util.inherits(Profile.Builder,Content.Builder);

utils.defineProperty(
  'describes',Profile,
  function() {
    return this.get(as.describes);
  },
  function(val) {
    this.set(as.describes, val);
    return this;
  }
);

module.exports = Profile;
