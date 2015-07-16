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
var reasoner = require('../reasoner');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');
var AsObject = require('./_object');

function Relationship(expanded) {
  if (!(this instanceof Relationship))
    return new Relationship(expanded);
  AsObject.call(this, expanded);
}
util.inherits(Relationship, AsObject);

utils.define(Relationship.prototype, 'subject', function() {
  return this.get(vocabs.as.subject);
});

utils.define(Relationship.prototype, 'object', function() {
  return this.get(vocabs.as.object);
});

utils.define(Relationship.prototype, 'relationship', function() {
  return this.get(vocabs.as.relationship);
});

Relationship.Builder = function(types,base) {
  if (!(this instanceof Relationship.Builder))
    return new Relationship.Builder(types,base);
  AsObject.Builder.call(
    this,
    utils.merge_types(reasoner, vocabs.as.Relationship, types),
    base || new Relationship({}));
};
util.inherits(Relationship.Builder,AsObject.Builder);

Relationship.Builder.prototype.subject = function(val) {
  this.set(vocabs.as.subject, val);
  return this;
};

Relationship.Builder.prototype.object = function(val) {
  this.set(vocabs.as.object, val);
  return this;
};

Relationship.Builder.prototype.relationship = function(val) {
  this.set(vocabs.as.relationship, val);
  return this;
};

module.exports = Relationship;
