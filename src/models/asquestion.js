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
var AsActivity = require('./asactivity');
var util       = require('util');
var utils      = require('../utils');
var vocabs     = require('../vocabs');

function AsQuestion(store, reasoner, id, subject) {
  if (!(this instanceof AsQuestion))
    return new AsQuestion(store, reasoner, id, subject);
  AsActivity.call(this, store, reasoner, id, subject);
}
util.inherits(AsQuestion, AsActivity);
utils.define(AsQuestion.prototype, 'height', function() {
  var ret = Math.max(0,this.get(vocabs.as.height));
  return isNaN(ret) ? 0 : ret;
});
utils.define(AsQuestion.prototype, 'width', function() {
  var ret = Math.max(0,this.get(vocabs.as.width));
  return isNaN(ret) ? 0 : ret;
});
utils.define(AsQuestion.prototype, 'duration', function() {
  return this.get(vocabs.as.duration);
});
utils.define(AsQuestion.prototype, 'anyOf', function() {
  return this.get(vocabs.as.anyOf);
});
utils.define(AsQuestion.prototype, 'oneOf', function() {
  return this.get(vocabs.as.oneOf);
});

AsQuestion.Builder = function(reasoner,types,base) {
  if (!(this instanceof AsQuestion.Builder))
    return new AsQuestion.Builder(reasoner, types, base);
  AsActivity.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.Question, types),
    base || new AsQuestion(undefined,reasoner));
};
util.inherits(AsQuestion.Builder, AsActivity.Builder);

AsQuestion.Builder.prototype.height = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.height, val);
  return this;
};
AsQuestion.Builder.prototype.width = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.width, val);
  return this;
};
AsQuestion.Builder.prototype.duration = function(val) {
  utils.set_duration_vall.call(this, vocabs.as.duration, val);
  return this;
};
AsQuestion.Builder.prototype.oneOf = function(val) {
  this.set(vocabs.as.oneOf, val);
  return this;
};
AsQuestion.Builder.prototype.anyOf = function(val) {
  this.set(vocabs.as.anyOf, val);
  return this;
};

module.exports = AsQuestion;

