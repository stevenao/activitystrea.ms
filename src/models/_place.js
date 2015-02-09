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
var util = require('util');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');
var AsObject = require('./_object');

function Place(expanded, reasoner, parent) {
  if (!(this instanceof Place))
    return new Place(expanded, reasoner, parent);
  AsObject.call(this, expanded, reasoner, parent);
}
util.inherits(Place, AsObject);
utils.define(Place.prototype, 'accuracy', function() {
  var ret = Math.min(100, Math.max(0, this.get(vocabs.as.accuracy)));
  return isNaN(ret) ? undefined : ret ;
});
utils.define(Place.prototype, 'altitude', function() {
  var ret = this.get(vocabs.as.altitude);
  return isNaN(ret) ? undefined : ret ;
});
utils.define(Place.prototype, 'latitude', function() {
  var ret = Math.min(90.0, Math.max(-90.0, this.get(vocabs.as.latitude)));
  return isNaN(ret) ? undefined : ret ;
});
utils.define(Place.prototype, 'longitude', function() {
  var ret = Math.min(180.0, Math.max(-180.0, this.get(vocabs.as.longitude)));
  return isNaN(ret) ? undefined : ret ;
});
utils.define(Place.prototype, 'radius', function() {
  var ret = Math.max(0, this.get(vocabs.as.radius));
  return isNaN(ret) ? undefined : ret ;
});
utils.define(Place.prototype, 'units', function() {
  return this.get(vocabs.as.units);
});

Place.Builder = function(reasoner,types,base) {
  if (!(this instanceof Place.Builder))
    return new Place.Builder(reasoner,types,base);
  AsObject.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.Place, types),
    base || new Place({},reasoner));
};
util.inherits(Place.Builder,AsObject.Builder);

Place.Builder.prototype.accuracy = function(val) {
  utils.set_ranged_val.call(this, vocabs.as.accuracy, val, 0.00, 100.0, vocabs.xsd.float);
  return this;
};
Place.Builder.prototype.altitude = function(val) {
  utils.throwif(!utils.is_number(val), 'altitude must be a number');
  this.set(vocabs.as.altitude, val, {type: vocabs.xsd.float});
  return this;
};
Place.Builder.prototype.latitude = function(val) {
  utils.throwif(!utils.is_number(val), 'latitude must be a number');
  utils.set_ranged_val.call(this, vocabs.as.latitude, val, -90.0, 90.0, vocabs.xsd.float);
  return this;
};
Place.Builder.prototype.longitude = function(val) {
  utils.throwif(!utils.is_number(val), 'longitude must be a number');
  utils.set_ranged_val.call(this, vocabs.as.longitude, val, -180.0, 180.0, vocabs.xsd.float);
  return this;
};
Place.Builder.prototype.radius = function(val) {
  utils.throwif(!utils.is_number(val), 'radius must be a number');
  utils.set_ranged_val.call(this, vocabs.as.radius, val, 0.00, Infinity, vocabs.xsd.float);
  return this;
};
Place.Builder.prototype.units = function(val) {
  this.set(vocabs.as.units, val);
  return this;
};

module.exports = Place;