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
'use strict';

var util = require('util');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');
var as = vocabs.as;
var xsd = vocabs.xsd;
var AsObject = require('./_object');

function Place(expanded, builder) {
  if (!(this instanceof Place))
    return new Place(expanded, builder);
  AsObject.call(this, expanded, builder || Place.Builder);
}
util.inherits(Place, AsObject);

Place.Builder = function(types,base) {
  if (!(this instanceof Place.Builder))
    return new Place.Builder(types,base);
  types = (types || []).concat([as.Place]);
  AsObject.Builder.call(this, types, base || new Place({}));
};
util.inherits(Place.Builder,AsObject.Builder);

utils.defineProperty(
  'accuracy',Place,
  function() {
    var ret = Math.min(100, Math.max(0, this.get(as.accuracy)));
    return isNaN(ret) ? undefined : ret ;
  },
  function(val) {
    utils.set_ranged_val.call(this, as.accuracy, val, 0.00, 100.0, xsd.float);
    return this;
  }
);

utils.defineProperty(
  'altitude',Place,
  function() {
    var ret = this.get(as.altitude);
    return isNaN(ret) ? undefined : ret ;
  },
  function(val) {
    utils.throwif(!utils.is_number(val), 'altitude must be a number');
    this.set(as.altitude, val, {type: xsd.float});
    return this;
  }
);

utils.defineProperty(
  'latitude',Place,
  function() {
    var ret = Math.min(90.0, Math.max(-90.0, this.get(as.latitude)));
    return isNaN(ret) ? undefined : ret ;
  },
  function(val) {
    utils.throwif(!utils.is_number(val), 'latitude must be a number');
    utils.set_ranged_val.call(this, as.latitude, val, -90.0, 90.0, xsd.float);
    return this;
  }
);

utils.defineProperty(
  'longitude',Place,
  function() {
    var ret = Math.min(180.0, Math.max(-180.0, this.get(as.longitude)));
    return isNaN(ret) ? undefined : ret ;
  },
  function(val) {
    utils.throwif(!utils.is_number(val), 'longitude must be a number');
    utils.set_ranged_val.call(
      this, as.longitude, val, -180.0, 180.0, xsd.float);
    return this;
  }
);

utils.defineProperty(
  'radius',Place,
  function() {
    var ret = Math.max(0, this.get(as.radius));
    return isNaN(ret) ? undefined : ret ;
  },
  function(val) {
    utils.throwif(!utils.is_number(val), 'radius must be a number');
    utils.set_ranged_val.call(this, as.radius, val, 0.00, Infinity, xsd.float);
    return this;
  }
);

utils.defineProperty(
  'units',Place,
  function() {
    return this.get(as.units);
  },
  function(val) {
    this.set(as.units, val);
    return this;
  }
);

module.exports = Place;
