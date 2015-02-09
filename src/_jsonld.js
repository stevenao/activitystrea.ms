
var jsonld        = require('jsonld');
var checkCallback = require('./utils').checkCallback;
var vocabs        = require('linkeddata-vocabs');
var as_context    = require('activitystreams-context');
var asx_context   = require('./data/extended-context.json');
var models        = require('./models');

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
};

exports.compact = function(expanded, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  checkCallback(callback);
  var _context = {'@context': [vocabs.as.ns, asx_context]};
  options = options || {};
  if (options.additional_context) 
    _context['@context'].push(
      options.additional_context);
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

exports.import = function(reasoner, input, callback) {
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
      var base = models.wrap_object(expanded[0], reasoner, null);
      callback(null,base);
    }
  );
};