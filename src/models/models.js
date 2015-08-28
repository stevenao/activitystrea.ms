'use strict';

const as = require('linkeddata-vocabs').as;
const reasoner = require('../reasoner');
const utils = require('../utils');

utils.define(exports,'Base',function() {
  return require('./_base');
});

utils.define(exports,'Object',function() {
  return require('./_object');
});

utils.define(exports,'Activity',function() {
  return require('./_activity');
});

utils.define(exports,'Actor',function() {
  return require('./_actor');
});

utils.define(exports,'Collection',function() {
  return require('./_collection');
});

utils.define(exports,'OrderedCollection',function() {
  return require('./_orderedcollection');
});

utils.define(exports,'CollectionPage',function() {
  return require('./_collectionpage');
});

utils.define(exports,'OrderedCollectionPage',function() {
  return require('./_orderedcollectionpage');
});

utils.define(exports,'Content',function() {
  return require('./_content');
});

utils.define(exports,'Link',function() {
  return require('./_link');
});

utils.define(exports,'Place',function() {
  return require('./_place');
});

utils.define(exports,'Relationship',function() {
  return require('./_relationship');
});

utils.define(exports,'Profile',function() {
  return require('./_profile');
});

utils.define(exports,'Question',function() {
  return require('./_question');
});

function core_recognizer(type) {
  var thing;
  var node = reasoner.node(type);
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

var recognizers = [
  core_recognizer
];
function recognize(type) {
  for (var n = 0, l = recognizers.length; n < l; n++) {
    var thing = recognizers[n](type);
    if (thing) return thing;
  }
  return undefined;
}

exports.use = function(recognizer) {
  if (typeof recognizer !== 'function')
    throw Error('Recognizer must be a function');
  recognizers = [recognizer].concat(recognizers);
};

exports.wrap_object = function (expanded) {
  var types = reasoner.reduce(expanded['@type'] || []);
  var thing;
  // this isn't that great yet because it uses the
  // first recognized type and does not verify if
  // the full set of declared types make sense
  // together. Will need to add that in later
  for (var n = 0, l = types.length; n < l; n++) {
    var type = types[n];
    thing = recognize(type);
    if (thing !== undefined) break; // jump out early if we get a hit
  }
  thing = thing || exports.Object;
  return thing(expanded);
};
