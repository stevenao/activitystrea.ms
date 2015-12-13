'use strict';

const reasoner    = require('../reasoner');
const social = require('vocabs-social');
const owl = require('vocabs-owl');
const rdf = require('vocabs-rdf');
const as = require('vocabs-as');
const rdfs = require('vocabs-rdfs');

exports.model = {
  get Population() {
    return require('./_population');
  },
  get Interested() {
    return require('./_interested');
  },
  get Everyone() {
    return require('./_everyone');
  },
  get CompoundPopulation() {
    return require('./_compoundpopulation');
  },
  get Common() {
    return require('./_common');
  }
};

function gettypes(types, type) {
  return (types || []).concat([type]);
}

exports.population = function(types) {
  return new exports.model.Population.Builder(types);
};
exports.everyone = function(types) {
  return new exports.model.Everyone.Builder(types);
};
exports.public = function(types) {
  return new exports.model.Population.Builder(gettypes(types, social.Public));
};
exports.private = function(types) {
  return new exports.model.Population.Builder(
    gettypes(types, social.Private));
};
exports.direct = function(types) {
  return new exports.model.Population.Builder(
    gettypes(types, social.Direct));
};
exports.common = function(types) {
  return new exports.model.Common.Builder(types);
};
exports.interested = function(types) {
  return new exports.model.Interested.Builder(types);
};
exports.self = function(types) {
  return new exports.model.Population.Builder(
    gettypes(types, social.Self));
};
exports.all = function(types) {
  return new exports.model.CompoundPopulation.Builder(
    gettypes(types, social.All));
};
exports.any = function(types) {
  return new exports.model.CompoundPopulation.Builder(
    gettypes(types, social.Any));
};
exports.none = function(types) {
  return new exports.model.CompoundPopulation.Builder(
    gettypes(types, social.None));
};
exports.compoundPopulation = function(types) {
  return new exports.model.CompoundPopulation.Builder(types);
};

function social_recognizer(type) {
  let thing;
  if (type) {
    let node = reasoner.node(type);
    if (node.is(social.Common)) {
      thing = exports.Common;
    } else if (node.is(social.Interested)) {
      thing = exports.Interested;
    } else if (node.is(social.CompoundPopulation)) {
      thing = exports.CompoundPopulation;
    } else if (node.is(social.Everyone)) {
      thing = exports.Everyone;
    } else if (node.is(social.Population)) {
      thing = exports.Population;
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

  let graph = new reasoner.Graph();
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
  ].forEach((pair)=> {
    graph.add({
      subject: pair[0],
      predicate: rdfs.subClassOf,
      object: pair[1]
    });
  });

  let functionalDatatype = [
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
  ].forEach((pair)=> {
    graph.add({
      subject: pair[0],
      predicate: rdf.type,
      object: pair[1]
    });
  });

  reasoner.bind(graph);
};
