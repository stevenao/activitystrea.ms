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
var util = require('util');
var utils = require('../utils');
var vocabs = require('linkeddata-vocabs');
var Base = require('./_base');

function HtmlForm(expanded, reasoner, parent) {
  if (!(this instanceof HtmlForm))
    return new HtmlForm(expanded, reasoner, parent);
  Base.call(this, expanded, reasoner, parent);
}
util.inherits(HtmlForm, Base);

utils.define(HtmlForm.prototype, 'parameter', function() {
  return this.get(vocabs.as.parameter);
});

HtmlForm.Builder = function(reasoner,types, base) {
  if (!(this instanceof HtmlForm.Builder))
    return new HtmlForm.Builder(reasoner, types, base);
  Base.Builder.call(
    this, 
    reasoner, 
    utils.merge_types(reasoner,vocabs.as.HtmlForm, types),
    base || new HtmlForm({}, reasoner));
};
util.inherits(HtmlForm.Builder, Base.Builder);

HtmlForm.Builder.prototype.parameter = function(val) {
  this.set(vocabs.as.parameter, val);
  return this;
};

module.exports = HtmlForm;
