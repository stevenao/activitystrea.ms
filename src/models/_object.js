'use strict';

const utils = require('../utils');
const as = require('vocabs-as');
const Base = require('./_base');
const moment = require('moment');

class AsObject extends Base {
  constructor(expanded, builder, environment) {
    super(expanded, builder || AsObject.Builder, environment);
  }
  
  get mediaType() {
    return this.get(as.mediaType) || 'text/html';
  }

  get attachment() {
    return this.get(as.attachment);
  }

  get attributedTo() {
    return this.get(as.attributedTo);
  }

  get content() {
    return this.get(as.content);
  }

  get context() {
    return this.get(as.context);
  }

  get name() {
    return this.get(as.name);
  }

  get summary() {
    return this.get(as.summary);
  }

  get endTime() {
    return this.get(as.endTime);
  }

  get published() {
    return this.get(as.published);
  }

  get startTime() {
    return this.get(as.startTime);
  }

  get updated() {
    return this.get(as.updated);
  }

  get generator() {
    return this.get(as.generator);
  }

  get icon() {
    return this.get(as.icon);
  }

  get image() {
    return this.get(as.image);
  }

  get inReplyTo() {
    return this.get(as.inReplyTo);
  }

  get location() {
    return this.get(as.location);
  }

  get preview() {
    return this.get(as.preview);
  }

  get replies() {
    return this.get(as.replies);
  }

  get scope() {
    return this.get(as.scope);
  }

  get tag() {
    return this.get(as.tag);
  }

  get url() {
    return this.get(as.url);
  }

  get to() {
    return this.get(as.to);
  }

  get bto() {
    return this.get(as.bto);
  }

  get cc() {
    return this.get(as.cc);
  }

  get bcc() {
    return this.get(as.bcc);
  }

  get duration() {
    let ret = this.get(as.duration);
    if (typeof ret === 'undefined') return;
    return moment.duration(isNaN(ret)?ret:(ret*1000));
  }
}

class AsObjectBuilder extends Base.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([as.Object]);
    super(types, base || new AsObject({}, undefined, environment));
  }

  mediaType(val) {
    this.set(as.mediaType, val);
    return this;
  }

  attachment(val) {
    this.set(as.attachment, val);
    return this;
  }

  attributedTo(val) {
    this.set(as.attributedTo, val);
    return this;
  }

  content(val) {
    this.set(as.content, val);
    return this;
  }

  context(val) {
    this.set(as.context, val);
    return this;
  }

  name(val) {
    this.set(as.name, val);
    return this;
  }

  summary(val) {
    this.set(as.summary, val);
    return this;
  }

  endTime(val) {
    utils.set_date_val.call(this, as.endTime, val);
    return this;
  }

  published(val) {
    utils.set_date_val.call(this, as.published, val);
    return this;
  }

  startTime(val) {
    utils.set_date_val.call(this, as.startTime, val);
    return this;
  }

  updated(val) {
    utils.set_date_val.call(this, as.updated, val);
    return this;
  }

  endTimeNow() {
    return this.endTime(moment.utc());
  }

  startTimeNow() {
    return this.startTime(moment.utc());
  }

  publishedNow() {
    return this.published(moment.utc());
  }

  updatedNow() {
    return this.updated(moment.utc());
  }

  generator(val) {
    return this.set(as.generator, val);
  }

  icon(val) {
    return this.set(as.icon, val);
  }

  image(val) {
    return this.set(as.image, val);
  }

  inReplyTo(val) {
    return this.set(as.inReplyTo, val);
  }

  location(val) {
    return this.set(as.location, val);
  }

  preview(val) {
    return this.set(as.preview, val);
  }

  replies(val) {
    return this.set(as.replies, val);
  }

  scope(val) {
    return this.set(as.scope, val);
  }

  tag(val) {
    return this.set(as.tag, val);
  }

  url(val) {
    return this.set(as.url, val);
  }

  to(val) {
    return this.set(as.to, val);
  }

  bto(val) {
    return this.set(as.bto, val);
  }

  cc(val) {
    return this.set(as.cc, val);
  }

  bcc(val) {
    return this.set(as.bcc, val);
  }
  
  duration(val) {
    utils.set_duration_val.call(this, as.duration, val);
    return this;
  }
}
AsObject.Builder = AsObjectBuilder;

module.exports = AsObject;
