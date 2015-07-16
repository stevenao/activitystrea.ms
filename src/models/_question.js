/**
 * Copyright 2013 International Business Machines Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Utility library for working with Activity Streams Actions
 * Requires underscorejs.
 *
 * @author James M Snell (jasnell@us.ibm.com)
 */
var util       = require('util');
var reasoner   = require('../reasoner');
var utils      = require('../utils');
var vocabs     = require('linkeddata-vocabs');
var Activity = require('./_activity');

function Question(expanded) {
  if (!(this instanceof Question))
    return new Question(expanded);
  Activity.call(this, expanded);
}
util.inherits(Question, Activity);
utils.define(Question.prototype, 'height', function() {
  var ret = Math.max(0,this.get(vocabs.as.height));
  return isNaN(ret) ? 0 : ret;
});
utils.define(Question.prototype, 'width', function() {
  var ret = Math.max(0,this.get(vocabs.as.width));
  return isNaN(ret) ? 0 : ret;
});
utils.define(Question.prototype, 'duration', function() {
  return this.get(vocabs.as.duration);
});
utils.define(Question.prototype, 'anyOf', function() {
  return this.get(vocabs.as.anyOf);
});
utils.define(Question.prototype, 'oneOf', function() {
  return this.get(vocabs.as.oneOf);
});

Question.Builder = function(types,base) {
  if (!(this instanceof Question.Builder))
    return new Question.Builder(types, base);
  Activity.Builder.call(
    this,
    utils.merge_types(reasoner, vocabs.as.Question, types),
    base || new Question({}));
};
util.inherits(Question.Builder, Activity.Builder);

Question.Builder.prototype.height = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.height, val);
  return this;
};
Question.Builder.prototype.width = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.width, val);
  return this;
};
Question.Builder.prototype.duration = function(val) {
  utils.set_duration_vall.call(this, vocabs.as.duration, val);
  return this;
};
Question.Builder.prototype.oneOf = function(val) {
  this.set(vocabs.as.oneOf, val);
  return this;
};
Question.Builder.prototype.anyOf = function(val) {
  this.set(vocabs.as.anyOf, val);
  return this;
};

module.exports = Question;
