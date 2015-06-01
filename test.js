var a = require('./src/activitystreams.js')

var obj = {
  '@context': 'http://www.w3.org/ns/activitystreams#',
  '@type': 'Add',
  '@id': 'http://example.org/foo',
  'target': 'http://example.org/foo'
};

a.import(obj, function(err,doc) {
  doc.export(function(err,exp) {
    console.log(exp);
  });
});
