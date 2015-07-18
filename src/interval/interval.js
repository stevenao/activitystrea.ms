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
'use strict';

var vocabs      = require('linkeddata-vocabs');
var reasoner    = require('../reasoner');
var utils       = require('../utils');
var Interval    = require('./_model');
var merge_types = utils.merge_types;
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

exports.open = function(types) {
  return Interval.Builder(
    merge_types(reasoner, interval.OpenInterval,types));
};
exports.closed = function(types) {
  return Interval.Builder(
    merge_types(reasoner, interval.ClosedInterval,types));
};
exports.openClosed = function(types) {
  return Interval.Builder(
    merge_types(reasoner, interval.OpenClosedInterval,types));
};
exports.closedOpen = function(types) {
  return Interval.Builder(
    merge_types(reasoner, interval.ClosedOpenInterval,types));
};
exports.leftOpen = function(types) {
  return Interval.Builder(
    merge_types(reasoner, interval.LeftOpenInterval,types));
};
exports.rightOpen = function(types) {
  return Interval.Builder(
    merge_types(reasoner, interval.RightOpenInterval,types));
};
exports.leftClosed = function(types) {
  return Interval.Builder(
    merge_types(reasoner, interval.LeftClosedInterval,types));
};
exports.rightClosed = function(types) {
  return Interval.Builder(
    merge_types(reasoner, interval.RightClosedInterval,types));
};

function interval_recognizer(type) {
  var thing;
  if (reasoner.isSubClassOf(type,interval.Interval)) {
    thing = Interval;
  }
  return thing;
}

exports.init = function(models, reasoner, context) {

  context.add({
    i: 'http://ns.jasnell.me/interval#'
  });

  models.use(interval_recognizer);

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
    reasoner.add(pair[0], rdfs.subClassOf, pair[1]);
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
    reasoner.add(pair[0], rdf.type, pair[1]);
  });

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
