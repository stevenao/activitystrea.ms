'use strict';

const as = require('vocabs-as');
const Activity = require('./_activity');
const Base = require('./_base');
const set_date_val = require('../utils').set_date_val;
const composedType = Base.composedType;

const Question = composedType(Activity, {
  get anyOf() {
    return this.get(as.anyOf);
  },
  get oneOf() {
    return this.get(as.oneOf);
  },
  get closed() {
    return this.get(as.closed);
  }
});

const QuestionBuilder = composedType(Activity.Builder, {
  anyOf(val) {
    return this.set(as.anyOf, val);
  },
  oneOf(val) {
    return this.set(as.oneOf, val);
  },
  closed(val) {
    set_date_val.call(this, as.closed, val);
    return this;
  }
});
Question.Builder = QuestionBuilder;

module.exports = Question;
