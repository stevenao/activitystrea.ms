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
var utils  = require('./utils');
var util   = require('util');
var N3     = require('n3');
var as = vocabs.as;
var owl = vocabs.owl;
var rdf = vocabs.rdf;
var rdfs = vocabs.rdfs;
var asx = vocabs.asx;
var xsd = vocabs.xsd;

function subClassHierarchy(store, subject) {
  var types = [subject];
  var res = store.findByIRI(subject, rdfs.subClassOf, null);
  for (var n = 0, l = res.length; n < l; n++)
    types.push(subClassHierarchy(store, res[n].object));
  return types;
}

function subPropertyHierarchy(store, subject) {
  var types = [subject];
  var res = store.findByIRI(subject, rdfs.subPropertyOf, null);
  for (var n = 0, l = res.length; n < l; n++)
    types.push(subPropertyHierarchy(store, res[n].object));
  return types;
}

function descendantPropertiesOf(store, subject) {
  var types = [subject];
  var res = store.findByIRI(null, rdfs.subPropertyOf, subject);
  for (var n = 0, l = res.length; n < l; n++)
    types.push(descendantPropertiesOf(store, res[n].subject));
  return types;
}

function descendantClassesOf(store, subject) {
  var types = [subject];
  var res = store.findByIRI(null, rdfs.subClassOf, subject);
  for (var n = 0, l = res.length; n < l; n++)
    types.push(descendantClassesOf(store, res[n].subject));
  return types;
}

function searchTypes(types, object) {
  for (var n = 0, l = types.length; n < l; n++) {
    if (Array.isArray(types[n])) {
      if (searchTypes(types[n],object))
        return true;
    } else {
      if (object == types[n])
        return true;
    }
  }
  return false;
}

function isSubClassOf(store, subject, object) {
  if (subject == object) return true;
  var types = subClassHierarchy(store, subject);
  return searchTypes(types, object);
}

function isSubPropertyOf(store, subject, object) {
  if (subject == object) return true;
  var types = subPropertyHierarchy(store, subject);
  return searchTypes(types, object);
}

function count_type(subject, type) {
  return this[_store].countByIRI(subject, rdf.type, type) > 0;
}

