
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

exports.wrap_object = function (store, reasoner, subject, id) {
  if (subject === undefined) throw new Error();
  var types = store.findByIRI(id||subject, vocabs.rdf.type, null);
  var thing = exports.Object;
  for (var n = 0, l = types.length; n < l; n++) {
    var type = types[n].object;
    if (reasoner.isSubClassOf(type,vocabs.as.Link)) {
      thing = exports.Link;
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
