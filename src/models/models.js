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

exports.Base               = require('./_base');
exports.Object             = require('./_object');
exports.Activity           = require('./_activity');
exports.Actor              = require('./_actor');
exports.Collection         = require('./_collection');
exports.OrderedCollection  = require('./_orderedcollection');
exports.Content            = require('./_content');
exports.Link               = require('./_link');
exports.Place              = require('./_place');
exports.Relationship       = require('./_relationship');
exports.Profile            = require('./_profile');
exports.Question           = require('./_question');

exports.Interval           = require('./interval/_interval');
exports.Population         = require('./social/_population');
exports.CompoundPopulation = require('./social/_compoundpopulation');
exports.Everyone           = require('./social/_everyone');
exports.Interested         = require('./social/_interested');
exports.Common             = require('./social/_common');

exports.wrap_object = function (expanded, reasoner, parent) {
  var types = expanded['@type'] || [];
  var thing = exports.Object;
  // TODO: make this more efficient
  for (var n = 0, l = types.length; n < l; n++) {
    var type = types[n];
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
    } else if (reasoner.isSubClassOf(type,vocabs.interval.Interval)) {
      thing = exports.Interval;
    } else if (reasoner.isSubClassOf(type,vocabs.social.Common)) {
      thing = exports.Common;
    } else if (reasoner.isSubClassOf(type,vocabs.social.Interested)) {
      thing = exports.Interested;
    } else if (reasoner.isSubClassOf(type,vocabs.social.CompoundPopulation)) {
      thing = exports.CompoundPopulation;
    } else if (reasoner.isSubClassOf(type,vocabs.social.Everyone)) {
      thing = exports.Everyone;
    } else if (reasoner.isSubClassOf(type,vocabs.social.Population)) {
      thing = exports.Population;
    }
  }
  return thing(expanded, reasoner, parent);
};