function _init(reasoner) {

  var functionalObject = [owl.ObjectProperty, owl.FunctionalProperty],
      functionalDatatype = [owl.DatatypeProperty , owl.FunctionalProperty],
      languageProperty = [owl.DatatypeProperty , asx.LanguageProperty];

  reasoner.add(as.items, rdfs.subClassOf, asx.PossiblyOrdered);
  reasoner.add(xsd.float, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.decimal, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.double, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.integer, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.nonPositiveInteger, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.long, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.nonNegativeInteger, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.negativeInteger, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.int, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.unsignedLong, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.positiveInteger, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.short, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.unsignedInt, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.byte, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.unsignedShort, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.unsignedByte, rdfs.subClassOf, asx.Number);
  reasoner.add(xsd.dateTime, rdfs.subClassOf, asx.Date);
  reasoner.add(xsd.date, rdfs.subClassOf, asx.Date);
  reasoner.add(xsd.boolean, rdfs.subClassOf, asx.Boolean);
  reasoner.add(as.Accept, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Activity, rdfs.subClassOf, as.Object);
  reasoner.add(as.Block, rdfs.subClassOf, as.Ignore);
  reasoner.add(as.IntransitiveActivity, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Actor, rdfs.subClassOf, as.Object);
  reasoner.add(as.Add, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Album, rdfs.subClassOf, as.Collection);
  reasoner.add(as.Announce, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Application, rdfs.subClassOf, as.Actor);
  reasoner.add(as.Arrive, rdfs.subClassOf, as.IntransitiveActivity);
  reasoner.add(as.Article, rdfs.subClassOf, as.Content);
  reasoner.add(as.Audio, rdfs.subClassOf, as.Document);
  reasoner.add(as.Collection, rdfs.subClassOf, as.Object);
  reasoner.add(as.Relationship, rdfs.subClassOf, as.Object);
  reasoner.add(as.Content, rdfs.subClassOf, as.Object);
  reasoner.add(as.Create, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Delete, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Dislike, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Document, rdfs.subClassOf, as.Content);
  reasoner.add(as.Event, rdfs.subClassOf, as.Object);
  reasoner.add(as.Flag, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Folder, rdfs.subClassOf, as.Collection);
  reasoner.add(as.Follow, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Group, rdfs.subClassOf, as.Actor);
  reasoner.add(as.Ignore, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Image, rdfs.subClassOf, as.Document);
  reasoner.add(as.Invite, rdfs.subClassOf, as.Offer);
  reasoner.add(as.Join, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Leave, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Like, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Experience, rdfs.subClassOf, as.Activity);
  reasoner.add(as.View, rdfs.subClassOf, as.Experience);
  reasoner.add(as.Listen, rdfs.subClassOf, as.Experience);
  reasoner.add(as.Read, rdfs.subClassOf, as.Experience);
  reasoner.add(as.Move, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Travel, rdfs.subClassOf, as.IntransitiveActivity);
  reasoner.add(as.Update, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Mention, rdfs.subClassOf, as.Link);
  reasoner.add(as.Note, rdfs.subClassOf, as.Content);
  reasoner.add(as.Offer, rdfs.subClassOf, as.Activity);
  reasoner.add(as.OrderedCollection, rdfs.subClassOf, as.Collection);
  reasoner.add(as.Page, rdfs.subClassOf, as.Content);
  reasoner.add(as.Profile, rdfs.subClassOf, as.Content);
  reasoner.add(as.Person, rdfs.subClassOf, as.Actor);
  reasoner.add(as.Organization, rdfs.subClassOf, as.Actor);
  reasoner.add(as.Place, rdfs.subClassOf, as.Object);
  reasoner.add(as.Process, rdfs.subClassOf, as.Actor);
  reasoner.add(as.Question, rdfs.subClassOf,
    [as.Content,as.IntransitiveActivity]);
  reasoner.add(as.Reject, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Remove, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Service, rdfs.subClassOf, as.Actor);
  reasoner.add(as.Story, rdfs.subClassOf, as.OrderedCollection);
  reasoner.add(as.TentativeAccept, rdfs.subClassOf, as.Accept);
  reasoner.add(as.TentativeReject, rdfs.subClassOf, as.Reject);
  reasoner.add(as.Undo, rdfs.subClassOf, as.Activity);
  reasoner.add(as.Video, rdfs.subClassOf, as.Document);

  reasoner.add(as.describes, rdf.type, functionalObject);
  reasoner.add(as.subject, rdf.type, functionalObject);
  reasoner.add(as.relationship, rdf.type, functionalObject);
  reasoner.add(as.first, rdf.type, functionalObject);
  reasoner.add(rdf.rest, rdf.type, functionalObject);
  reasoner.add(as.first, rdf.type, functionalObject);
  reasoner.add(as.actor, rdf.type, owl.ObjectProperty);
  reasoner.add(as.attributedTo, rdf.type, owl.ObjectProperty);
  reasoner.add(as.attachment, rdf.type, owl.ObjectProperty);
  reasoner.add(as.bcc, rdf.type, owl.ObjectProperty);
  reasoner.add(as.bto, rdf.type, owl.ObjectProperty);
  reasoner.add(as.cc, rdf.type, owl.ObjectProperty);
  reasoner.add(as.context, rdf.type, owl.ObjectProperty);
  reasoner.add(as.current, rdf.type, functionalObject);
  reasoner.add(as.first, rdf.type, functionalObject);
  reasoner.add(as.generator, rdf.type, owl.ObjectProperty);
  reasoner.add(as.icon, rdf.type, owl.ObjectProperty);
  reasoner.add(as.instrument, rdf.type, owl.ObjectProperty);
  reasoner.add(as.image, rdf.type, owl.ObjectProperty);
  reasoner.add(as.inReplyTo, rdf.type, owl.ObjectProperty);
  reasoner.add(as.items, rdf.type, owl.ObjectProperty);
  reasoner.add(as.last, rdf.type, functionalObject);
  reasoner.add(as.location, rdf.type, owl.ObjectProperty);
  reasoner.add(as.next, rdf.type, functionalObject);
  reasoner.add(as.object, rdf.type, owl.ObjectProperty);
  reasoner.add(as.oneOf, rdf.type, owl.ObjectProperty);
  reasoner.add(as.anyOf, rdf.type, owl.ObjectProperty);
  reasoner.add(as.prev, rdf.type, functionalObject);
  reasoner.add(as.preview, rdf.type, owl.ObjectProperty);
  reasoner.add(as.replies, rdf.type, owl.ObjectProperty);
  reasoner.add(as.result, rdf.type, owl.ObjectProperty);
  reasoner.add(as.scope, rdf.type, owl.ObjectProperty);
  reasoner.add(as.self, rdf.type, functionalObject);
  reasoner.add(as.tag, rdf.type, owl.ObjectProperty);
  reasoner.add(as.target, rdf.type, owl.ObjectProperty);
  reasoner.add(as.origin, rdf.type, owl.ObjectProperty);
  reasoner.add(as.to, rdf.type, owl.ObjectProperty);
  reasoner.add(as.url, rdf.type, owl.ObjectProperty);
  reasoner.add(as.accuracy, rdf.type, functionalDatatype);
  reasoner.add(as.alias, rdf.type, functionalDatatype);
  reasoner.add(as.altitude, rdf.type, functionalDatatype);
  reasoner.add(as.content, rdf.type, languageProperty);
  reasoner.add(as.displayName, rdf.type, languageProperty);
  reasoner.add(as.duration, rdf.type, functionalDatatype);
  reasoner.add(as.endTime, rdf.type, functionalDatatype);
  reasoner.add(as.height, rdf.type, functionalDatatype);
  reasoner.add(as.href, rdf.type, functionalObject);
  reasoner.add(as.hreflang, rdf.type, functionalDatatype);
  reasoner.add(as.itemsPerPage, rdf.type, functionalDatatype);
  reasoner.add(as.latitude, rdf.type, functionalDatatype);
  reasoner.add(as.longitude, rdf.type, functionalDatatype);
  reasoner.add(as.mediaType, rdf.type, functionalDatatype);
  reasoner.add(as.priority, rdf.type, functionalDatatype);
  reasoner.add(as.published, rdf.type, functionalDatatype);
  reasoner.add(as.radius, rdf.type, functionalDatatype);
  reasoner.add(as.rel, rdf.type, owl.DatatypeProperty);
  reasoner.add(as.startIndex, rdf.type, functionalDatatype);
  reasoner.add(as.startTime, rdf.type, functionalDatatype);
  reasoner.add(as.summary, rdf.type, languageProperty);
  reasoner.add(as.title, rdf.type, languageProperty);
  reasoner.add(as.totalItems, rdf.type, functionalDatatype);
  reasoner.add(as.units, rdf.type, functionalDatatype);
  reasoner.add(as.updated, rdf.type, functionalDatatype);
  reasoner.add(as.width, rdf.type, functionalDatatype);

  reasoner.add(as.actor, rdfs.subPropertyOf, as.attributedTo);
  reasoner.add(as.author, rdfs.subPropertyOf, as.attributedTo);

}

