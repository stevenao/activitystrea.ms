var a = require('./src/activitystreams.js')

a.collection().
  startTimeRange(
    a.interval.closed().
      lower(new Date()).
      upper(new Date())
    ).
  get().
  prettyWrite(function(err,doc) {
    console.log(doc);
  });

a.post().
  to(a.social.everyone().havingRole('http://example.org').distance(1)).
  cc(a.vocabs.social.Public).
  bto(a.vocabs.social.Direct).
  get().
  prettyWrite(function(err,doc) {
    console.log(doc);
  });