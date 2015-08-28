'use strict';

const vocabs      = require('linkeddata-vocabs');
const reasoner    = require('../reasoner');
const social = vocabs.social;
const owl = vocabs.owl;
const rdf = vocabs.rdf;
const as = vocabs.as;
const rdfs = vocabs.rdfs;

const Population = require('./_population');
const Interested = require('./_interested');
const Everyone = require('./_everyone');
const CompoundPopulation = require('./_compoundpopulation');
const Common = require('./_common');

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
