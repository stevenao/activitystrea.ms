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
var util       = require('util');
var utils      = require('../../utils');
var vocabs     = require('linkeddata-vocabs');

function Everyone(expanded, reasoner, parent) {
  if (!(this instanceof Everyone))
    return new Everyone(expanded, reasoner, parent);
  Population.call(this, expanded, reasoner, parent);
}
util.inherits(Everyone, Population);

utils.define(Everyone.prototype, 'havingRelationship', function() {
  return this.get(vocabs.social.havingRelationship);
});
utils.define(Everyone.prototype, 'havingRole', function() {
  return this.get(vocabs.social.havingRole);
});

Everyone.Builder = function(reasoner,types,base) {
  if (!(this instanceof Everyone.Builder))
    return new Everyone.Builder(reasoner,types,base);
  Population.Builder.call(
    this,
    reasoner,
    utils.merge_types(reasoner,vocabs.social.Everyone, types),
    base || new Everyone({},reasoner));
};
util.inherits(Everyone.Builder,Population.Builder);

Everyone.Builder.prototype.havingRelationship = function(val) {
  this.set(vocabs.social.havingRelationship, val);
  return this;
};
Everyone.Builder.prototype.havingRole = function(val) {
  this.set(vocabs.social.havingRole, val);
  return this;
};

module.exports = Everyone;
