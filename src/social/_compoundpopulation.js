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
var Population = require('./_population');
var util = require('util');
var reasoner = require('../reasoner');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');

function CompoundPopulation(expanded) {
  if (!(this instanceof CompoundPopulation))
    return new CompoundPopulation(expanded);
  Population.call(this, expanded);
}
util.inherits(CompoundPopulation, Population);
utils.define(CompoundPopulation.prototype, 'member', function() {
  return this.get(vocabs.social.member);
});

CompoundPopulation.Builder = function(types,base) {
  if (!(this instanceof CompoundPopulation.Builder))
    return new CompoundPopulation.Builder(types,base);
  Population.Builder.call(
    this,
    utils.merge_types(reasoner, vocabs.social.CompoundPopulation, types),
    base || new CompoundPopulation({}));
};
util.inherits(CompoundPopulation.Builder,Population.Builder);

CompoundPopulation.Builder.prototype.member = function(val) {
  this.set(vocabs.social.member, val);
  return this;
};

module.exports = CompoundPopulation;
