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
var Population = require('./population');
var util = require('util');
var utils = require('../utils');
var vocabs = require('../vocabs');

function CompoundPopulation(store, reasoner, id, subject) {
  if (!(this instanceof CompoundPopulation))
    return new CompoundPopulation(store, reasoner, id, subject);
  Population.call(this, store, reasoner, id, subject);
}
util.inherits(CompoundPopulation, Population);
utils.define(CompoundPopulation.prototype, 'member', function() {
  return this.get(vocabs.social.member);
});

CompoundPopulation.Builder = function(reasoner,types,base) {
  if (!(this instanceof CompoundPopulation.Builder))
    return new CompoundPopulation.Builder(reasoner,types,base);
  Population.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.social.CompoundPopulation, types),
    base || new CompoundPopulation(undefined,reasoner));
};
util.inherits(CompoundPopulation.Builder,Population.Builder);

CompoundPopulation.Builder.prototype.member = function(val) {
  this.set(vocabs.social.member, val);
  return this;
};

module.exports = CompoundPopulation;
