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
var util     = require('util');
var utils    = require('../utils');
var vocabs   = require('linkeddata-vocabs');

function Population(store, reasoner, id, subject) {
  if (!(this instanceof Population))
    return new Population(store, reasoner, id, subject);
  AsObject.call(this, store, reasoner, id, subject);
}
util.inherits(Population, AsObject);

utils.define(Population.prototype, 'distance', function() {
  var ret = Math.max(0,this.get(vocabs.social.distance));
  return isNaN(ret) ? undefined : ret;
});

Population.Builder = function(reasoner,types, base) {
  if (!(this instanceof Population.Builder))
    return new Population.Builder(reasoner, types, base);
  AsObject.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.social.Population, types),
    base || new Population(undefined, reasoner));
};
util.inherits(Population.Builder, AsObject.Builder);

Population.Builder.prototype.distance = function(val) {
  utils.set_non_negative_int.call(this, vocabs.social.distance, val);
  return this;
};

module.exports = Population;
