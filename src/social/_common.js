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

var social = require('linkeddata-vocabs').social;
var util = require('util');
var reasoner = require('../reasoner');
var utils = require('../utils');
var Population = require('./_population');

function Common(expanded,builder) {
  if (!(this instanceof Common))
    return new Common(expanded, builder);
  Population.call(this, expanded, builder || Common.Builder);
}
util.inherits(Common, Population);

Common.Builder = function(types,base) {
  if (!(this instanceof Common.Builder))
    return new Common.Builder(types,base);
  Population.Builder.call(
    this,
    utils.merge_types(reasoner, social.Common, types),
    base || new Common({}));
};
util.inherits(Common.Builder,Population.Builder);

utils.defineProperty(
  'havingDimension', Common,
  function() {
    return this.get(social.havingDimension);
  },
  function(val) {
    this.set(social.havingDimension, val);
    return this;
  }
);

utils.defineProperty(
  'confidence', Common,
  function() {
    var ret = Math.min(100,Math.max(0,this.get(social.confidence)));
    return isNaN(ret) ? undefined : ret;
  },
  function(val) {
    if (!utils.is_integer(val))
      throw Error('confidence must be an integer between 0 and 100');
    val = Math.max(0, Math.min(100, val));
    this.set(social.confidence, val);
    return this;
  }
);

module.exports = Common;
