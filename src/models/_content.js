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

var as = require('linkeddata-vocabs').as;
var util = require('util');
var reasoner = require('../reasoner');
var utils = require('../utils');
var AsObject = require('./_object');

function Content(expanded, builder) {
  if (!(this instanceof Content))
    return new Content(expanded, builder);
  AsObject.call(this, expanded, builder || Content.Builder);
}
util.inherits(Content, AsObject);

Content.Builder = function(types, base) {
  if (!(this instanceof Content.Builder))
    return new Content.Builder(types, base);
  AsObject.Builder.call(
    this,
    utils.merge_types(reasoner, as.Content, types),
    base || new Content({}));
};
util.inherits(Content.Builder, AsObject.Builder);

utils.defineProperty(
  'height',Content,
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
  'width',Content,
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
  'duration',Content,
  function() {
    return this.get(as.duration);
  },
  function(val) {
    utils.set_duration_val.call(this, as.duration, val);
    return this;
  }
);

module.exports = Content;
