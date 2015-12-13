'use strict';

const interval = require('vocabs-interval');
const xsd = require('vocabs-xsd');
const AsObject = require('../models').Object;
const utils = require('../utils');
const is_string = utils.is_string;
const is_primitive = utils.is_primitive;
const is_integer = utils.is_integer;
const is_date = utils.is_date;
const is_boolean = utils.is_boolean;

function _set(target, key, val) {
  let options = {};
  if (is_primitive(val)) {
    if (is_string(val))
      options.type = xsd.string;
    else if (!isNaN(val)) {
      if (is_integer(val))
        options.type = xsd.integer;
      else
        options.type = xsd.decimal;
    } else if (is_boolean(val)) {
      options.type = xsd.boolean;
    }
  } else if (is_date(val)) {
    options.type = xsd.dateTime;
  }
  target.set(key, val, options);
}

class Interval extends AsObject {
  constructor(expanded, builder, environment) {
    super(expanded, builder || Interval.Builder, environment);
  }

  get upper() {
    return this.get(interval.upper);
  }

  get lower() {
    return this.get(interval.lower);
  }

  get step() {
    return this.get(interval.step);
  }
}

class IntervalBuilder extends AsObject.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([interval.Interval]);
    super(types, base || new Interval({}, undefined, environment));
  }

  upper(val) {
    _set(this, interval.upper, val);
    return this;
  }

  lower(val) {
    _set(this, interval.lower, val);
    return this;
  }

  step(val) {
    _set(this, interval.step, val);
    return this;
  }
}
Interval.Builder = IntervalBuilder;

module.exports = Interval;
