var AsObject = require('./asobject'),
    util = require('util'),
    utils = require('../utils');
    vocabs = require('../vocabs');

function Interval(store, reasoner, id, subject) {
  if (!(this instanceof Interval))
    return new Interval(store, reasoner, id, subject);
  AsObject.call(this, store, reasoner, id, subject);
}
util.inherits(Interval, AsObject);
['upper','lower','step'].forEach(function(key) {
  utils.defineProperty(Interval.prototype, key, function() {
    return this.get(vocabs.interval[key]);
  });
});

Interval.Builder = function(reasoner,types, base) {
  if (!(this instanceof Interval.Builder))
    return new Interval.Builder(reasoner, types, base);
  AsObject.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.interval.Interval, types),
    base || new Interval(undefined, reasoner));
};
util.inherits(Interval.Builder, AsObject.Builder);

['upper','lower','step'].forEach(function(key) {
  Interval.Builder.prototype[key] = function(val) {
    var options = {};
    if (utils.is_primitive(val)) {
      if (utils.is_string(val))
        options.type = vocabs.xsd.string;
      else if (utils.is_number(val)) {
        if (utils.is_integer(val))
          options.type = vocabs.xsd.integer;
        else 
          options.type = vocabs.xsd.decimal;
      } else if (utils.is_boolean(val)) {
        options.type = vocabs.xsd.boolean;
      }
    } else if (utils.is_date(val)) {
      options.type = vocabs.xsd.dateTime;
    }
    this.set(vocabs.interval[key], val, options);
    return this;
  };
});

module.exports = Interval;
