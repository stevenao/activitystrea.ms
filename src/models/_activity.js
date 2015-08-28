'use strict';

const util     = require('util');
const vocabs   = require('linkeddata-vocabs');
const utils    = require('../utils');
const AsObject = require('./_object');
const as = vocabs.as;
const xsd = vocabs.xsd;

function Activity(expanded,builder) {
  if (!(this instanceof Activity))
    return new Activity(expanded,builder);
  AsObject.call(this, expanded, builder || Activity.Builder);
}
util.inherits(Activity, AsObject);

Activity.Builder = function(types, base) {
  if (!(this instanceof Activity.Builder))
    return new Activity.Builder(types, base);
  types = (types || []).concat([as.Activity]);
  AsObject.Builder.call(this, types, base || new Activity({}));
};
util.inherits(Activity.Builder, AsObject.Builder);

utils.defineProperty(
  'actor', Activity,
  function() {
    return this.get(as.actor);
  },
  function(val) {
    this.set(as.actor, val);
    return this;
  }
);

utils.defineProperty(
  'object', Activity,
  function() {
    return this.get(as.object);
  },
  function(val) {
    this.set(as.object, val);
    return this;
  }
);

utils.defineProperty(
  'target', Activity,
  function() {
    return this.get(as.target);
  },
  function(val) {
    this.set(as.target, val);
    return this;
  }
);

utils.defineProperty(
  'result', Activity,
  function() {
    return this.get(as.result);
  },
  function(val) {
    this.set(as.result, val);
    return this;
  }
);

utils.defineProperty(
  'origin', Activity,
  function() {
    return this.get(as.origin);
  },
  function(val) {
    this.set(as.origin, val);
    return this;
  }
);

utils.defineProperty(
  'instrument', Activity,
  function() {
    return this.get(as.instrument);
  },
  function(val) {
    this.set(as.instrument, val);
    return this;
  }
);

utils.defineProperty(
  'priority', Activity,
  function() {
    return this.get(as.priority);
  },
  function(val) {
    utils.set_ranged_val.call(
      this,
      as.priority,
      val, 0.0, 1.0,
      xsd.float);
    return this;
  }
);

module.exports = Activity;
