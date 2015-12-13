'use strict';

const range = require('../utils').range;
const as = require('vocabs-as');
const xsd = require('vocabs-xsd');
const Base = require('./_base');
const moment = require('moment');

class Link extends Base {
  constructor(expanded, builder, environment) {
    super(expanded, builder || Link.Builder, environment);
  }

  get href() {
    let ret = this.get(as.href);
    return ret ? ret.id : undefined;
  }

  get rel() {
    return this.get(as.rel);
  }

  get mediaType() {
    return this.get(as.mediaType);
  }

  get name() {
    return this.get(as.name);
  }

  get hreflang() {
    return this.get(as.hreflang);
  }

  get height() {
    let ret = range(0, Infinity, this.get(as.height));
    return isNaN(ret) ? 0 : ret;
  }

  get width() {
    let ret = range(0, Infinity, this.get(as.width));
    return isNaN(ret) ? 0 : ret;
  }

}

class LinkBuilder extends Base.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([as.Link]);
    super(types, base || new Link({}, undefined, environment));
  }

  href(val) {
    this.set(as.href, val);
    return this;
  }

  rel(val) {
    this.set(as.rel, val);
    return this;
  }

  mediaType(val) {
    this.set(as.mediaType, val);
    return this;
  }

  name(val) {
    this.set(as.name, val);
    return this;
  }

  hreflang(val) {
    return this.set(as.hreflang, val);
  }

  height(val) {
    this.set(
      as.height,
      range(0, Infinity, val),
      {type: xsd.nonNegativeInteger});
    return this;
  }

  width(val) {
    this.set(
      as.width,
      range(0, Infinity, val),
      {type: xsd.nonNegativeInteger}
    );
    return this;
  }

}
Link.Builder = LinkBuilder;

module.exports = Link;
