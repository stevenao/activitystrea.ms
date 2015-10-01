'use strict';

const utils      = require('../utils');
const as     = require('linkeddata-vocabs').as;
const Activity = require('./_activity');
const moment = require('moment');

class Question extends Activity {
  constructor(expanded, builder) {
    super(expanded, builder || Question.Builder);
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

  get anyOf() {
    return this.get(as.anyOf);
  }

  get oneOf() {
    return this.get(as.oneOf);
  }

}

class QuestionBuilder extends Activity.Builder {
  constructor(types, base) {
    types = (types || []).concat([as.Question]);
    super(types, base || new Question({}));
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

  anyOf(val) {
    return this.set(as.anyOf, val);
  }

  oneOf(val) {
    return this.set(as.oneOf, val);
  }
}
Question.Builder = QuestionBuilder;

module.exports = Question;
