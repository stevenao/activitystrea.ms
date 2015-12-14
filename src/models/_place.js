'use strict';

const range = require('../utils').range;
const throwif = require('../utils').throwif;
const AsObject = require('./_object');
const as = require('vocabs-as');
const xsd = require('vocabs-xsd');
const Base = require('./_base');
const composedType = Base.composedType;

const Place = composedType(undefined, {
  get accuracy() {
    let ret = range(0, 100, this.get(as.accuracy));
    return isNaN(ret) ? undefined : ret ;
  },
  get altitude() {
    let ret = this.get(as.altitude);
    return isNaN(ret) ? undefined : ret ;
  },
  get latitude() {
    let ret = range(-90.0, 90.0, this.get(as.latitude));
    return isNaN(ret) ? undefined : ret ;
  },
  get longitude() {
    let ret = range(-180.0, 180.0, this.get(as.longitude));
    return isNaN(ret) ? undefined : ret ;
  },
  get radius() {
    let ret = range(0, Infinity, this.get(as.radius));
    return isNaN(ret) ? undefined : ret ;
  },
  get units() {
    return this.get(as.units);
  }
});

const PlaceBuilder = composedType(undefined, {
  accuracy(val) {
    throwif(isNaN(val), 'accuracy must be a number');
    this.set(as.accuracy, range(0.00, 100.0, val), {type: xsd.float});
    return this;
  },
  altitude(val) {
    throwif(isNaN(val), 'altitude must be a number');
    this.set(as.altitude, val, {type: xsd.float});
    return this;
  },
  latitude(val) {
    throwif(isNaN(val), 'latitude must be a number');
    this.set(as.latitude, range(-90.0, 90.0, val), {type: xsd.float});
    return this;
  },
  longitude(val) {
    throwif(isNaN(val), 'longitude must be a number');
    this.set(as.longitude, range(-180.0, 180.0, val), {type: xsd.float});
    return this;
  },
  radius(val) {
    throwif(isNaN(val), 'radius must be a number');
    this.set(as.radius, range(0.00, Infinity, val), {type: xsd.float});
    return this;
  },
  units(val) {
    return this.set(as.units,val);
  }
});

Place.Builder = PlaceBuilder;

module.exports = Place;
