'use strict';
/**
 * A Dust context helper
 **/
module.exports = function(obj) {
  return {
    object: obj,
    // Async write of the AS2 object out to Dust
    // {#json space="2"}
    json: function (chunk, context, bodies, params) {
      var options = {};
      if (params.space) {
        options.space = Number(params.space);
      }
      return chunk.map(function(inner_chunk) {
        obj.write(options, function(err,doc) {
          if (err) {
            console.error(err);
            inner_chunk.end();
            return;
          }
          inner_chunk.write(doc);
          inner_chunk.end();
        });
      });
    }
  };
};
