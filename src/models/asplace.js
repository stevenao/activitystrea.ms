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
var AsObject = require('./asobject');
var util = require('util');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');

function AsPlace(store, reasoner, id, subject) {
  if (!(this instanceof AsPlace))
    return new AsPlace(store, reasoner, id, subject);
  AsObject.call(this, store, reasoner, id, subject);
}
util.inherits(AsPlace, AsObject);
utils.define(AsPlace.prototype, 'accuracy', function() {
  var ret = Math.min(100, Math.max(0, this.get(vocabs.as.accuracy)));
  return isNaN(ret) ? undefined : ret ;
});
utils.define(AsPlace.prototype, 'altitude', function() {
  var ret = this.get(vocabs.as.altitude);
  return isNaN(ret) ? undefined : ret ;
});
utils.define(AsPlace.prototype, 'latitude', function() {
  var ret = Math.min(90.0, Math.max(-90.0, this.get(vocabs.as.latitude)));
  return isNaN(ret) ? undefined : ret ;
});
utils.define(AsPlace.prototype, 'longitude', function() {
  var ret = Math.min(180.0, Math.max(-180.0, this.get(vocabs.as.longitude)));
  return isNaN(ret) ? undefined : ret ;
});
utils.define(AsPlace.prototype, 'radius', function() {
  var ret = Math.max(0, this.get(vocabs.as.radius));
  return isNaN(ret) ? undefined : ret ;
});
utils.define(AsPlace.prototype, 'units', function() {
  return this.get(vocabs.as.units);
});

AsPlace.Builder = function(reasoner,types,base) {
  if (!(this instanceof AsPlace.Builder))
    return new AsPlace.Builder(reasoner,types,base);
  AsObject.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.Place, types),
    base || new AsPlace(undefined,reasoner));
};
util.inherits(AsPlace.Builder,AsObject.Builder);

AsPlace.Builder.prototype.accuracy = function(val) {
  utils.set_ranged_val.call(this, vocabs.as.accuracy, val, 0.00, 100.0, vocabs.xsd.float);
  return this;
};
AsPlace.Builder.prototype.altitude = function(val) {
  utils.throwif(!utils.is_number(val), 'altitude must be a number');
  this.set(vocabs.as.altitude, val, {type: vocabs.xsd.float});
  return this;
};
AsPlace.Builder.prototype.latitude = function(val) {
  utils.throwif(!utils.is_number(val), 'latitude must be a number');
  utils.set_ranged_val.call(this, vocabs.as.latitude, val, -90.0, 90.0, vocabs.xsd.float);
  return this;
};
AsPlace.Builder.prototype.longitude = function(val) {
  utils.throwif(!utils.is_number(val), 'longitude must be a number');
  utils.set_ranged_val.call(this, vocabs.as.longitude, val, -180.0, 180.0, vocabs.xsd.float);
  return this;
};
AsPlace.Builder.prototype.radius = function(val) {
  utils.throwif(!utils.is_number(val), 'radius must be a number');
  utils.set_ranged_val.call(this, vocabs.as.radius, val, 0.00, Infinity, vocabs.xsd.float);
  return this;
};
AsPlace.Builder.prototype.units = function(val) {
  this.set(vocabs.as.units, val);
  return this;
};

module.exports = AsPlace;