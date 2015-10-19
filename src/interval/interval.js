'use strict';

const vocabs = require('linkeddata-vocabs');
const reasoner = require('../reasoner');
const utils = require('../utils');
const Interval = require('./_model');
const interval = vocabs.interval;
const as = vocabs.as;
const owl = vocabs.owl;
const rdf = vocabs.rdf;
const rdfs = vocabs.rdfs;

module.exports = exports = function(types) {
  return new Interval.Builder(types);
};

module.exports.model = {
  Interval: Interval
};

function gettypes(types, type) {
  return (types || []).concat([type]);
}

exports.open = function(types) {
  return new Interval.Builder(gettypes(types,interval.OpenInterval));
};
exports.closed = function(types) {
  return new Interval.Builder(gettypes(types,interval.ClosedInterval));
};
exports.openClosed = function(types) {
  return new Interval.Builder(gettypes(types,interval.OpenClosedInterval));
};
exports.closedOpen = function(types) {
  return new Interval.Builder(gettypes(types,interval.ClosedOpenInterval));
};
exports.leftOpen = function(types) {
  return new Interval.Builder(gettypes(types,interval.LeftOpenInterval));
};
exports.rightOpen = function(types) {
  return new Interval.Builder(gettypes(types,interval.RightOpenInterval));
};
exports.leftClosed = function(types) {
  return new Interval.Builder(gettypes(types,interval.LeftClosedInterval));
};
exports.rightClosed = function(types) {
  return new Interval.Builder(gettypes(types,interval.RightClosedInterval));
};

function interval_recognizer(type) {
  let thing;
  if (type && reasoner.node(type).is(interval.Interval)) {
    thing = Interval;
  }
  return thing;
}

exports.init = function(models, reasoner, context) {

  context.add({
    i: 'http://ns.jasnell.me/interval#'
  });

  models.use(interval_recognizer);

  let graph = new reasoner.Graph();
  [
    [interval.Interval, as.Object],
    [interval.OpenInterval, interval.Interval],
    [interval.ClosedInterval, interval.Interval],
    [interval.OpenClosedInterval, interval.Interval],
    [interval.ClosedOpenInterval, interval.Interval],
    [interval.LeftOpenInterval, interval.Interval],
    [interval.RightOpenInterval, interval.Interval],
    [interval.LeftClosedInterval, interval.Interval],
    [interval.RightClosedInterval, interval.Interval]
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
      ],
      functionalObject = [
        owl.ObjectProperty,
        owl.FunctionalProperty
      ];

  [
    [interval.indexRange, functionalObject],
    [interval.publishedRange, functionalObject],
    [interval.startTimeRange, functionalObject],
    [interval.lower, functionalDatatype],
    [interval.upper, functionalDatatype],
    [interval.step, functionalDatatype],
  ].forEach((pair)=> {
    graph.add({
      subject: pair[0],
      predicate: rdf.type,
      object: pair[1]
    });
  });

  reasoner.bind(graph);

};
