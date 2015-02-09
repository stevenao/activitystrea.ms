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
var vocabs = require('linkeddata-vocabs');
var util = require('util');
var utils = require('../utils');
var AsObject = require('./_object');

function Content(expanded, reasoner, parent) {
  if (!(this instanceof Content))
    return new Content(expanded, reasoner, parent);
  AsObject.call(this, expanded, reasoner, parent);
}
util.inherits(Content, AsObject);
utils.define(Content.prototype, 'height', function() {
  var ret = Math.max(0, this.get(vocabs.as.height));
  return isNaN(ret) ? 0 : ret;
});
utils.define(Content.prototype, 'width', function() {
  var ret = Math.max(0, this.get(vocabs.as.width));
  return isNaN(ret) ? 0 : ret;
});
utils.define(Content.prototype, 'duration', function() {
  return this.get(vocabs.as.duration);
});

Content.Builder = function(reasoner, types, base) {
  if (!(this instanceof Content.Builder))
    return new Content.Builder(reasoner, types, base);
  AsObject.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner, vocabs.as.Content, types),
    base || new Content({}, reasoner));
};
util.inherits(Content.Builder, AsObject.Builder);

Content.Builder.prototype.height = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.height, val);
  return this;
};
Content.Builder.prototype.width = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.width, val);
};
Content.Builder.prototype.duration = function(val) {
  utils.set_duration_val.call(this, vocabs.as.duration, val);
  return this;
};

module.exports = Content;
