/**
 * Copyright 2013 International Business Machines Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Utility library for working with Activity Streams Actions
 * Requires underscorejs.
 *
 * @author James M Snell (jasnell@us.ibm.com)
 */
var util     = require('util');
var interval = require('linkeddata-vocabs').interval;
var xsd      = require('linkeddata-vocabs').xsd;
var AsObject = require('../models').Object;
var utils    = require('../utils');
var reasoner = require('../reasoner');

function Interval(expanded) {
  if (!(this instanceof Interval))
    return new Interval(expanded);
  AsObject.call(this, expanded);
}
util.inherits(Interval, AsObject);

utils.define(Interval.prototype, 'upper', function() {
  return this.get(interval.upper);
});
utils.define(Interval.prototype, 'lower', function() {
  return this.get(interval.lower);
});
utils.define(Interval.prototype, 'step', function() {
  return this.get(interval.step);
});

Interval.Builder = function(types, base) {
  if (!(this instanceof Interval.Builder))
    return new Interval.Builder(types, base);
  AsObject.Builder.call(
    this,
    utils.merge_types(reasoner, interval.Interval, types),
    base || new Interval({}));
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

Interval.Builder.prototype.upper = function(val) {
  _set.call(this, interval.upper, val);
  return this;
};
Interval.Builder.prototype.lower = function(val) {
  _set.call(this, interval.lower, val);
  return this;
};
Interval.Builder.prototype.step = function(val) {
  _set.call(this, interval.step, val);
  return this;
};

module.exports = Interval;
