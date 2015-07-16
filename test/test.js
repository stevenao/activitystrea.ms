var assert = require('assert');
var as = require('..');
var vocabs = require('linkeddata-vocabs');
var models = require('../src/models');
var as = require('../src/activitystreams');

var now = new Date();

describe('Basics...', function () {
  it('should build a minimal object', function () {
    var object = as.object().get();
    assert.equal(object.type, vocabs.as.Object);
  });

  function testFunctionalProperties(object) {
    assert.equal(object.alias, 'http://example.org/foo');
    assert.equal(object.content, 'bar');
    assert.equal(object.content.valueOf('fr'), 'foo');
    assert.equal(object.displayName.de, 'baz');
    assert.equal(object.summary.sp, 'bar');
    assert.equal(object.title.it, 'foo');
    assert.equal(object.endTime.toISOString(), now.toISOString());
    assert.equal(object.startTime.toISOString(), now.toISOString());
    assert.equal(object.published.toISOString(), now.toISOString());
    assert.equal(object.updated.toISOString(), now.toISOString());
  }

  it('should create an object and return all the correct values', function () {
    var object = as.object()
      .alias('http://example.org/foo')
      .content('bar', 'en')
      .content('foo', 'fr')
      .displayName('baz', 'de')
      .summary('bar', 'sp')
      .title('foo', 'it')
      .endTime(now)
      .startTime(now)
      .published(now)
      .updated(now)
      .get();
    testFunctionalProperties(object);
  });

  it('should roundtrip correctly', function() {
    var object = as.object()
      .alias('http://example.org/foo')
      .content('bar', 'en')
      .content('foo', 'fr')
      .displayName('baz', 'de')
      .summary('bar', 'sp')
      .title('foo', 'it')
      .endTime(now)
      .startTime(now)
      .published(now)
      .updated(now)
      .get();
    object.export(function(e,d) {
      assert.equal(e, null);
      as.import(d, function(e,d) {
        testFunctionalProperties(d);
      });
    });
  });

  it('should create a basic actor object', function() {
    assert(as.actor().get() instanceof models.Actor);
  });

  it('should create a basic activity object', function() {
    assert(as.activity().get() instanceof models.Activity);
  });

  it('should create a basic collection object', function() {
    assert(as.collection().get() instanceof models.Collection);
  });

  it('should create a basic ordered collection object', function() {
    assert(as.orderedCollection().get() instanceof models.OrderedCollection);
  });

  it('should create a basic content object', function() {
    assert(as.content().get() instanceof models.Content);
  });

  it('should create a basic link object', function() {
    assert(as.link().get() instanceof models.Link);
  });

  it('should create activities with an appropriate type', function() {
    [['accept',vocabs.as.Accept],
     ['tentativeAccept',vocabs.as.TentativeAccept],
     ['add',vocabs.as.Add],
     ['arrive',vocabs.as.Arrive],
     ['create',vocabs.as.Create],
     ['delete',vocabs.as.Delete],
     ['favorite',vocabs.as.Favorite],
     ['follow',vocabs.as.Follow],
     ['ignore',vocabs.as.Ignore],
     ['join',vocabs.as.Join],
     ['leave',vocabs.as.Leave],
     ['like',vocabs.as.Like],
     ['offer',vocabs.as.Offer],
     ['invite',vocabs.as.Invite],
     ['reject',vocabs.as.Reject],
     ['tentativeReject',vocabs.as.TentativeReject],
     ['remove',vocabs.as.Remove],
     ['undo',vocabs.as.Undo],
     ['update',vocabs.as.Update],
     ['experience',vocabs.as.Experience],
     ['view',vocabs.as.View],
     ['listen',vocabs.as.Listen],
     ['read',vocabs.as.Read],
     ['move',vocabs.as.Move],
     ['travel',vocabs.as.Travel],
     ['announce',vocabs.as.Announce],
     ['block',vocabs.as.Block],
     ['flag',vocabs.as.Flag],
     ['dislike',vocabs.as.Dislike]
    ].forEach(function(key) {
      var obj = as[key[0]]().get();
      assert(obj instanceof models.Activity);
      assert.equal(obj.type,key[1]);
    });
  });

  it('should create objects with an appropriate type', function() {
    [
     ['application',vocabs.as.Application],
     ['content',vocabs.as.Content],
     ['group',vocabs.as.Group],
     ['person',vocabs.as.Person],
     ['process',vocabs.as.Process],
     ['service',vocabs.as.Service],
     ['article',vocabs.as.Article],
     ['document',vocabs.as.Document],
     ['relationship',vocabs.as.Relationship],
     ['profile',vocabs.as.Profile],
     ['audio',vocabs.as.Audio],
     ['image',vocabs.as.Image],
     ['video',vocabs.as.Video],
     ['note',vocabs.as.Note],
     ['page',vocabs.as.Page],
     ['question',vocabs.as.Question],
     ['event',vocabs.as.Event],
     ['place',vocabs.as.Place]
   ].forEach(function(key) {
      var obj = as[key[0]]().get();
      assert(obj instanceof models.Object);
      assert.equal(obj.type,key[1]);
    });
  });

  it('should create collection objects with an appropriate type', function() {
    [['album',vocabs.as.Album],
     ['folder',vocabs.as.Folder],
     ['story',vocabs.as.Story]
    ].forEach(function(key) {
      var obj = as[key[0]]().get();
      assert(obj instanceof models.Collection);
      assert.equal(obj.type,key[1]);
    });
  });

  it('should create link objects with an appropriate type', function() {
    [['mention',vocabs.as.Mention]].forEach(function(key) {
      var obj = as[key[0]]().get();
      assert(obj instanceof models.Link);
      assert.equal(obj.type,key[1]);
    });
  });

  it('should create a complex object', function() {
    // Test complex creation
    obj =
      as.create()
        .actor('acct:joe@example.org')
        .object(as.note().content('this is a note'))
        .get();

    assert.equal(1, obj.actor.length);
    var actor = obj.actor[0];
    assert.equal('acct:joe@example.org', actor.id);
    assert(actor instanceof models.Object);

    assert.equal(1, obj.object.length);
    var note = obj.object[0];
    assert.equal(vocabs.as.Note, note.type);
    assert.equal(note.content, 'this is a note');
  });

  it('should import from JSON without errors', function() {
    as.import({
      '@type': 'Like',
      displayNameMap: {
        en: 'foo'
      },
      actor: {
        '@type': 'Person',
        displayName: 'Joe'
      },
      object: {
        '@type': 'http://example.org/Table',
        displayName: 'Table'
      }
    }, function(err, doc) {
      assert.equal(null, err);
      assert.equal(vocabs.as.Like, doc.type);
      assert.equal(doc.displayName, 'foo');
      assert.equal(vocabs.as.Person, doc.actor[0].type);
      assert.equal(doc.actor[0].displayName, 'Joe');
    });
  });
});

