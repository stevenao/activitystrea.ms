'use strict';

const utils = require('../utils');
const as = require('linkeddata-vocabs').as;
const Base = require('./_base');
const moment = require('moment');

class Link extends Base {
  constructor(expanded, builder) {
    super(expanded, builder || Link.Builder);
  }

  get href() {
    var ret = this.get(as.href);
    return ret ? ret.id : undefined;
  }

  get rel() {
    return this.get(as.rel);
  }

  get mediaType() {
    return this.get(as.mediaType);
  }

  get displayName() {
    return this.get(as.displayName);
  }

  get title() {
    return this.get(as.title);
  }

  get hreflang() {
    return this.get(as.hreflang);
  }

  get height() {
    var ret = Math.max(0, this.get(as.height));
    return isNaN(ret) ? 0 : ret;
  }

  get width() {
    var ret = Math.max(0, this.get(as.width));
    return isNaN(ret) ? 0 : ret;
  }

  get duration() {
    var ret = this.get(as.duration);
    if (typeof ret === 'undefined') return;
    return moment.duration(isNaN(ret)?ret:(ret*1000));
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

  displayName(val, lang) {
    utils.set_lang_val.call(this, as.displayName, val, lang);
    return this;
  }

  title(val, lang) {
    utils.set_lang_val.call(this, as.title, val, lang);
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

  duration(val) {
    utils.set_duration_val.call(this, as.duration, val);
    return this;
  }
}
Link.Builder = LinkBuilder;

module.exports = Link;
