'use strict';

const LanguageTag = require('rfc5646');
const utils = require('../utils');

const _def = Symbol('_def');

class LanguageValue {
  constructor(res) {
    utils.throwif(!Array.isArray(res));
    var self = this;
    res.forEach(function(item) {
      var value = item['@value'];
      var language = item['@language'];
      if (language !== undefined) {
        utils.define(self, new LanguageTag(language).toString(), value);
      } else {
        self[_def] = value;
      }
    });
  }

  toString() {
    return this.valueOf();
  }

  valueOf(tag) {
    if (!tag) return this[_def] || this.valueOf(LanguageValue.system_language);
    // first check for an exact match
    var checktag = new LanguageTag(tag);
    if (this.hasOwnProperty(checktag.toString()))
      return this[checktag.toString()];
    // otherwise, search for a match
    for (let key of Object.getOwnPropertyNames(this)) {
      var keytag = new LanguageTag(key);
      if (keytag.suitableFor(checktag) ||
          checktag.suitableFor(keytag))
        return this[key];
    }
  }
}

LanguageValue.system_language =
  process.env.LANG ?
    process.env.LANG.split('.')[0].replace('_','-') : 'en';

module.exports = LanguageValue;
