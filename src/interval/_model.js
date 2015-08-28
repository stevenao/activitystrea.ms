'use strict';

const util     = require('util');
const interval = require('linkeddata-vocabs').interval;
const xsd      = require('linkeddata-vocabs').xsd;
const AsObject = require('../models').Object;
const utils    = require('../utils');

function Interval(expanded, builder) {
  if (!(this instanceof Interval))
    return new Interval(expanded, builder);
  AsObject.call(this, expanded, builder || Interval.Builder);
}
util.inherits(Interval, AsObject);

Interval.Builder = function(types, base) {
  if (!(this instanceof Interval.Builder))
    return new Interval.Builder(types, base);
  types = (types || []).concat([interval.Interval]);
  AsObject.Builder.call(this, types, base || new Interval({}));
};
util.inherits(Interval.Builder, AsObject.Builder);

function _set(key, val) {
  var options = {};
  if (utils.is_primitive(val)) {
    if (utils.is_string(val))
      options.type = xsd.string;
    else if (utils.is_number(val)) {
      if (utils.is_integer(val))
        options.type = xsd.integer;
      else
        options.type = xsd.decimal;
    } else if (utils.is_boolean(val)) {
      options.type = xsd.boolean;
    }
  } else if (utils.is_date(val)) {
    options.type = xsd.dateTime;
  }
  this.set(key, val, options);
}

utils.defineProperty(
  'upper',Interval,
  function() {
    return this.get(interval.upper);
  },
  function(val) {
    _set.call(this, interval.upper, val);
    return this;
  }
);

utils.defineProperty(
  'lower',Interval,
  function() {
    return this.get(interval.lower);
  },
  function(val) {
    _set.call(this, interval.lower, val);
    return this;
  }
);

utils.defineProperty(
  'step',Interval,
  function() {
    return this.get(interval.step);
  },
  function(val) {
    _set.call(this, interval.step, val);
    return this;
  }
);

module.exports = Interval;
