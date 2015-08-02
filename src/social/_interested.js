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

var util       = require('util');
var Population = require('./_population');
var utils      = require('../utils');
var social     = require('linkeddata-vocabs').social;

function Interested(expanded, builder) {
  if (!(this instanceof Interested))
    return new Interested(expanded, builder);
  Population.call(this, expanded, builder || Interested.Builder);
}
util.inherits(Interested, Population);

Interested.Builder = function(types,base) {
  if (!(this instanceof Interested.Builder))
    return new Interested.Builder(types,base);
  types = (types || []).concat([social.Interested]);
  Population.Builder.call(this, types, base || new Interested({}));
};
util.inherits(Interested.Builder,Population.Builder);

utils.defineProperty(
  'confidence',Interested,
  function() {
    var ret = Math.min(100,Math.max(0,this.get(social.confidence)));
    return isNaN(ret) ? undefined : ret;
  },
  function(val) {
    if (!utils.is_integer(val))
      throw Error('confidence must be an integer between 0 and 100');
    val = Math.max(0, Math.min(100, val));
    this.set(social.confidence, val);
    return this;
  }
);

module.exports = Interested;
