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

var vocabs = require('linkeddata-vocabs');
var reasoner = require('../reasoner');
var utils = require('../utils');

utils.define(exports,'Base',function() {
  return require('./_base');
});

utils.define(exports,'Object',function() {
  return require('./_object');
});

utils.define(exports,'Activity',function() {
  return require('./_activity');
});

utils.define(exports,'Actor',function() {
  return require('./_actor');
});

utils.define(exports,'Collection',function() {
  return require('./_collection');
});

utils.define(exports,'OrderedCollection',function() {
  return require('./_orderedcollection');
});

utils.define(exports,'Content',function() {
  return require('./_content');
});

utils.define(exports,'Link',function() {
  return require('./_link');
});

utils.define(exports,'Place',function() {
  return require('./_place');
});

utils.define(exports,'Relationship',function() {
  return require('./_relationship');
});

utils.define(exports,'Profile',function() {
  return require('./_profile');
});

utils.define(exports,'Question',function() {
  return require('./_question');
});

function core_recognizer(type) {
  var thing;
  if (reasoner.isSubClassOf(type,vocabs.as.Link)) {
    thing = exports.Link;
  } else if (reasoner.isSubClassOf(type,vocabs.as.OrderedCollection)) {
    thing = exports.OrderedCollection;
  } else if (reasoner.isSubClassOf(type,vocabs.as.Collection)) {
    thing = exports.Collection;
  } else if (reasoner.isSubClassOf(type,vocabs.as.Actor)) {
    thing = exports.Actor;
  } else if (reasoner.isSubClassOf(type,vocabs.as.Question)) {
    thing = exports.Question;
  } else if (reasoner.isSubClassOf(type,vocabs.as.Activity)) {
    thing = exports.Activity;
  } else if (reasoner.isSubClassOf(type,vocabs.as.Profile)) {
    thing = exports.Profile;
  } else if (reasoner.isSubClassOf(type,vocabs.as.Content)) {
    thing = exports.Content;
  } else if (reasoner.isSubClassOf(type,vocabs.as.Place)) {
    thing = exports.Place;
  } else if (reasoner.isSubClassOf(type,vocabs.as.Relationship)) {
    thing = exports.Relationship;
  }
  return thing;
}

var recognizers = [
  core_recognizer
];
function recognize(type) {
  for (var n = 0, l = recognizers.length; n < l; n++) {
    var thing = recognizers[n](type);
    if (thing) return thing;
  }
  return undefined;
}

exports.use = function(recognizer) {
  if (typeof recognizer !== 'function')
    throw Error('Recognizer must be a function');
  recognizers.push(recognizer);
};

exports.wrap_object = function (expanded) {
  var types = expanded['@type'] || [];
  var thing;
  // this isn't that great yet because it uses the
  // first recognized type and does not verify if
  // the full set of declared types make sense
  // together. Will need to add that in later
  for (var n = 0, l = types.length; n < l; n++) {
    var type = types[n];
    thing = recognize(type);
    if (thing !== undefined) break; // jump out early if we get a hit
  }
  thing = thing || exports.Object;
  return thing(expanded);
};
