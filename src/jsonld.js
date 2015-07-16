
var jsonld        = require('jsonld');
var checkCallback = require('./utils').checkCallback;
var vocabs        = require('linkeddata-vocabs');
var as_context    = require('activitystreams-context');
var ext_context   = require('./extcontext');
var models        = require('./models');
var reasoner      = require('./reasoner');

var default_doc_loader = jsonld.documentLoaders.node();

function custom_doc_loader(url, callback) {
  checkCallback(callback);
  var u = url;
  if (u[u.length-1] !== '#') u += '#';
  if (u === vocabs.as.ns)
    return callback(null, {
      contextUrl: null,
      document: as_context,
      documentUrl: url
    });
  default_doc_loader(url, callback);
}

function getContext(options) {
  var ctx = [vocabs.as.ns];
  var ext = ext_context.get();
  if (ext)
    ctx = ctx.concat(ext);
  if (options && options.additional_context)
    ctx.push(options.additional_context);
  return {'@context': ctx.length > 1 ? ctx : ctx[0]};
}

exports.compact = function(expanded, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  checkCallback(callback);
  var _context = getContext(options);
  jsonld.compact(
    expanded, _context,
    {documentLoader: custom_doc_loader},
    function(err, doc) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, doc);
    });
};

exports.import = function(input, callback) {
  checkCallback(callback);
  jsonld.expand(
    input, {
      expandContext: as_context,
      documentLoader: custom_doc_loader
    },
    function(err,expanded) {
      if (err) {
        callback(err);
        return;
      }
      var base = models.wrap_object(expanded[0]);
      callback(null,base);
    }
  );
};