var _store = Symbol('store');
var _cache = Symbol('cache');

function Reasoner() {
  if (!(this instanceof Reasoner))
    return new Reasoner();
  this[_store] = new N3.Store();
  this[_cache] = {_sc:{},_sp:{},_tp:{}};
  _init(this);
}
Reasoner.prototype = {
  add : function(subject, predicate, object) {
    var cache;
    switch(predicate) {
      case rdfs.subClassOf:
        cache = this[_cache]._sc[subject] = this[_cache]._sc[subject] || {};
        break;
      case rdfs.subPropertyOf:
        cache = this[_cache]._sp[subject] = this[_cache]._sp[subject] || {};
        break;
      case rdf.type:
        cache = this[_cache]._tp[subject] = this[_cache]._tp[subject] || {};
        break;
    }
    if (Array.isArray(object)) {
      for (var n = 0, l = object.length; n < l; n++) {
        this[_store].addTriple(subject, predicate, object[n]);
        if (cache) cache[object[n]] = true;
      }
    } else {
      this[_store].addTriple(subject, predicate, object);
      if (cache) cache[object] = true;
    }
    return this;
  },
  declare : function(prefix, uri) {
    this[_store].addPrefix(prefix, uri);
    return this;
  },
  classHierarchy : function(subject) {
    return subClassHierarchy(this[_store], subject);
  },
  propertyHierarchy : function(subject) {
    return subPropertyHierarchy(this[_store], subject);
  },
  isSubClassOf : function(subject, object) {
    var _sc = this[_cache]._sc;
    var _subject = _sc[subject] = _sc[subject] || {};
    _subject[object] = _subject[object] ||
      isSubClassOf(this[_store], subject, object);
    return _subject[object];
  },
  isSubPropertyOf : function(subject, object) {
    var _sp = this[_cache]._sp;
    var _subject = _sp[subject] = _sp[subject] || {};
    _subject[object] = _subject[object] ||
      isSubPropertyOf(this[_store], subject, object);
    return _subject[object];
  },
  isTypeOf : function(subject, type) {
    var _tp = this[_cache]._tp;
    var _subject = _tp[subject] = _tp[subject] || {};
    _subject[type] = _subject[type] ||
      count_type.call(this, subject, type) > 0;
    return _subject[type];
  },
  descendantClassesOf : function(subject) {
    return descendantClassesOf(this[_store], subject);
  },
  descendantPropertiesOf : function(subject) {
    return descendantPropertiesOf(this[_store], subject);
  },
  is_an_object : function(subject) {
    return !this.isSubClassOf(subject, as.Link);
  },
  is_a_link : function(subject) {
    return this.isSubClassOf(subject, as.Link);
  },
  is_object_property : function(subject) {
    return this.isTypeOf(subject, owl.ObjectProperty);
  },
  is_functional : function(subject) {
    return this.isTypeOf(subject, owl.FunctionalProperty);
  },
  is_language_property : function(subject) {
    return this.isTypeOf(subject, asx.LanguageProperty);
  },
  is_intransitive : function(subject) {
    return this.isSubClassOf(subject, as.IntransitiveActivity);
  },
  is_possibly_ordered : function(subject) {
    return this.isSubClassOf(subject, asx.PossiblyOrdered);
  },
  is_number : function(subject) {
    return this.isSubClassOf(subject, asx.Number);
  },
  is_date : function(subject) {
    return this.isSubClassOf(subject, asx.Date);
  },
  is_boolean : function(subject) {
    return this.isSubClassOf(subject, asx.Boolean);
  }
};
module.exports = new Reasoner();
