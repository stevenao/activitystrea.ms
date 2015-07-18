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

var util = require('util');
var reasoner = require('../reasoner');
var utils = require('../utils');
var as = require('linkeddata-vocabs').as;
var AsObject = require('./_object');

function Relationship(expanded, builder) {
  if (!(this instanceof Relationship))
    return new Relationship(expanded, builder);
  AsObject.call(this, expanded, builder || Relationship.Builder);
}
util.inherits(Relationship, AsObject);

Relationship.Builder = function(types,base) {
  if (!(this instanceof Relationship.Builder))
    return new Relationship.Builder(types,base);
  AsObject.Builder.call(
    this,
    utils.merge_types(reasoner, as.Relationship, types),
    base || new Relationship({}));
};
util.inherits(Relationship.Builder,AsObject.Builder);

utils.defineProperty(
  'subject',Relationship,
  function() {
    return this.get(as.subject);
  },
  function(val) {
    this.set(as.subject, val);
    return this;
  }
);

utils.defineProperty(
  'object',Relationship,
  function() {
    return this.get(as.object);
  },
  function(val) {
    this.set(as.object, val);
    return this;
  }
);

utils.defineProperty(
  'relationship',Relationship,
  function() {
    return this.get(as.relationship);
  },
  function(val) {
    this.set(as.relationship, val);
    return this;
  }
);

module.exports = Relationship;
