'use strict';

const utils = require('../utils');
const as = require('vocabs-as');
const Base = require('./_base');
const moment = require('moment');

class Link extends Base {
  constructor(expanded, builder) {
    super(expanded, builder || Link.Builder);
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
    let ret = Math.max(0, this.get(as.height));
    return isNaN(ret) ? 0 : ret;
  }

  get width() {
    let ret = Math.max(0, this.get(as.width));
    return isNaN(ret) ? 0 : ret;
  }

}

class LinkBuilder extends Base.Builder {
  constructor(types, base) {
    types = (types || []).concat([as.Link]);
    super(types, base || new Link({}));
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
    utils.set_non_negative_int.call(this, as.height, val);
    return this;
  }

  width(val) {
    utils.set_non_negative_int.call(this, as.width, val);
    return this;
  }

}
Link.Builder = LinkBuilder;

module.exports = Link;
