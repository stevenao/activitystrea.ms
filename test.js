var a = require('./src/activitystreams.js')

var collect = a.collection().
  startTimeRange(
    a.closedInterval().
      lower(new Date()).
      upper(new Date())
    ).
  get();

collect.prettyWrite(function(err,doc) {
  console.log(doc);
});

// a.import(
//   {
//     '@type': 'Reservation',
//     displayNameMap: 'J"o"e'
//   }, 
//   function(err, doc) {
    
//     doc.export(
//       function(e,d) {
//         console.log(JSON.stringify(d));
//       }
//     );

//   }
// );


