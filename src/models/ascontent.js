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
var AsObject = require('./asobject');
var util = require('util');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');

function AsContent(store, reasoner, id, subject) {
  if (!(this instanceof AsContent))
    return new AsContent(store, reasoner, id, subject);
  AsObject.call(this, store, reasoner, id, subject);
}
util.inherits(AsContent, AsObject);
utils.define(AsContent.prototype, 'height', function() {
  var ret = Math.max(0, this.get(vocabs.as.height));
  return isNaN(ret) ? 0 : ret;
});
utils.define(AsContent.prototype, 'width', function() {
  var ret = Math.max(0, this.get(vocabs.as.width));
  return isNaN(ret) ? 0 : ret;
});
utils.define(AsContent.prototype, 'duration', function() {
  return this.get(vocabs.as.duration);
});

AsContent.Builder = function(reasoner,types, base) {
  if (!(this instanceof AsContent.Builder))
    return new AsContent.Builder(reasoner, types, base);
  AsObject.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.Content, types),
    base || new AsContent(undefined, reasoner));
};
util.inherits(AsContent.Builder, AsObject.Builder);

AsContent.Builder.prototype.height = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.height, val);
  return this;
};
AsContent.Builder.prototype.width = function(val) {
  utils.set_non_negative_int.call(this, vocabs.as.width, val);
};
AsContent.Builder.prototype.duration = function(val) {
  utils.set_duration_val.call(this, vocabs.as.duration, val);
  return this;
};

module.exports = AsContent;
