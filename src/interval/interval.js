'use strict';

var vocabs      = require('linkeddata-vocabs');
var reasoner    = require('../reasoner');
var utils       = require('../utils');
var Interval    = require('./_model');
var interval = vocabs.interval;
var as = vocabs.as;
var owl = vocabs.owl;
var rdf = vocabs.rdf;
var rdfs = vocabs.rdfs;

module.exports = exports = function(types) {
  return Interval.Builder(types);
};

module.exports.model = {
  Interval: Interval
};

function gettypes(types, type) {
  return (types || []).concat([type]);
}

exports.open = function(types) {
  return Interval.Builder(gettypes(types,interval.OpenInterval));
};
exports.closed = function(types) {
  return Interval.Builder(gettypes(types,interval.ClosedInterval));
};
exports.openClosed = function(types) {
  return Interval.Builder(gettypes(types,interval.OpenClosedInterval));
};
exports.closedOpen = function(types) {
  return Interval.Builder(gettypes(types,interval.ClosedOpenInterval));
};
exports.leftOpen = function(types) {
  return Interval.Builder(gettypes(types,interval.LeftOpenInterval));
};
exports.rightOpen = function(types) {
  return Interval.Builder(gettypes(types,interval.RightOpenInterval));
};
exports.leftClosed = function(types) {
  return Interval.Builder(gettypes(types,interval.LeftClosedInterval));
};
exports.rightClosed = function(types) {
  return Interval.Builder(gettypes(types,interval.RightClosedInterval));
};

function interval_recognizer(type) {
  var thing;
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

  var graph = new reasoner.Graph();
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
  ].forEach(function(pair) {
    graph.add({
      subject: pair[0],
      predicate: rdf.type,
      object: pair[1]
    });
  });

  reasoner.bind(graph);

  utils.defineProperty(
    'indexRange',models.Collection,
    function() {
      return this.get(interval.indexRange);
    },
    function(val) {
      this.set(interval.indexRange, val);
      return this;
    }
  );

  utils.defineProperty(
    'publishedRange',models.Collection,
    function() {
      return this.get(interval.publishedRange);
    },
    function(val) {
      this.set(interval.publishedRange, val);
      return this;
    }
  );

  utils.defineProperty(
    'startTimeRange',models.Collection,
    function() {
      return this.get(interval.startTimeRange);
    },
    function(val) {
      this.set(interval.startTimeRange, val);
      return this;
    }
  );

};
