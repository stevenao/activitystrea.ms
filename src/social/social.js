/**
 * Copyright 2013 OpenSocial Foundation
 * Copyright 2013 International Business Machines Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
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

var vocabs      = require('linkeddata-vocabs');
var reasoner    = require('../reasoner');
var social = vocabs.social;
var owl = vocabs.owl;
var rdf = vocabs.rdf;
var as = vocabs.as;
var rdfs = vocabs.rdfs;

var Population = require('./_population');
var Interested = require('./_interested');
var Everyone = require('./_everyone');
var CompoundPopulation = require('./_compoundpopulation');
var Common = require('./_common');

exports.model = {
  Population: Population,
  Interested: Interested,
  Everyone: Everyone,
  CompoundPopulation: CompoundPopulation,
  Common: Common
};

function gettypes(types, type) {
  return (types || []).concat([type]);
}

exports.population = function(types) {
  return Population.Builder(types);
};
exports.everyone = function(types) {
  return Everyone.Builder(types);
};
exports.public = function(types) {
  return Population.Builder(gettypes(types, social.Public));
};
exports.private = function(types) {
  return Population.Builder(
    gettypes(types, social.Private));
};
exports.direct = function(types) {
  return Population.Builder(
    gettypes(types, social.Direct));
};
exports.common = function(types) {
  return Common.Builder(types);
};
exports.interested = function(types) {
  return Interested.Builder(types);
};
exports.self = function(types) {
  return Population.Builder(
    gettypes(types, social.Self));
};
exports.all = function(types) {
  return CompoundPopulation.Builder(
    gettypes(types, social.All));
};
exports.any = function(types) {
  return CompoundPopulation.Builder(
    gettypes(types, social.Any));
};
exports.none = function(types) {
  return CompoundPopulation.Builder(
    gettypes(types, social.None));
};
exports.compoundPopulation = function(types) {
  return CompoundPopulation.Builder(types);
};

function social_recognizer(type) {
  var thing;
  if (type) {
    var node = reasoner.node(type);
    if (node.is(social.Common)) {
      thing = Common;
    } else if (node.is(social.Interested)) {
      thing = Interested;
    } else if (node.is(social.CompoundPopulation)) {
      thing = CompoundPopulation;
    } else if (node.is(social.Everyone)) {
      thing = Everyone;
    } else if (node.is(social.Population)) {
      thing = Population;
    }
  }
  return thing;
}

exports.init = function(models, reasoner, context) {

  context.add({
    soc: 'http://ns.jasnell.me/social#',
    havingDimension: {
      '@id': 'soc:havingDimension',
      '@type': '@id'
    },
    havingRole: {
      '@id': 'soc:havingRole',
      '@type': '@id'
    },
    havingRelationship: {
      '@id': 'soc:havingRelationship',
      '@type': '@id'
    },
    distance: {
      '@id': 'soc:distance',
      '@type': 'xsd:nonNegativeInteger'
    },
    confidence: {
      '@id': 'soc:confidence',
      '@type': 'xsd:nonNegativeInteger'
    }
  });

  models.use(social_recognizer);

  var graph = new reasoner.Graph();
  [
    [social.Population, as.Object],
    [social.Everyone, social.Population],
    [social.Public, social.Population],
    [social.Private, social.Population],
    [social.Direct, social.Population],
    [social.Common, social.Population],
    [social.Interested, social.Population],
    [social.Self, social.Population],
    [social.All, social.CompoundPopulation],
    [social.Any, social.CompoundPopulation],
    [social.None, social.CompoundPopulation],
    [social.CompoundPopulation, social.Population]
  ].forEach(function (pair) {
    graph.add({
      subject: pair[0],
      predicate: rdfs.subClassOf,
      object: pair[1]
    });
  });

  var functionalDatatype = [
        owl.DatatypeProperty,
        owl.FunctionalProperty
      ];
  [
    [social.member, owl.ObjectProperty],
    [social.confidence, functionalDatatype],
    [social.havingDimension, owl.ObjectProperty],
    [social.havingRole, owl.ObjectProperty],
    [social.havingRelationship, owl.ObjectProperty],
    [social.distance, functionalDatatype]
  ].forEach(function(pair) {
    graph.add({
      subject: pair[0],
      predicate: rdf.type,
      object: pair[1]
    });
  });

  reasoner.bind(graph);
};
