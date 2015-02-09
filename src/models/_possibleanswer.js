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
var util = require('util');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');
var Content = require('./_content');

function PossibleAnswer(expanded, reasoner, parent) {
  if (!(this instanceof PossibleAnswer))
    return new PossibleAnswer(expanded, reasoner, parent);
  Content.call(this, expanded, reasoner, parent);
}
util.inherits(PossibleAnswer, Content);
utils.define(PossibleAnswer.prototype, 'shape', function() {
  return this.get(vocabs.as.shape);
});

PossibleAnswer.Builder = function(reasoner, types, base) {
  if (!(this instanceof PossibleAnswer.Builder))
    return new PossibleAnswer.Builder(reasoner,types,base);
  Content.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.PossibleAnswer,types),
    base || new PossibleAnswer({},reasoner));
};
util.inherits(PossibleAnswer.Builder, Content.Builder);
PossibleAnswer.Builder.prototype.shape = function(val) {
  this.set(vocabs.as.shape, val);
  return this;
};

module.exports = PossibleAnswer;
