'use strict';

const util       = require('util');
const utils      = require('../utils');
const as     = require('linkeddata-vocabs').as;
const Activity = require('./_activity');

function Question(expanded, builder) {
  if (!(this instanceof Question))
    return new Question(expanded, builder);
  Activity.call(this, expanded, builder || Question.Builder);
}
util.inherits(Question, Activity);

Question.Builder = function(types,base) {
  if (!(this instanceof Question.Builder))
    return new Question.Builder(types, base);
  types = (types || []).concat([as.Question]);
  Activity.Builder.call(this, types, base || new Question({}));
};
util.inherits(Question.Builder, Activity.Builder);

utils.defineProperty(
  'height',Question,
  function() {
    var ret = Math.max(0, this.get(as.height));
    return isNaN(ret) ? 0 : ret;
  },
  function(val) {
    utils.set_non_negative_int.call(this, as.height, val);
    return this;
  }
);

utils.defineProperty(
  'width',Question,
  function() {
    var ret = Math.max(0, this.get(as.width));
    return isNaN(ret) ? 0 : ret;
  },
  function(val) {
    utils.set_non_negative_int.call(this, as.width, val);
    return this;
  }
);

utils.defineProperty(
  'duration',Question,
  function() {
    return this.get(as.duration);
  },
  function(val) {
    utils.set_duration_val.call(this, as.duration, val);
    return this;
  }
);

utils.defineProperty(
  'anyOf',Question,
  function() {
    return this.get(as.anyOf);
  },
  function(val) {
    this.set(as.anyOf, val);
    return this;
  }
);

utils.defineProperty(
  'oneOf',Question,
  function() {
    return this.get(as.oneOf);
  },
  function(val) {
    this.set(as.oneOf, val);
    return this;
  }
);

module.exports = Question;
