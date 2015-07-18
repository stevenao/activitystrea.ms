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
'use strict';

var LanguageTag = require('rfc5646');
var utils = require('../utils');

var _def = Symbol('_def');

function LanguageValue(res) {
  if (!(this instanceof LanguageValue))
    return new LanguageValue(res);
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

LanguageValue.system_language =
  process.env.LANG ?
    process.env.LANG.split('.')[0].replace('_','-') : 'en';

LanguageValue.prototype = {
  toString : function() {
    return this.valueOf();
  },
  valueOf : function(tag) {
    if (!tag) return this[_def] || this.valueOf(LanguageValue.system_language);
    // first check for an exact match
    var checktag = new LanguageTag(tag);
    if (this.hasOwnProperty(checktag.toString()))
      return this[checktag.toString()];
    // otherwise, search for a match
    var keys = Object.getOwnPropertyNames(this);
    for (var n = 0, l = keys.length; n < l; n++) {
      var keytag = new LanguageTag(keys[n]);
      if (keytag.suitableFor(checktag) ||
          checktag.suitableFor(keytag))
        return this[keys[n]];
    }
  }
};

module.exports = LanguageValue;
