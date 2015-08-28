'use strict';

var util = require('util');
var utils = require('../utils');
var as = require('linkeddata-vocabs').as;
var Base = require('./_base');

function AsObject(expanded, builder) {
  if (!(this instanceof AsObject))
    return new AsObject(expanded, builder);
  Base.call(this, expanded, builder || AsObject.Builder);
}
util.inherits(AsObject, Base);

AsObject.Builder = function(types, base) {
  if (!(this instanceof AsObject.Builder))
    return new AsObject.Builder(types, base);
  types = (types || []).concat([as.Object]);
  Base.Builder.call(this, types, base || new AsObject({}));
};
util.inherits(AsObject.Builder, Base.Builder);

utils.defineProperty(
  'alias',AsObject,
  function() {
    return this.get(as.alias);
  },
  function(val) {
    this.set(as.alias, val);
    return this;
  }
);

utils.defineProperty(
  'attachment',AsObject,
  function() {
    return this.get(as.attachment);
  },
  function(val) {
    this.set(as.attachment, val);
    return this;
  }
);

utils.defineProperty(
  'attributedTo',AsObject,
  function() {
    return this.get(as.attributedTo);
  },
  function(val) {
    this.set(as.attributedTo, val);
    return this;
  }
);

utils.defineProperty(
  'content',AsObject,
  function() {
    return this.get(as.content);
  },
  function(val, lang) {
    utils.set_lang_val.call(this, as.content, val, lang);
    return this;
  }
);

utils.defineProperty(
  'context',AsObject,
  function() {
    return this.get(as.context);
  },
  function(val) {
    this.set(as.context, val);
    return this;
  }
);

utils.defineProperty(
  'displayName',AsObject,
  function() {
    return this.get(as.displayName);
  },
  function(val, lang) {
    utils.set_lang_val.call(this, as.displayName, val, lang);
    return this;
  }
);

utils.defineProperty(
  'summary',AsObject,
  function() {
    return this.get(as.summary);
  },
  function(val, lang) {
    utils.set_lang_val.call(this, as.summary, val, lang);
    return this;
  }
);

utils.defineProperty(
  'title',AsObject,
  function() {
    return this.get(as.title);
  },
  function(val, lang) {
    utils.set_lang_val.call(this, as.title, val, lang);
    return this;
  }
);

utils.defineProperty(
  'endTime',AsObject,
  function() {
    return this.get(as.endTime);
  },
  function(val) {
    utils.set_date_val.call(this,as.endTime,val);
    return this;
  }
);

utils.defineProperty(
  'published',AsObject,
  function() {
    return this.get(as.published);
  },
  function(val) {
    utils.set_date_val.call(this,as.published,val);
    return this;
  }
);

utils.defineProperty(
  'startTime',AsObject,
  function() {
    return this.get(as.startTime);
  },
  function(val) {
    utils.set_date_val.call(this,as.startTime,val);
    return this;
  }
);

utils.defineProperty(
  'updated',AsObject,
  function() {
    return this.get(as.updated);
  },
  function(val) {
    utils.set_date_val.call(this,as.updated,val);
    return this;
  }
);

utils.defineProperty(
  'generator',AsObject,
  function() {
    return this.get(as.generator);
  },
  function(val) {
    this.set(as.generator, val);
    return this;
  }
);

utils.defineProperty(
  'icon',AsObject,
  function() {
    return this.get(as.icon);
  },
  function(val) {
    this.set(as.icon, val);
    return this;
  }
);

utils.defineProperty(
  'image',AsObject,
  function() {
    return this.get(as.image);
  },
  function(val) {
    this.set(as.image, val);
    return this;
  }
);

utils.defineProperty(
  'inReplyTo',AsObject,
  function() {
    return this.get(as.inReplyTo);
  },
  function(val) {
    this.set(as.inReplyTo, val);
    return this;
  }
);

utils.defineProperty(
  'location',AsObject,
  function() {
    return this.get(as.location);
  },
  function(val) {
    this.set(as.location, val);
    return this;
  }
);

utils.defineProperty(
  'preview',AsObject,
  function() {
    return this.get(as.preview);
  },
  function(val) {
    this.set(as.preview, val);
    return this;
  }
);

utils.defineProperty(
  'replies',AsObject,
  function() {
    return this.get(as.replies);
  },
  function(val) {
    this.set(as.replies, val);
    return this;
  }
);

utils.defineProperty(
  'scope',AsObject,
  function() {
    return this.get(as.scope);
  },
  function(val) {
    this.set(as.scope, val);
    return this;
  }
);

utils.defineProperty(
  'tag',AsObject,
  function() {
    return this.get(as.tag);
  },
  function(val) {
    this.set(as.tag, val);
    return this;
  }
);

utils.defineProperty(
  'url',AsObject,
  function() {
    return this.get(as.url);
  },
  function(val) {
    this.set(as.url, val);
    return this;
  }
);

utils.defineProperty(
  'to',AsObject,
  function() {
    return this.get(as.to);
  },
  function(val) {
    this.set(as.to, val);
    return this;
  }
);

utils.defineProperty(
  'bto',AsObject,
  function() {
    return this.get(as.bto);
  },
  function(val) {
    this.set(as.bto, val);
    return this;
  }
);

utils.defineProperty(
  'cc',AsObject,
  function() {
    return this.get(as.cc);
  },
  function(val) {
    this.set(as.cc, val);
    return this;
  }
);

utils.defineProperty(
  'bcc',AsObject,
  function() {
    return this.get(as.bcc);
  },
  function(val) {
    this.set(as.bcc, val);
    return this;
  }
);

var proto = AsObject.Builder.prototype;
proto.endTimeNow = function() {
  return this.endTime(new Date());
};
proto.publishedNow = function() {
  return this.published(new Date());
};
proto.startTimeNow = function() {
  return this.startTime(new Date());
};
proto.updatedNow = function() {
  return this.updated(new Date());
};

module.exports = AsObject;
