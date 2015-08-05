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

var jsonld        = require('jsonld')();
var jsig = require('jsonld-signatures')({inject:{jsonld:jsonld}});
var throwif       = require('./utils').throwif;
var vocabs        = require('linkeddata-vocabs');
var as_context    = require('activitystreams-context');
var securityContext = require('./jsig');
var ext_context   = require('./extcontext');
var models        = require('./models');

var default_doc_loader = jsonld.documentLoaders.node();

var warned = false;
function warn() {
  if (!warned) {
    console.warn(
      'Warning: JSON-LD Signatures are still experimental. ' +
      'Use in production environments is not recommended');
    warned = true;
  }
}

function custom_doc_loader(url, callback) {
  throwif(
    typeof callback !== 'function',
    'A callback function must be provided');
  var u = url;
  if (u[u.length-1] !== '#') u += '#';
  if (u === vocabs.as.ns) {
    return callback(null, {
      contextUrl: null,
      document: as_context,
      documentUrl: url
    });
  } else if (u === jsig.SECURITY_CONTEXT_URL) {
    return callback(null, {
      contextUrl: null,
      document: securityContext,
      documentUrl: url
    });
  }
  default_doc_loader(url, callback);
}
jsonld.documentLoader = custom_doc_loader;

function getContext(options) {
  var ctx = [];
  var ext = ext_context.get();
  if (ext)
    ctx = ctx.concat(ext);
  if (options && options.sign)
    ctx.push(jsig.SECURITY_CONTEXT_URL);
  if (options && options.additional_context)
    ctx.push(options.additional_context);
  ctx.push(vocabs.as.ns);
  return {'@context': ctx.length > 1 ? ctx : ctx[0]};
}

exports.normalize = function(expanded, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  throwif(
    typeof callback !== 'function',
    'A callback function must be provided');
  jsonld.normalize(
    expanded,
    {format:'application/nquads'},
    function(err,doc) {
      if (err) {
        callback(err);
        return;
      }
      callback(null,doc);
    });
};

exports.compact = function(expanded, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  throwif(
    typeof callback !== 'function',
    'A callback function must be provided');
  var _context = getContext(options);
  jsonld.compact(
    expanded, _context,
    {documentLoader: custom_doc_loader},
    function(err, doc) {
      if (err) {
        callback(err);
        return;
      }
      if (typeof options.sign === 'object') {
        warn();
        jsig.sign(doc,options.sign,callback);
      } else {
        callback(null, doc);
      }
    });
};

exports.verify = function(input, options, callback) {
  warn();
  if (typeof input === 'string')
    input = JSON.parse(input);
  jsig.verify(input, options, callback);
};

exports.import = function(input, callback) {
  throwif(
    typeof callback !== 'function',
    'A callback function must be provided');
  if (input['@context'] === undefined)
    input['@context'] = vocabs.as.ns;
  jsonld.expand(
    input, {
      expandContext: as_context,
      documentLoader: custom_doc_loader,
      keepFreeFloatingNodes: true
    },
    function(err,expanded) {
      if (err) {
        callback(err);
        return;
      }
      if (expanded && expanded.length > 0) {
        var base = models.wrap_object(expanded[0]);
        callback(null,base);
      } else {
        callback(null,null);
      }
    }
  );
};

exports.importFromRDF = function(input, callback) {
  throwif(
    typeof callback !== 'function',
    'A callback function must be provided');
  jsonld.fromRDF(input, {format:'application/nquads'},
  function(err,expanded) {
    if (err) {
      callback(err);
      return;
    }
    var base = models.wrap_object(expanded[0]);
    callback(null,base);
  });
};
