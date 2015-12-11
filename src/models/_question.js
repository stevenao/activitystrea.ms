'use strict';

const utils      = require('../utils');
const as     = require('linkeddata-vocabs').as;
const Activity = require('./_activity');
const moment = require('moment');

class Question extends Activity {
  constructor(expanded, builder) {
    super(expanded, builder || Question.Builder);
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

  anyOf(val) {
    return this.set(as.anyOf, val);
  }

  oneOf(val) {
    return this.set(as.oneOf, val);
  }
}
Question.Builder = QuestionBuilder;

module.exports = Question;
