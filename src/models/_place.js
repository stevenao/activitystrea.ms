'use strict';

const utils = require('../utils');
const vocabs = require('linkeddata-vocabs');
const AsObject = require('./_object');
const as = vocabs.as;
const xsd = vocabs.xsd;

class Place extends AsObject {
  constructor(expanded, builder) {
    super(expanded, builder || Place.Builder);
  }

  get accuracy() {
    var ret = Math.min(100, Math.max(0, this.get(as.accuracy)));
    return isNaN(ret) ? undefined : ret ;
  }

  get altitude() {
    var ret = this.get(as.altitude);
    return isNaN(ret) ? undefined : ret ;
  }

  get latitude() {
    var ret = Math.min(90.0, Math.max(-90.0, this.get(as.latitude)));
    return isNaN(ret) ? undefined : ret ;
  }

  get longitude() {
    var ret = Math.min(180.0, Math.max(-180.0, this.get(as.longitude)));
    return isNaN(ret) ? undefined : ret ;
  }

  get radius() {
    var ret = Math.max(0, this.get(as.radius));
    return isNaN(ret) ? undefined : ret ;
  }

  get units() {
    return this.get(as.units);
  }

}

class PlaceBuilder extends AsObject.Builder {
  constructor(types, base) {
    types = (types || []).concat([as.Place]);
    super(types, base || new Place({}));
  }

  accuracy(val) {
    utils.set_ranged_val.call(this, as.accuracy, val, 0.00, 100.0, xsd.float);
    return this;
  }

  altitude(val) {
    utils.throwif(isNaN(val), 'altitude must be a number');
    this.set(as.altitude, val, {type: xsd.float});
    return this;
  }

  latitude(val) {
    utils.throwif(isNaN(val), 'latitude must be a number');
    utils.set_ranged_val.call(this, as.latitude, val, -90.0, 90.0, xsd.float);
    return this;
  }

  longitude(val) {
    utils.throwif(isNaN(val), 'longitude must be a number');
    utils.set_ranged_val.call(
      this, as.longitude, val, -180.0, 180.0, xsd.float);
    return this;
  }

  radius(val) {
    utils.throwif(isNaN(val), 'radius must be a number');
    utils.set_ranged_val.call(this, as.radius, val, 0.00, Infinity, xsd.float);
    return this;
  }

  units(val) {
    return this.set(as.units,val);
  }
}
Place.Builder = PlaceBuilder;

module.exports = Place;
