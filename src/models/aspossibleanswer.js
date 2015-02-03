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
var AsContent = require('./ascontent');
var util = require('util');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');

function AsPossibleAnswer(store, reasoner, id, subject) {
  if (!(this instanceof AsPossibleAnswer))
    return new AsPossibleAnswer(store, reasoner, id, subject);
  AsContent.call(this, store, reasoner, id, subject);
}
util.inherits(AsPossibleAnswer, AsContent);
utils.define(AsPossibleAnswer.prototype, 'shape', function() {
  return this.get(vocabs.as.shape);
});

AsPossibleAnswer.Builder = function(reasoner, types, base) {
  if (!(this instanceof AsPossibleAnswer.Builder))
    return new AsPossibleAnswer.Builder(reasoner,types,base);
  AsContent.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.PossibleAnswer,types),
    base || new AsPossibleAnswer(undefined,reasoner));
};
util.inherits(AsPossibleAnswer.Builder, AsContent.Builder);
AsPossibleAnswer.Builder.prototype.shape = function(val) {
  this.set(vocabs.as.shape, val);
  return this;
};

module.exports = AsPossibleAnswer;
