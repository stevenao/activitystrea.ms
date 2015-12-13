'use strict';

const as = require('vocabs-as');
const Activity = require('./_activity');

class Question extends Activity {
  constructor(expanded, builder, environment) {
    super(expanded, builder || Question.Builder, environment);
  }

  get anyOf() {
    return this.get(as.anyOf);
  }

  get oneOf() {
    return this.get(as.oneOf);
  }

}

class QuestionBuilder extends Activity.Builder {
  constructor(types, base, environment) {
    types = (types || []).concat([as.Question]);
    super(types, base || new Question({}, undefined, environment));
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
