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
'use strict';

var util       = require('util');
var reasoner   = require('../reasoner');
var utils      = require('../utils');
var as     = require('linkeddata-vocabs').as;
var Activity = require('./_activity');

function Question(expanded, builder) {
  if (!(this instanceof Question))
    return new Question(expanded, builder);
  Activity.call(this, expanded, builder || Question.Builder);
}
util.inherits(Question, Activity);

Question.Builder = function(types,base) {
  if (!(this instanceof Question.Builder))
    return new Question.Builder(types, base);
  Activity.Builder.call(
    this,
    utils.merge_types(reasoner, as.Question, types),
    base || new Question({}));
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
