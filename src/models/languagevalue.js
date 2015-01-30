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
var utils = require('../utils');
var LanguageTag = require('rfc5646');

function LanguageValue(builder) {
  if (!(this instanceof LanguageValue))
    return new LanguageValue(builder);
  var langs = Object.getOwnPropertyNames(builder);
  for (var n = 0, l = langs.length; n < l; n++) {
    utils.hidden(this, langs[n], builder[langs[n]]);
  }
  var sys = LanguageValue.system_language;
}

LanguageValue.system_language =
  process.env.LANG ?
    process.env.LANG.split('.')[0].replace('_','-') : 'en';

LanguageValue.prototype = {
  toString : function() {
    return this.valueOf();
  },
  valueOf : function(tag) {
    if (!tag) return this._def || this.valueOf(LanguageValue.system_language);
    var keys = Object.getOwnPropertyNames(this);
    for (var n = 0, l = keys.length; n < l; n++) {
      var keytag = new LanguageTag(keys[n]);
      var checktag = new LanguageTag(tag);
      if (keytag.suitableFor(checktag) || 
          checktag.suitableFor(keytag))
        return this[keys[n]];
    }
  }
};

LanguageValue.Builder = function() {
  if (!(this instanceof LanguageValue.Builder))
    return new LanguageValue.Builder();
  utils.hidden(this,'_def',undefined,true);
};
LanguageValue.Builder.prototype = {
  setDefault : function(val) {
    this._def = val;
    return this;
  },
  set : function(lang, val) {
    this[lang] = val;
    return this;
  },
  get : function() {
    return LanguageValue(this);
  }
};

module.exports = LanguageValue;