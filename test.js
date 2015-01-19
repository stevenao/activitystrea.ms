var a = require('./src/activitystreams.js')

a.collection().
  id('urn:foo:test').
  startTimeRange(
    a.interval.closed().
      lower(new Date()).
      upper(new Date())
    ).
  get().
  prettyWrite(function(err,doc) {
    console.log(doc);
  });
