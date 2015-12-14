'use strict';

const as = require('vocabs-as');
const reasoner = require('../reasoner');
const utils = require('../utils');
const LRU = require('lru-cache');

const _compose = Symbol('compose');
const cache = new LRU(100);

function core_recognizer(type) {
  let thing;
  let node = reasoner.node(type);
  if (node.is(as.OrderedCollectionPage)) {
    thing = exports.OrderedCollectionPage;
  } else if (node.is(as.CollectionPage)) {
    thing = exports.CollectionPage;
  } else if (node.is(as.OrderedCollection)) {
    thing = exports.OrderedCollection;
  } else if (node.is(as.Collection)) {
    thing = exports.Collection;
  } else if (node.is(as.Question)) {
    thing = exports.Question;
  } else if (node.is(as.Activity)) {
    thing = exports.Activity;
  } else if (node.is(as.Profile)) {
    thing = exports.Profile;
  } else if (node.is(as.Place)) {
    thing = exports.Place;
  } else if (node.is(as.Relationship)) {
    thing = exports.Relationship;
  }
  return thing;
}

var recognizers = [core_recognizer];

function recognize(type) {
  let thing = cache.get(type);
  if (thing) return thing;
  for (let recognizer of recognizers) {
    thing = recognizer(type);
    if (thing) {
      cache.set(type, thing);
      return thing;
    }
  }
  return undefined;
}

module.exports = exports = {

  get LanguageValue() {
    return require('./_languagevalue');
  },

  get Base() {
    return require('./_base');
  },

  get Object() {
    return require('./_object');
  },

  get Activity() {
    return require('./_activity');
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
  
  get compose() {
    return _compose;
  },

  compose_builder(builder, types) {
    types = reasoner.reduce(types || []);
    for (let type of types) {
      let Thing = recognize(type);
      if (Thing)
        builder[_compose](Thing.Builder);
    }
  },
  
  compose_base(base, types) {
    types = reasoner.reduce(types || []);
    for (let type of types) {
      let Thing = recognize(type);
      if (Thing)
        base[_compose](Thing);
    }
  },

  wrap_object(expanded, environment) {
    let types = reasoner.reduce(expanded['@type'] || []);
    var is_link = false;
    for (let type of types) {
      let nodetype = reasoner.node(type);
      if (nodetype.is(as.Link)) {
        is_link = true;
        break;
      }
    }
    let Thing = is_link ?
      exports.Link :
      exports.Object ;
    return new Thing(expanded, undefined, environment);
  },

  use(recognizer) {
    if (typeof recognizer !== 'function')
      throw new Error('Recognizer must be a function');
    recognizers = [recognizer].concat(recognizers);
    cache.reset();
  }
};
