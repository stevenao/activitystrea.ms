/**
 * Copyright 2013 OpenSocial Foundation
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
var vocabs      = require('linkeddata-vocabs');
var models      = require('../models');
var reasoner    = require('../reasoner');
var utils       = require('../utils');
var merge_types = utils.merge_types;

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

exports.population = function(types) {
  return Population.Builder(types);
};
exports.everyone = function(types) {
  return Everyone.Builder(types);
};
exports.public = function(types) {
  return Population.Builder(
    merge_types(reasoner, vocabs.social.Public,types));
};
exports.private = function(types) {
  return Population.Builder(
    merge_types(reasoner, vocabs.social.Private,types));
};
exports.direct = function(types) {
  return Population.Builder(
    merge_types(reasoner, vocabs.social.Direct,types));
};
exports.common = function(types) {
  return Common.Builder(types);
};
exports.interested = function(types) {
  return Interested.Builder(types);
};
exports.self = function(types) {
  return Population.Builder(
    merge_types(reasoner, vocabs.social.Self,types));
};
exports.all = function(types) {
  return CompoundPopulation.Builder(
    merge_types(reasoner, vocabs.social.All,types));
};
exports.any = function(types) {
  return CompoundPopulation.Builder(
    merge_types(reasoner, vocabs.social.Any,types));
};
exports.none = function(types) {
  return CompoundPopulation.Builder(
    merge_types(reasoner, vocabs.social.None,types));
};
exports.compoundPopulation = function(types) {
  return CompoundPopulation.Builder(types);
};

function social_recognizer(type) {
  var thing;
  if (reasoner.isSubClassOf(type,vocabs.social.Common)) {
    thing = Common;
  } else if (reasoner.isSubClassOf(type,vocabs.social.Interested)) {
    thing = Interested;
  } else if (reasoner.isSubClassOf(type,vocabs.social.CompoundPopulation)) {
    thing = CompoundPopulation;
  } else if (reasoner.isSubClassOf(type,vocabs.social.Everyone)) {
    thing = Everyone;
  } else if (reasoner.isSubClassOf(type,vocabs.social.Population)) {
    thing = Population;
  }
  return thing;
}

exports.init = function(models, reasoner, context) {

  context.add({
    soc: "http://ns.jasnell.me/social#",
    havingDimension: {
      "@id": "soc:havingDimension",
      "@type": "@id"
    },
    havingRole: {
      "@id": "soc:havingRole",
      "@type": "@id"
    },
    havingRelationship: {
      "@id": "soc:havingRelationship",
      "@type": "@id"
    },
    distance: {
      "@id": "soc:distance",
      "@type": "xsd:nonNegativeInteger"
    },
    confidence: {
      "@id": "soc:confidence",
      "@type": "xsd:nonNegativeInteger"
    }
  });

  models.use(social_recognizer);

  [
    [vocabs.social.Population, vocabs.as.Object],
    [vocabs.social.Everyone, vocabs.social.Population],
    [vocabs.social.Public, vocabs.social.Population],
    [vocabs.social.Private, vocabs.social.Population],
    [vocabs.social.Direct, vocabs.social.Population],
    [vocabs.social.Common, vocabs.social.Population],
    [vocabs.social.Interested, vocabs.social.Population],
    [vocabs.social.Self, vocabs.social.Population],
    [vocabs.social.All, vocabs.social.CompoundPopulation],
    [vocabs.social.Any, vocabs.social.CompoundPopulation],
    [vocabs.social.None, vocabs.social.CompoundPopulation],
    [vocabs.social.CompoundPopulation, vocabs.social.Population]
  ].forEach(function (pair) {
    reasoner.add(pair[0], vocabs.rdfs.subClassOf, pair[1]);
  });

  var functionalDatatype = [
        vocabs.owl.DatatypeProperty,
        vocabs.owl.FunctionalProperty
      ];
  [
    [vocabs.social.member, vocabs.owl.ObjectProperty],
    [vocabs.social.confidence, functionalDatatype],
    [vocabs.social.havingDimension, vocabs.owl.ObjectProperty],
    [vocabs.social.havingRole, vocabs.owl.ObjectProperty],
    [vocabs.social.havingRelationship, vocabs.owl.ObjectProperty],
    [vocabs.social.distance, functionalDatatype]
  ].forEach(function(pair) {
    reasoner.add(pair[0], vocabs.rdf.type, pair[1]);
  });
};
