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
var vocabs   = require('linkeddata-vocabs');
var utils    = require('../utils');
var AsObject = require('./_object');
var as = vocabs.as;
var xsd = vocabs.xsd;

function Activity(expanded,builder) {
  if (!(this instanceof Activity))
    return new Activity(expanded,builder);
  AsObject.call(this, expanded, builder || Activity.Builder);
}
util.inherits(Activity, AsObject);

Activity.Builder = function(types, base) {
  if (!(this instanceof Activity.Builder))
    return new Activity.Builder(types, base);
  types = (types || []).concat([as.Activity]);
  AsObject.Builder.call(this, types, base || new Activity({}));
};
util.inherits(Activity.Builder, AsObject.Builder);

utils.defineProperty(
  'actor', Activity,
  function() {
    return this.get(as.actor);
  },
  function(val) {
    this.set(as.actor, val);
    return this;
  }
);

utils.defineProperty(
  'object', Activity,
  function() {
    return this.get(as.object);
  },
  function(val) {
    this.set(as.object, val);
    return this;
  }
);

utils.defineProperty(
  'target', Activity,
  function() {
    return this.get(as.target);
  },
  function(val) {
    this.set(as.target, val);
    return this;
  }
);

utils.defineProperty(
  'result', Activity,
  function() {
    return this.get(as.result);
  },
  function(val) {
    this.set(as.result, val);
    return this;
  }
);

utils.defineProperty(
  'origin', Activity,
  function() {
    return this.get(as.origin);
  },
  function(val) {
    this.set(as.origin, val);
    return this;
  }
);

utils.defineProperty(
  'instrument', Activity,
  function() {
    return this.get(as.instrument);
  },
  function(val) {
    this.set(as.instrument, val);
    return this;
  }
);

utils.defineProperty(
  'priority', Activity,
  function() {
    return this.get(as.priority);
  },
  function(val) {
    utils.set_ranged_val.call(
      this,
      as.priority,
      val, 0.0, 1.0,
      xsd.float);
    return this;
  }
);

module.exports = Activity;
