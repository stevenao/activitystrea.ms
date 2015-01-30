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

var vocabs = require('../vocabs');

exports.Base = require('./base');
exports.Object = require('./asobject');
exports.Activity = require('./asactivity');
exports.Actor = require('./asactor');
exports.Collection = require('./ascollection');
exports.OrderedCollection = require('./asorderedcollection');
exports.Content = require('./ascontent');
exports.Link = require('./aslink');
exports.Place = require('./asplace');
exports.PossibleAnswer = require('./aspossibleanswer');
exports.Question = require('./asquestion');
exports.Interval = require('./interval');
exports.Population = require('./population');
exports.CompoundPopulation = require('./compoundpopulation');
exports.Everyone = require('./everyone');
exports.Interested = require('./interested');
exports.Common = require('./common');
exports.ActivityHandler = require('./activityhandler');
exports.BrowserView = require('./browserview');
exports.HttpRequest = require('./httprequest');
exports.EmbeddedView = require('./embeddedview');
exports.HtmlForm = require('./htmlform');
exports.HttpHeader = require('./httpheader');
exports.Parameter = require('./parameter');
exports.Payload = require('./payload');
exports.UrlTemplate = require('./urltemplate');

exports.wrap_object = function (store, reasoner, subject, id) {
  if (subject === undefined) throw new Error();
  var types = store.findByIRI(id||subject, vocabs.rdf.type, null);
  var thing = exports.Object;
  // TODO: make this more efficient
  for (var n = 0, l = types.length; n < l; n++) {
    var type = types[n].object;
    if (reasoner.isSubClassOf(type,vocabs.as.Link)) {
      thing = exports.Link;
    } else if (reasoner.isSubClassOf(type,vocabs.as.UrlTemplate)) {
      thing = exports.UrlTemplate;
    } else if (reasoner.isSubClassOf(type,vocabs.as.Payload)) {
      thing = exports.Payload;
    } else if (reasoner.isSubClassOf(type,vocabs.as.Parameter)) {
      thing = exports.Parameter;
    } else if (reasoner.isSubClassOf(type,vocabs.as.HttpHeader)) {
      thing = exports.HttpHeader;
    } else if (reasoner.isSubClassOf(type,vocabs.as.HtmlForm)) {
      thing = exports.HtmlForm;
    } else if (reasoner.isSubClassOf(type,vocabs.as.BrowserView)) {
      thing = exports.BrowserView;
    } else if (reasoner.isSubClassOf(type,vocabs.as.EmbeddedView)) {
      thing = exports.EmbeddedView;
    } else if (reasoner.isSubClassOf(type,vocabs.as.HttpRequest)) {
      thing = exports.HttpRequest;
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
    } else if (reasoner.isSubClassOf(type,vocabs.as.PossibleAnswer)) {
      thing = exports.PossibleAnswer;
    } else if (reasoner.isSubClassOf(type,vocabs.as.Content)) {
      thing = exports.Content;
    } else if (reasoner.isSubClassOf(type,vocabs.as.Place)) {
      thing = exports.Place;
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
  return thing(store, reasoner, id, subject);
};