describe('Extensions...', function() {
  it('should initialize the Interval and Social Extensions', function() {
    as.use(as.interval);
    as.use(as.social);
    assert.equal(require('../src/extcontext.js').get().length, 2);
  });

  it('should create interval objects with appropriate type and values', function() {
    [
      ['open', vocabs.interval.OpenInterval],
      ['closed', vocabs.interval.ClosedInterval],
      ['openClosed', vocabs.interval.OpenClosedInterval],
      ['closedOpen', vocabs.interval.ClosedOpenInterval],
      ['leftOpen', vocabs.interval.LeftOpenInterval],
      ['rightOpen', vocabs.interval.RightOpenInterval],
      ['leftClosed', vocabs.interval.LeftClosedInterval],
      ['rightClosed', vocabs.interval.RightClosedInterval],
    ].forEach(function(key){
      var obj = as.interval[key[0]]().
        upper(1).
        lower(0).
        step(1).
        get();
      assert(obj instanceof as.interval.model.Interval);
      assert.equal(obj.type,key[1]);
      assert.equal(obj.upper, 1);
      assert.equal(obj.lower, 0);
      assert.equal(obj.step, 1);
    });
  });

  it('should create population objects with appropriate type', function() {
    [
      ['population', vocabs.social.Population],
      ['everyone', vocabs.social.Everyone],
      ['public', vocabs.social.Public],
      ['private', vocabs.social.Private],
      ['direct', vocabs.social.Direct],
      ['common', vocabs.social.Common],
      ['interested', vocabs.social.Interested],
      ['self', vocabs.social.Self],
      ['all', vocabs.social.All],
      ['any', vocabs.social.Any],
      ['none', vocabs.social.None],
      ['compoundPopulation', vocabs.social.CompoundPopulation]
    ].forEach(function(key) {
      var obj = as.social[key[0]]().get();
      assert(obj instanceof as.social.model.Population);
      assert.equal(obj.type, key[1]);
    });
  });
});
