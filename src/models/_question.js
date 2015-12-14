'use strict';

const as = require('vocabs-as');
const Activity = require('./_activity');
const Base = require('./_base');
const composedType = Base.composedType;

const Question = composedType(Activity, {
  get anyOf() {
    return this.get(as.anyOf);
  },
  get oneOf() {
    return this.get(as.oneOf);
  }
});

const QuestionBuilder = composedType(Activity.Builder, {
  anyOf(val) {
    return this.set(as.anyOf, val);
  },
  oneOf(val) {
    return this.set(as.oneOf, val);
  }
});
Question.Builder = QuestionBuilder;

module.exports = Question;
