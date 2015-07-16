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
var Interval    = require('./_model');
var merge_types = utils.merge_types;

module.exports = exports = function(types) {
  return Interval.Builder(types);
};

module.exports.model = {
  Interval: Interval
};

exports.open = function(types) {
  return Interval.Builder(
    merge_types(reasoner, vocabs.interval.OpenInterval,types));
};
exports.closed = function(types) {
  return Interval.Builder(
    merge_types(reasoner, vocabs.interval.ClosedInterval,types));
};
exports.openClosed = function(types) {
  return Interval.Builder(
    merge_types(reasoner, vocabs.interval.OpenClosedInterval,types));
};
exports.closedOpen = function(types) {
  return Interval.Builder(
    merge_types(reasoner, vocabs.interval.ClosedOpenInterval,types));
};
exports.leftOpen = function(types) {
  return Interval.Builder(
    merge_types(reasoner, vocabs.interval.LeftOpenInterval,types));
};
exports.rightOpen = function(types) {
  return Interval.Builder(
    merge_types(reasoner, vocabs.interval.RightOpenInterval,types));
};
exports.leftClosed = function(types) {
  return Interval.Builder(
    merge_types(reasoner, vocabs.interval.LeftClosedInterval,types));
};
exports.rightClosed = function(types) {
  return Interval.Builder(
    merge_types(reasoner, vocabs.interval.RightClosedInterval,types));
};

function interval_recognizer(type) {
  var thing;
  if (reasoner.isSubClassOf(type,vocabs.interval.Interval)) {
    thing = Interval;
  }
  return thing;
}

exports.init = function(models, reasoner, context) {

  context.add({
    i: 'http://ns.jasnell.me/interval#',
    asx: "http://ns.jasnell.me/activitystreams-ex#"
  });

  models.use(interval_recognizer);

  [
    [vocabs.interval.Interval, vocabs.as.Object],
    [vocabs.interval.OpenInterval, vocabs.interval.Interval],
    [vocabs.interval.ClosedInterval, vocabs.interval.Interval],
    [vocabs.interval.OpenClosedInterval, vocabs.interval.Interval],
    [vocabs.interval.ClosedOpenInterval, vocabs.interval.Interval],
    [vocabs.interval.LeftOpenInterval, vocabs.interval.Interval],
    [vocabs.interval.RightOpenInterval, vocabs.interval.Interval],
    [vocabs.interval.LeftClosedInterval, vocabs.interval.Interval],
    [vocabs.interval.RightClosedInterval, vocabs.interval.Interval]
  ].forEach(function (pair) {
    reasoner.add(pair[0], vocabs.rdfs.subClassOf, pair[1]);
  });

  var functionalDatatype = [
        vocabs.owl.DatatypeProperty,
        vocabs.owl.FunctionalProperty
      ],
      functionalObject = [
        vocabs.owl.ObjectProperty,
        vocabs.owl.FunctionalProperty
      ];

  [
    [vocabs.asx.indexRange, functionalObject],
    [vocabs.asx.publishedRange, functionalObject],
    [vocabs.asx.startTimeRange, functionalObject],
    [vocabs.interval.lower, functionalDatatype],
    [vocabs.interval.upper, functionalDatatype],
    [vocabs.interval.step, functionalDatatype],
  ].forEach(function(pair) {
    reasoner.add(pair[0], vocabs.rdf.type, pair[1]);
  });

  utils.define(models.Collection.prototype, 'indexRange', function() {
    return this.get(vocabs.asx.indexRange);
  });
  utils.define(models.Collection.prototype, 'publishedRange', function() {
    return this.get(vocabs.asx.publishedRange);
  });
  utils.define(models.Collection.prototype, 'startTimeRange', function() {
    return this.get(vocabs.asx.startTimeRange);
  });

  models.Collection.Builder.prototype.indexRange = function(val) {
    this.set(vocabs.asx.indexRange, val);
    return this;
  };
  models.Collection.Builder.prototype.publishedRange = function(val) {
    this.set(vocabs.asx.publishedRange, val);
    return this;
  };
  models.Collection.Builder.prototype.startTimeRange = function(val) {
    this.set(vocabs.asx.startTimeRange, val);
    return this;
  };

};
