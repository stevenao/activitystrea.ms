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

var util     = require('util');
var AsObject = require('../models').Object;
var utils    = require('../utils');
var social   = require('linkeddata-vocabs').social;

function Population(expanded, builder) {
  if (!(this instanceof Population))
    return new Population(expanded, builder);
  AsObject.call(this, expanded, builder || Population.Builder);
}
util.inherits(Population, AsObject);

Population.Builder = function(types, base) {
  if (!(this instanceof Population.Builder))
    return new Population.Builder(types, base);
  types = (types || []).concat([social.Population]);
  AsObject.Builder.call(this, types,base || new Population({}));
};
util.inherits(Population.Builder, AsObject.Builder);

utils.defineProperty(
  'distance',Population,
  function() {
    var ret = Math.max(0,this.get(social.distance));
    return isNaN(ret) ? undefined : ret;
  },
  function(val) {
    utils.set_non_negative_int.call(this, social.distance, val);
    return this;
  }
);

module.exports = Population;
