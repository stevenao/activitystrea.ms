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
var util       = require('util');
var Population = require('./_population');
var reasoner = require('../reasoner');
var utils      = require('../utils');
var social     = require('linkeddata-vocabs').social;

function Everyone(expanded, builder) {
  if (!(this instanceof Everyone))
    return new Everyone(expanded, builder);
  Population.call(this, expanded, builder || Everyone.Builder);
}
util.inherits(Everyone, Population);

Everyone.Builder = function(types,base) {
  if (!(this instanceof Everyone.Builder))
    return new Everyone.Builder(types,base);
  Population.Builder.call(
    this,
    utils.merge_types(reasoner, social.Everyone, types),
    base || new Everyone({}));
};
util.inherits(Everyone.Builder,Population.Builder);

utils.defineProperty(
  'havingRelationship',Everyone,
  function() {
    return this.get(social.havingRelationship);
  },
  function(val) {
    this.set(social.havingRelationship, val);
    return this;
  }
);

utils.defineProperty(
  'havingRole',Everyone,
  function() {
    return this.get(social.havingRole);
  },
  function(val) {
    this.set(social.havingRole, val);
    return this;
  }
);

module.exports = Everyone;
