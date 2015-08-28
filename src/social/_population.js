'use strict';

const util     = require('util');
const AsObject = require('../models').Object;
const utils    = require('../utils');
const social   = require('linkeddata-vocabs').social;

function Population(expanded, builder) {
  if (!(this instanceof Population))
    return new Population(expanded, builder);
  AsObject.call(this, expanded, builder || Population.Builder);
}
util.inherits(Population, AsObject);

Population.Builder = function(types, base) {
  if (!(this instanceof Population.Builder))
    return new Population.Builder(types, base);
  types = (types || []).concat([social.Population]);
  AsObject.Builder.call(this, types,base || new Population({}));
};
util.inherits(Population.Builder, AsObject.Builder);

utils.defineProperty(
  'distance',Population,
  function() {
    var ret = Math.max(0,this.get(social.distance));
    return isNaN(ret) ? undefined : ret;
  },
  function(val) {
    utils.set_non_negative_int.call(this, social.distance, val);
    return this;
  }
);

module.exports = Population;
