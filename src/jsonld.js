'use strict';

const jsonld        = require('jsonld')();
const jsig = require('jsonld-signatures')({inject:{jsonld:jsonld}});
const throwif       = require('./utils').throwif;
const as_context    = require('activitystreams-context');
const securityContext = require('./jsig');
const ext_context   = require('./extcontext');
const models        = require('./models');
const as            = require('vocabs-as');

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

function checkCallback(callback) {
  throwif(
    typeof callback !== 'function',
    'A callback function must be provided');
}

function custom_doc_loader(url, callback) {
  checkCallback(callback);
  let u = url;
  if (u[u.length-1] !== '#') u += '#';
  if (u === as.ns) {
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
  let ctx = [];
  let ext = ext_context.get();
  if (ext)
    ctx = ctx.concat(ext);
  if (options && options.sign)
    ctx.push(jsig.SECURITY_CONTEXT_URL);
  if (options && options.additional_context)
    ctx.push(options.additional_context);
  ctx.push(as.ns);
  return {'@context': ctx.length > 1 ? ctx : ctx[0]};
}

module.exports = {

  normalize(expanded, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = options || {};
    checkCallback(callback);
    jsonld.normalize(
      expanded,
      {format:'application/nquads'},
      (err,doc)=> {
        if (err) return callback(err);
        callback(null,doc);
      });
  },

  compact(expanded, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = options || {};
    checkCallback(callback);
    let _context = getContext(options);
    jsonld.compact(
      expanded, _context,
      {documentLoader: custom_doc_loader},
      (err, doc)=> {
        if (err) return callback(err);
        if (typeof options.sign === 'object') {
          warn();
          jsig.sign(doc,options.sign,callback);
        } else {
          callback(null, doc);
        }
      });
  },

  verify(input, options, callback) {
    warn();
    if (typeof input === 'string')
      input = JSON.parse(input);
    checkCallback(callback);
    jsig.verify(input, options, callback);
  },

  import(input, callback) {
    checkCallback(callback);
    if (input['@context'] === undefined)
      input['@context'] = as.ns;
    jsonld.expand(
      input, {
        expandContext: as_context,
        documentLoader: custom_doc_loader,
        keepFreeFloatingNodes: true
      },
      (err,expanded)=> {
        if (err) return callback(err);
        if (expanded && expanded.length > 0) {
          let base = models.wrap_object(expanded[0]);
          callback(null,base);
        } else {
          callback(null,null);
        }
      }
    );
  },

  importFromRDF(input, callback) {
    checkCallback(callback);
    jsonld.fromRDF(input, {format:'application/nquads'},
    (err,expanded)=> {
      if (err) return callback(err);
      let base = models.wrap_object(expanded[0]);
      callback(null,base);
    });
  }

};
