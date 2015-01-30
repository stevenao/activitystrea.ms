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
var vocabs   = require('../vocabs');

function AsActor(store, reasoner, id, subject) {
  if (!(this instanceof AsActor))
    return new AsActor(store, reasoner, id, subject);
  AsObject.call(this, store, reasoner, id, subject);
}
util.inherits(AsActor, AsObject);

utils.define(AsActor.prototype, 'actorOf', function() {
  return this.get(vocabs.as.actorOf);
});

AsActor.Builder = function(reasoner, types, base) {
  if (!(this instanceof AsActor.Builder))
    return new AsActor.Builder(reasoner, types, base);
  AsObject.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.Actor,types), 
    base || new AsActor(undefined,reasoner));
};
util.inherits(AsActor.Builder, AsObject.Builder);

AsActor.Builder.prototype.actorOf = function(val) {
  this.set(vocabs.as.actorOf, val);
  return this;
};

module.exports = AsActor;