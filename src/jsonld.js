'use strict';

const jsonld        = require('jsonld')();
const jsig = require('jsonld-signatures')({inject:{jsonld:jsonld}});
const throwif       = require('./utils').throwif;
const vocabs        = require('linkeddata-vocabs');
const as_context    = require('activitystreams-context');
const securityContext = require('./jsig');
const ext_context   = require('./extcontext');
const models        = require('./models');

const default_doc_loader = jsonld.documentLoaders.node();

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
