'use strict';

const interval = require('linkeddata-vocabs').interval;
const xsd      = require('linkeddata-vocabs').xsd;
const AsObject = require('../models').Object;
const utils    = require('../utils');

function _set(target, key, val) {
  let options = {};
  if (utils.is_primitive(val)) {
    if (utils.is_string(val))
      options.type = xsd.string;
    else if (!isNaN(val)) {
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
  target.set(key, val, options);
}

class Interval extends AsObject {
  constructor(expanded, builder) {
    super(expanded, builder || Interval.Builder);
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
  constructor(types, base) {
    types = (types || []).concat([interval.Interval]);
    super(types, base || new Interval());
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
