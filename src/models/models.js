'use strict';

const as = require('linkeddata-vocabs').as;
const reasoner = require('../reasoner');
const utils = require('../utils');

module.exports = exports = {

  get Base() {
    return require('./_base');
  },

  get Object() {
    return require('./_object');
  },

  get Activity() {
    return require('./_activity');
  },

  get Actor() {
    return require('./_actor');
  },

  get Collection() {
    return require('./_collection');
  },

  get OrderedCollection() {
    return require('./_orderedcollection');
  },

  get CollectionPage() {
    return require('./_collectionpage');
  },

  get OrderedCollectionPage() {
    return require('./_orderedcollectionpage');
  },

  get Content() {
    return require('./_content');
  },

  get Link() {
    return require('./_link');
  },

  get Place() {
    return require('./_place');
  },

  get Relationship() {
    return require('./_relationship');
  },

  get Profile() {
    return require('./_profile');
  },

  get Question() {
    return require('./_question');
  },

  wrap_object(expanded) {
    let types = reasoner.reduce(expanded['@type'] || []);
    let Thing;
    // this isn't that great yet because it uses the
    // first recognized type and does not verify if
    // the full set of declared types make sense
    // together. Will need to add that in later
    for (let type of types) {
      Thing = recognize(type);
      if (Thing !== undefined) break; // jump out early if we get a hit
    }
    Thing = Thing || exports.Object;
    return new Thing(expanded);
  },

  use(recognizer) {
    if (typeof recognizer !== 'function')
      throw new Error('Recognizer must be a function');
    recognizers = [recognizer].concat(recognizers);
  }
};


function core_recognizer(type) {
  let thing;
  let node = reasoner.node(type);
  if (node.is(as.Link)) {
    thing = exports.Link;
  } else if (node.is(as.OrderedCollectionPage)) {
    thing = exports.OrderedCollectionPage;
  } else if (node.is(as.CollectionPage)) {
    thing = exports.CollectionPage;
  } else if (node.is(as.OrderedCollection)) {
    thing = exports.OrderedCollection;
  } else if (node.is(as.Collection)) {
    thing = exports.Collection;
  } else if (node.is(as.Actor)) {
    thing = exports.Actor;
  } else if (node.is(as.Question)) {
    thing = exports.Question;
  } else if (node.is(as.Activity)) {
    thing = exports.Activity;
  } else if (node.is(as.Profile)) {
    thing = exports.Profile;
  } else if (node.is(as.Content)) {
    thing = exports.Content;
  } else if (node.is(as.Place)) {
    thing = exports.Place;
  } else if (node.is(as.Relationship)) {
    thing = exports.Relationship;
  }
  return thing;
}

var recognizers = [core_recognizer];

function recognize(type) {
  for (let recognizer of recognizers) {
    let thing = recognizer(type);
    if (thing) return thing;
  }
  return undefined;
}
