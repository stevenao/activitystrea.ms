/**
 * Copyright 2013 International Business Machines Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Utility library for working with Activity Streams Actions
 * Requires underscorejs.
 *
 * @author James M Snell (jasnell@us.ibm.com)
 */
'use strict';

const assert = require('assert');
const as = require('..');
const vocabs = require('linkeddata-vocabs');
const models = require('../src/models');

const now = new Date();

describe('Basics...', function () {
  it('should build a minimal object', function () {
    var object = as.object().get();
    assert.equal(object.type, vocabs.as.Object);
  });
  
  function testFunctionalProperties(object) {
    assert.equal(object.content.get(), 'bar');
    assert.equal(object.content.get('fr'), 'foo');
    assert.equal(object.displayName.get('de'), 'baz');
    assert.equal(object.summary.get('es'), 'bar');
    assert.equal(object.title.get('it'), 'foo');
    assert.equal(object.endTime.toISOString(), now.toISOString());
    assert.equal(object.startTime.toISOString(), now.toISOString());
    assert.equal(object.published.toISOString(), now.toISOString());
    assert.equal(object.updated.toISOString(), now.toISOString());
  }
  
  it('should create an object and return all the correct values', function () {
    var object = as.object()
      .content(
        as.langmap()
          .set('en', 'bar')
          .set('fr', 'foo'))
      .displayName(
        as.langmap()
          .set('de', 'baz'))
      .summary(
        as.langmap()
          .set('es', 'bar'))
      .title(
        as.langmap()
          .set('it', 'foo'))
      .endTime(now)
      .startTime(now)
      .published(now)
      .updated(now)
      .get();
    testFunctionalProperties(object);
  });
  
  it('should roundtrip correctly', function() {
    var object = as.object()
      .content(
        as.langmap()
          .set('en', 'bar')
          .set('fr', 'foo'))
      .displayName(
        as.langmap()
          .set('de', 'baz'))
      .summary(
        as.langmap()
          .set('es', 'bar'))
      .title(
        as.langmap()
          .set('it', 'foo'))
      .endTime(now)
      .startTime(now)
      .published(now)
      .updated(now)
      .get();
    object.export(function(e,d) {
      assert.equal(e, null);
      as.import(d, function(e,d) {
        assert.equal(e,undefined);
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
     ['organization',vocabs.as.Organization],
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
    var obj =
      as.create()
        .actor('acct:joe@example.org')
        .object(as.note().content('this is a note'))
        .get();
  
    assert.equal(1, obj.actor.length);
    var actor = obj.actor.first;
    assert.equal('acct:joe@example.org', actor.id);
    assert(actor instanceof models.Object);
  
    assert.equal(1, obj.object.length);
    var note = obj.object.first;
    assert.equal(vocabs.as.Note, note.type);
    assert.equal(note.content.get(), 'this is a note');
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

  it('should handle languages properly', function() {
    var LanguageValue = require('../src/models/_languagevalue');
    var B = new LanguageValue.Builder();
    B.set('en-US', 'bar');
    B.set('fr-US', 'baz');
    B.set('fr', 'boo');
    var lv = B.get();
    assert.equal(lv.get(), 'bar');
    assert.equal(lv.get('en'), 'bar');
    assert.equal(lv.get('en-us'), 'bar');
    assert.equal(lv.get('en-US'), 'bar');
    assert.equal(lv.get('en-Us-Scrp'), 'bar');
    assert.equal(lv.get('fr'), 'boo');
    assert.equal(lv.get('FR-US'), 'baz');
  });

  it('should roundtrip the RDF properly', function(done) {
    var obj = as.object().title('test').get();
    obj.toRDF(function(err,doc) {
      assert.equal(err, undefined);
      assert(doc);
      as.importFromRDF(doc, function(err,doc) {
        assert.equal(err, undefined);
        assert.equal(doc.title.get(), 'test');
        done();
      });
    });
  });

  it('should import an object with just an @id', function(done) {
    var test = {'@id': 'http://example.org'};
    as.import(test, function(err,doc) {
      assert.equal(err,undefined);
      assert.equal(doc.id, 'http://example.org');
      done();
    });
  });

  it('should have appropriate values for every orderedcollection property',
    function(done) {

    var doc = as.orderedCollection()
      .id('http://example.org')
      .totalItems(1)
      .current('http://example.org/current')
      .first('http://example.org/first')
      .last('http://example.org/last')
      .items('http://example.org/item/1')
      .items('http://example.org/item/2')
      .get();
    assert(doc instanceof as.models.OrderedCollection);
    assert.equal(doc.totalItems, 1);
    assert.equal(doc.current.id, 'http://example.org/current');
    assert.equal(doc.first.id, 'http://example.org/first');
    assert.equal(doc.last.id, 'http://example.org/last');
    assert.equal(doc.items.length, 2);
    const iter = doc.items[Symbol.iterator]();
    assert.equal(iter.next().value.id, 'http://example.org/item/1');//TODO:this fails
    assert.equal(iter.next().value.id, 'http://example.org/item/2');//TODO:this fails
    done();
  });

  it('should have appropriate values for every orderedcollection property',
    function(done) {

    var test = {
      '@context': 'http://www.w3.org/ns/activitystreams#',
      '@id': 'http://example.org',
      '@type': 'OrderedCollection',
      totalItems: 1,
      current: 'http://example.org/current',
      first: 'http://example.org/first',
      last: 'http://example.org/last',
      items: [
        'http://example.org/item/1',
        'http://example.org/item/2'
      ]
    };

    as.import(test, function(err, doc) {
      assert.equal(err, undefined);
      assert(doc instanceof as.models.OrderedCollection);
      assert.equal(doc.totalItems, 1);
      assert.equal(doc.current.id, 'http://example.org/current');
      assert.equal(doc.first.id, 'http://example.org/first');
      assert.equal(doc.last.id, 'http://example.org/last');
      assert.equal(doc.items.length, 2);
      const iter = doc.items[Symbol.iterator]();
      assert.equal(iter.next().value.id, 'http://example.org/item/1');
      assert.equal(iter.next().value.id, 'http://example.org/item/2');

      done();
    });

  });

  it('should have appropriate values for every collection property',
    function(done) {

    var doc = as.collection()
      .id('http://example.org')
      .totalItems(1)
      .current('http://example.org/current')
      .first('http://example.org/first')
      .last('http://example.org/last')
      .items('http://example.org/item/1')
      .items('http://example.org/item/2')
      .get();

    assert(doc instanceof as.models.Collection);
    assert.equal(doc.totalItems, 1);
    assert.equal(doc.current.id, 'http://example.org/current');
    assert.equal(doc.first.id, 'http://example.org/first');
    assert.equal(doc.last.id, 'http://example.org/last');
    assert.equal(doc.items.length, 2);
    const iter = doc.items[Symbol.iterator]();
    assert.equal(iter.next().value.id, 'http://example.org/item/1');
    assert.equal(iter.next().value.id, 'http://example.org/item/2');

    done();
  });

  it('should have appropriate values for every collection property',
    function(done) {

    var test = {
      '@context': 'http://www.w3.org/ns/activitystreams#',
      '@id': 'http://example.org',
      '@type': 'Collection',
      totalItems: 1,
      current: 'http://example.org/current',
      first: 'http://example.org/first',
      last: 'http://example.org/last',
      items: [
        'http://example.org/item/1',
        'http://example.org/item/2'
      ]
    };

    as.import(test, function(err, doc) {
      assert.equal(err, undefined);
      assert(doc instanceof as.models.Collection);
      assert.equal(doc.totalItems, 1);
      assert.equal(doc.current.id, 'http://example.org/current');
      assert.equal(doc.first.id, 'http://example.org/first');
      assert.equal(doc.last.id, 'http://example.org/last');
      assert.equal(doc.items.length, 2);
      const iter = doc.items[Symbol.iterator]();
      assert.equal(iter.next().value.id, 'http://example.org/item/1');
      assert.equal(iter.next().value.id, 'http://example.org/item/2');
      done();
    });

  });

  it('should have appropriate values for every activity property',
    function(done) {

    var doc = as.activity()
      .id('http://example.org')
      .actor('http://example.org/actor')
      .object('http://example.org/object')
      .target('http://example.org/target')
      .result('http://example.org/result')
      .origin('http://example.org/origin')
      .instrument('http://example.org/instrument')
      .get();

    assert(doc instanceof as.models.Activity);
    assert.equal(doc.id, 'http://example.org');

    assert(doc.actor);
    assert.equal(doc.actor.length,1);
    assert.equal(doc.actor.first.id, 'http://example.org/actor');
    assert(doc.object);
    assert.equal(doc.object.length,1);
    assert.equal(doc.object.first.id, 'http://example.org/object');
    assert(doc.target);
    assert.equal(doc.target.length,1);
    assert.equal(doc.target.first.id, 'http://example.org/target');
    assert(doc.result);
    assert.equal(doc.result.length,1);
    assert.equal(doc.result.first.id, 'http://example.org/result');
    assert(doc.origin);
    assert.equal(doc.origin.length,1);
    assert.equal(doc.origin.first.id, 'http://example.org/origin');
    assert(doc.instrument);
    assert.equal(doc.instrument.length,1);
    assert.equal(doc.instrument.first.id, 'http://example.org/instrument');

    done();
  });

  it('should have appropriate values for every activity property',
    function(done) {

    var test = {
      '@context': 'http://www.w3.org/ns/activitystreams#',
      '@id': 'http://example.org',
      '@type': 'Activity',
      actor: 'http://example.org/actor',
      object: 'http://example.org/object',
      target: 'http://example.org/target',
      result: 'http://example.org/result',
      origin: 'http://example.org/origin',
      instrument: 'http://example.org/instrument'
    };

    as.import(test, function(err,doc) {
      assert.equal(err, undefined);
      assert(doc instanceof as.models.Activity);
      assert.equal(doc.id, 'http://example.org');

      assert(doc.actor);
      assert.equal(doc.actor.length,1);
      assert.equal(doc.actor.first.id, 'http://example.org/actor');
      assert(doc.object);
      assert.equal(doc.object.length,1);
      assert.equal(doc.object.first.id, 'http://example.org/object');
      assert(doc.target);
      assert.equal(doc.target.length,1);
      assert.equal(doc.target.first.id, 'http://example.org/target');
      assert(doc.result);
      assert.equal(doc.result.length,1);
      assert.equal(doc.result.first.id, 'http://example.org/result');
      assert(doc.origin);
      assert.equal(doc.origin.length,1);
      assert.equal(doc.origin.first.id, 'http://example.org/origin');
      assert(doc.instrument);
      assert.equal(doc.instrument.length,1);
      assert.equal(doc.instrument.first.id, 'http://example.org/instrument');
      done();
    });

  });

  it('should have appropriate values for every link property',
    function(done) {
    var test = {
      '@context': 'http://www.w3.org/ns/activitystreams#',
      '@id': 'http://example.org',
      '@type': 'Link',
      href: 'http://example.org',
      rel: ['a','b'],
      mediaType: 'application/text',
      displayName: 'the display name',
      title: 'the title',
      hreflang: 'en',
      height: 10,
      width: 10,
      duration: 'PT10S'
    };
    as.import(test, function(err, doc) {
      assert.equal(err, undefined);
      assert(doc instanceof as.models.Link);
      assert.equal(doc.id, 'http://example.org');
      assert.equal(doc.href, 'http://example.org');
      const iter = doc.rel[Symbol.iterator]();
      assert.equal(iter.next().value, 'a');
      assert.equal(iter.next().value, 'b');
      assert.equal(doc.mediaType, 'application/text');
      assert.equal(doc.displayName.get(), 'the display name');
      assert.equal(doc.title.get(), 'the title');
      assert.equal(doc.hreflang, 'en');
      assert.equal(doc.height, 10);
      assert.equal(doc.width, 10);
      assert.equal(doc.duration.seconds(), 10);
      done();
    });
  });

  it('should have appropriate values for every link property',
    function(done) {
    var doc = as.link()
      .id('http://example.org')
      .href('http://example.org')
      .rel('a')
      .rel('b')
      .mediaType('application/text')
      .displayName('the display name')
      .title('the title')
      .hreflang('en')
      .height(10)
      .width(10)
      .duration(10)
      .get();

    assert(doc instanceof as.models.Link);
    assert.equal(doc.id, 'http://example.org');
    assert.equal(doc.href, 'http://example.org');
    const iter = doc.rel[Symbol.iterator]();
    assert.equal(iter.next().value, 'a');
    assert.equal(iter.next().value, 'b');
    assert.equal(doc.mediaType, 'application/text');
    assert.equal(doc.displayName.get(), 'the display name');
    assert.equal(doc.title.get(), 'the title');
    assert.equal(doc.hreflang, 'en');
    assert.equal(doc.height, 10);
    assert.equal(doc.width, 10);
    assert.equal(doc.duration.seconds(), 10);
    done();

  });

  it('should have appropriate values for every object property',
     function(done) {
    var test = {
      '@context': 'http://www.w3.org/ns/activitystreams#',
      '@id': 'http://example.org',
      '@type': 'Object',
      attachment: 'http://example.org/attachment',
      attributedTo: 'http://sally.example.org',
      content: 'the content',
      context: 'http://example.org/context',
      displayName: 'the display name',
      endTime: '2015-12-12T12:12:12Z',
      generator: 'http://example.org/generator',
      icon: 'http://example.org/icon',
      image: 'http://example.org/image',
      inReplyTo: 'http://example.org/in-reply-to',
      location: 'http://example.org/location',
      preview: 'http://example.org/preview',
      tag: 'http://example.org/tag',
      title: 'the title',
      updated: '2015-12-12T12:12:12Z',
      published: '2015-12-12T12:12:12Z',
      replies: 'http://example.org/replies',
      scope: 'http://example.org/scope',
      startTime: '2015-12-12T12:12:12Z',
      url: 'http://example.org',
      to: 'http://joe.example.org',
      bto: 'http://sally.example.org',
      cc: 'http://mark.example.org',
      bcc: 'http://jane.example.org'
    };
    as.import(test, function(err, doc) {
      assert.equal(err, undefined);
      assert.equal(doc.id, 'http://example.org');
      assert.equal(doc.type, vocabs.as.Object);
      assert(doc.attachment);
      assert.equal(doc.attachment.length,1);
      assert.equal(doc.attachment.first.id, 'http://example.org/attachment');
      assert(doc.attributedTo);
      assert.equal(doc.attributedTo.length,1);
      assert.equal(doc.attributedTo.first.id, 'http://sally.example.org');
      assert.equal(doc.content.get(), 'the content');
      assert(doc.context);
      assert.equal(doc.context.length,1);
      assert.equal(doc.context.first.id, 'http://example.org/context');
      assert.equal(doc.displayName.get(), 'the display name');
      assert.equal(doc.endTime.valueOf(),
        new Date('2015-12-12T12:12:12Z').valueOf());
      assert(doc.generator);
      assert.equal(doc.generator.length,1);
      assert.equal(doc.generator.first.id, 'http://example.org/generator');
      assert(doc.icon);
      assert.equal(doc.icon.length,1);
      assert.equal(doc.icon.first.id, 'http://example.org/icon');
      assert(doc.image);
      assert.equal(doc.image.length,1);
      assert.equal(doc.image.first.id, 'http://example.org/image');
      assert(doc.inReplyTo);
      assert.equal(doc.inReplyTo.length,1);
      assert.equal(doc.inReplyTo.first.id, 'http://example.org/in-reply-to');
      assert(doc.location);
      assert.equal(doc.location.length,1);
      assert.equal(doc.location.first.id, 'http://example.org/location');
      assert(doc.preview);
      assert.equal(doc.preview.length,1);
      assert.equal(doc.preview.first.id, 'http://example.org/preview');
      assert(doc.tag);
      assert.equal(doc.tag.length,1);
      assert.equal(doc.tag.first.id, 'http://example.org/tag');
      assert.equal(doc.title.get(), 'the title');
      assert.equal(doc.updated.valueOf(),
        new Date('2015-12-12T12:12:12Z').valueOf());
      assert.equal(doc.published.valueOf(),
        new Date('2015-12-12T12:12:12Z').valueOf());
      assert(doc.replies);
      assert.equal(doc.replies.length,1);
      assert.equal(doc.replies.first.id, 'http://example.org/replies');
      assert(doc.scope);
      assert.equal(doc.scope.length,1);
      assert.equal(doc.scope.first.id, 'http://example.org/scope');
      assert(doc.url);
      assert.equal(doc.url.length,1);
      assert.equal(doc.url.first.id, 'http://example.org');
      assert.equal(doc.startTime.valueOf(),
        new Date('2015-12-12T12:12:12Z').valueOf());
      assert(doc.to);
      assert.equal(doc.to.length,1);
      assert.equal(doc.to.first.id, 'http://joe.example.org');
      assert(doc.bto);
      assert.equal(doc.bto.length,1);
      assert.equal(doc.bto.first.id, 'http://sally.example.org');
      assert(doc.cc);
      assert.equal(doc.cc.length,1);
      assert.equal(doc.cc.first.id, 'http://mark.example.org');
      assert(doc.bcc);
      assert.equal(doc.bcc.length,1);
      assert.equal(doc.bcc.first.id, 'http://jane.example.org');
      done();
    });
  });

  it('should have appropriate values for every object property',
     function(done) {
    var doc = as.object()
      .id('http://example.org')
      .attachment('http://example.org/attachment')
      .attributedTo('http://sally.example.org')
      .content('the content')
      .context('http://example.org/context')
      .displayName('the display name')
      .endTime(new Date('2015-12-12T12:12:12Z'))
      .generator('http://example.org/generator')
      .icon('http://example.org/icon')
      .image('http://example.org/image')
      .inReplyTo('http://example.org/in-reply-to')
      .location('http://example.org/location')
      .preview('http://example.org/preview')
      .tag('http://example.org/tag')
      .title('the title')
      .updated(new Date('2015-12-12T12:12:12Z'))
      .published(new Date('2015-12-12T12:12:12Z'))
      .replies('http://example.org/replies')
      .scope('http://example.org/scope')
      .startTime(new Date('2015-12-12T12:12:12Z'))
      .url('http://example.org')
      .to('http://joe.example.org')
      .bto('http://sally.example.org')
      .cc('http://mark.example.org')
      .bcc('http://jane.example.org')
      .get();
      assert.equal(doc.id, 'http://example.org');
      assert.equal(doc.type, vocabs.as.Object);
      assert(doc.attachment);
      assert.equal(doc.attachment.length,1);
      assert.equal(doc.attachment.first.id, 'http://example.org/attachment');
      assert(doc.attributedTo);
      assert.equal(doc.attributedTo.length,1);
      assert.equal(doc.attributedTo.first.id, 'http://sally.example.org');
      assert.equal(doc.content.get(), 'the content');
      assert(doc.context);
      assert.equal(doc.context.length,1);
      assert.equal(doc.context.first.id, 'http://example.org/context');
      assert.equal(doc.displayName.get(), 'the display name');
      assert.equal(doc.endTime.valueOf(),
        new Date('2015-12-12T12:12:12Z').valueOf());
      assert(doc.generator);
      assert.equal(doc.generator.length,1);
      assert.equal(doc.generator.first.id, 'http://example.org/generator');
      assert(doc.icon);
      assert.equal(doc.icon.length,1);
      assert.equal(doc.icon.first.id, 'http://example.org/icon');
      assert(doc.image);
      assert.equal(doc.image.length,1);
      assert.equal(doc.image.first.id, 'http://example.org/image');
      assert(doc.inReplyTo);
      assert.equal(doc.inReplyTo.length,1);
      assert.equal(doc.inReplyTo.first.id, 'http://example.org/in-reply-to');
      assert(doc.location);
      assert.equal(doc.location.length,1);
      assert.equal(doc.location.first.id, 'http://example.org/location');
      assert(doc.preview);
      assert.equal(doc.preview.length,1);
      assert.equal(doc.preview.first.id, 'http://example.org/preview');
      assert(doc.tag);
      assert.equal(doc.tag.length,1);
      assert.equal(doc.tag.first.id, 'http://example.org/tag');
      assert.equal(doc.title.get(), 'the title');
      assert.equal(doc.updated.valueOf(),
        new Date('2015-12-12T12:12:12Z').valueOf());
      assert.equal(doc.published.valueOf(),
        new Date('2015-12-12T12:12:12Z').valueOf());
      assert(doc.replies);
      assert.equal(doc.replies.length,1);
      assert.equal(doc.replies.first.id, 'http://example.org/replies');
      assert(doc.scope);
      assert.equal(doc.scope.length,1);
      assert.equal(doc.scope.first.id, 'http://example.org/scope');
      assert(doc.url);
      assert.equal(doc.url.length,1);
      assert.equal(doc.url.first.id, 'http://example.org');
      assert.equal(doc.startTime.valueOf(),
        new Date('2015-12-12T12:12:12Z').valueOf());
      assert(doc.to);
      assert.equal(doc.to.length,1);
      assert.equal(doc.to.first.id, 'http://joe.example.org');
      assert(doc.bto);
      assert.equal(doc.bto.length,1);
      assert.equal(doc.bto.first.id, 'http://sally.example.org');
      assert(doc.cc);
      assert.equal(doc.cc.length,1);
      assert.equal(doc.cc.first.id, 'http://mark.example.org');
      assert(doc.bcc);
      assert.equal(doc.bcc.length,1);
      assert.equal(doc.bcc.first.id, 'http://jane.example.org');
      done();

  });

  it('should have appropriate values for the relationship object',
    function(done) {

      var test = {
        '@context': 'http://www.w3.org/ns/activitystreams#',
        '@type': 'Relationship',
        subject: 'http://sally.example.org',
        relationship: 'http://example.org',
        object: 'http://joe.example.org'
      };

      as.import(test, function(err,doc) {
        assert.equal(err, undefined);
        assert(doc instanceof as.models.Relationship);
        assert(doc.subject.id, 'http://sally.example.org');
        assert(doc.relationship);
        assert.equal(doc.relationship.length, 1);
        assert.equal(doc.relationship.first.id, 'http://example.org');
        assert(doc.object);
        assert.equal(doc.object.length, 1);
        assert.equal(doc.object.first.id, 'http://joe.example.org');
        done();
      });

  });

  it('should have appropriate values for the relationship object',
    function(done) {

      var doc = as.relationship()
        .subject('http://sally.example.org')
        .relationship('http://example.org')
        .object('http://joe.example.org')
        .get();

      assert(doc instanceof as.models.Relationship);
      assert(doc.subject.id, 'http://sally.example.org');
      assert(doc.relationship);
      assert.equal(doc.relationship.length, 1);
      assert.equal(doc.relationship.first.id, 'http://example.org');
      assert(doc.object);
      assert.equal(doc.object.length, 1);
      assert.equal(doc.object.first.id, 'http://joe.example.org');
      done();

  });

  it('should have appropriate values for the content object',
    function(done) {

    var test = {
      '@context': 'http://www.w3.org/ns/activitystreams#',
      '@type': 'Content',
      height: 10,
      width: 10,
      duration: 'PT10S'
    };

    as.import(test, function(err, doc) {
      assert.equal(err, undefined);
      assert(doc instanceof as.models.Content);
      assert.equal(doc.height, 10);
      assert.equal(doc.width, 10);
      assert.equal(doc.duration.seconds(), 10);
      done();
    });
  });

  it('should have appropriate values for the content object',
    function(done) {

    var doc = as.content()
      .height(10)
      .width(10)
      .duration(10)
      .get();

    assert(doc instanceof as.models.Content);
    assert.equal(doc.height, 10);
    assert.equal(doc.width, 10);
    assert.equal(doc.duration.seconds(), 10);
    done();

  });

  it('should have appropriate values for the question object',
    function(done) {

    var test = {
      '@context': 'http://www.w3.org/ns/activitystreams#',
      '@type': 'Question',
      displayName: 'the question',
      height: 10,
      width: 10,
      duration: 'PT10S',
      anyOf: [{'@id':'urn:answer1'},{'@id':'urn:answer2'}]
    };

    as.import(test, function(err, doc) {
      assert.equal(err, undefined);
      assert(doc instanceof as.models.Question);
      assert.equal(doc.height, 10);
      assert.equal(doc.width, 10);
      assert.equal(doc.duration.seconds(), 10);
      assert.equal(doc.displayName.get(), 'the question');
      assert(doc.anyOf);
      assert.equal(doc.anyOf.length,2);
      const iter = doc.anyOf[Symbol.iterator]();
      assert.equal(iter.next().value.id, 'urn:answer1');
      assert.equal(iter.next().value.id, 'urn:answer2');
      done();
    });
  });

  it('should have appropriate values for the question object',
    function(done) {

    var doc = as.question()
      .height(10)
      .width(10)
      .duration(10)
      .displayName('the question')
      .anyOf('urn:answer1')
      .anyOf('urn:answer2')
      .get();

    assert(doc instanceof as.models.Question);
    assert.equal(doc.height, 10);
    assert.equal(doc.width, 10);
    assert.equal(doc.duration.seconds(), 10);
    assert.equal(doc.displayName.get(), 'the question');
    assert(doc.anyOf);
    assert.equal(doc.anyOf.length,2);
    const iter = doc.anyOf[Symbol.iterator]();
    assert.equal(iter.next().value.id, 'urn:answer1');
    assert.equal(iter.next().value.id, 'urn:answer2');
    done();

  });

  it('should have appropriate values for the place object', function(done) {

    var test = {
      '@context': 'http://www.w3.org/ns/activitystreams#',
      '@type': 'Place',
      accuracy: 10,
      altitude: 10,
      latitude: 10,
      longitude: 10,
      radius: 10,
      units: 'm'
    };

    as.import(test, function(err, doc) {
      assert.equal(err, undefined);
      assert(doc instanceof as.models.Place);
      assert.equal(doc.accuracy, 10);
      assert.equal(doc.altitude, 10);
      assert.equal(doc.latitude, 10);
      assert.equal(doc.longitude, 10);
      assert.equal(doc.radius, 10);
      assert.equal(doc.units, 'm');
      done();
    });

  });

  it('should have appropriate values for the place object', function(done) {

    var doc = as.place()
      .accuracy(10)
      .altitude(10)
      .latitude(10)
      .longitude(10)
      .radius(10)
      .units('m')
      .get();

    assert(doc instanceof as.models.Place);
    assert.equal(doc.accuracy, 10);
    assert.equal(doc.altitude, 10);
    assert.equal(doc.latitude, 10);
    assert.equal(doc.longitude, 10);
    assert.equal(doc.radius, 10);
    assert.equal(doc.units, 'm');
    done();

  });

  it('should have appropriate values for the profile object', function(done) {

    var test = {
      '@context': 'http://www.w3.org/ns/activitystreams#',
      '@type': 'Profile',
      describes: 'http://example.org'
    };

    as.import(test, function(err, doc) {
      assert.equal(err, undefined);
      assert(doc instanceof as.models.Profile);
      assert.equal(doc.describes.id, 'http://example.org');
      done();
    });

  });

  it('should have appropriate values for the profile object', function(done) {

    var doc = as.profile()
      .describes('http://example.org')
      .get();

    assert(doc instanceof as.models.Profile);
    assert.equal(doc.describes.id, 'http://example.org');
    done();

  });

  it('should use the default context', function(done) {
    var test = {'@id':'urn:test', displayName: 'test'};
    as.import(test, function(err,doc) {
      assert.equal(err, undefined);
      assert.equal(doc.id, 'urn:test');
      assert.equal(doc.displayName.get(), 'test');
      done();
    });
  });
});

describe('Streaming...', function() {

  it('Should read and parse from the stream', function(done) {
    var fs = require('fs');
    var AS2Stream = as.Stream;
    var path = require('path');
    var through = require('through2');

    fs.createReadStream(path.resolve(__dirname,'test.json'))
      .pipe(new AS2Stream())
      .pipe(through.obj(function(chunk,encoding,callback) {
        assert(chunk);
        assert(chunk.type);
        assert.equal(chunk.type, vocabs.as.Person);
        assert.equal(chunk.displayName.get(), 'Sally');
        done();
      }));
  });

  it('Should write to the stream', function(done) {
    var AS2Stream = as.Stream;
    var through = require('through2');
    var obj = as.object().displayName('test').get();
    obj.stream({objectMode:true})
      .pipe(new AS2Stream())
      .pipe(through.obj(function(chunk,encoding,callback) {
        assert(chunk);
        assert(chunk.type);
        assert.equal(chunk.displayName.valueOf(), 'testing');
      }));
    done();
  });
});

describe('Templates...', function() {
  it('Should use one object as a template for another', function(done) {
    var tmpl = as.like().actor(as.person().displayName('Joe')).template();
    var like = tmpl().object('http://example.org/foo').get();
    assert(like.actor);
    assert.equal(like.actor.first.displayName.get(), 'Joe');
    assert(like.object);
    assert.equal(like.object.first.id, 'http://example.org/foo');
    assert(!tmpl.object);
    done();
  });
});

describe('Extensions...', function() {
  it('should initialize the Interval and Social Extensions', function() {
    as.use(as.interval);
    as.use(as.social);
    assert.equal(require('../src/extcontext.js').get().length, 2);
  });

  it('should create interval objects with appropriate type and values',
  function() {
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

  it('should created a signed entry and verify it', function(done) {

    var testPublicKeyUrl = 'https://example.com/i/alice/keys/1';
    var testPublicKeyPem =
      '-----BEGIN PUBLIC KEY-----\r\n' +
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4R1AmYYyE47FMZgo708NhFU+t\r\n' +
      '+VWn133PYGt/WYmD5BnKj679YiUmyrC3hX6oZfo4eVpOkycxZvGgXCLQGuDp45Xf\r\n' +
      'Zkdsjqs3o62En4YjlHWxgeGmkiRqGfZ3sJ3u5WZ2xwapdZY3/2T/oOV5ri8SktTv\r\n' +
      'mVGCyhwFuJC/NbJMEwIDAQAB\r\n' +
      '-----END PUBLIC KEY-----';
    var testPrivateKeyPem = '-----BEGIN RSA PRIVATE KEY-----\r\n' +
      'MIICWwIBAAKBgQC4R1AmYYyE47FMZgo708NhFU+t+VWn133PYGt/WYmD5BnKj679\r\n' +
      'YiUmyrC3hX6oZfo4eVpOkycxZvGgXCLQGuDp45XfZkdsjqs3o62En4YjlHWxgeGm\r\n' +
      'kiRqGfZ3sJ3u5WZ2xwapdZY3/2T/oOV5ri8SktTvmVGCyhwFuJC/NbJMEwIDAQAB\r\n' +
      'AoGAZXNdPMQXiFGSGm1S1P0QYzJIW48ZCP4p1TFP/RxeCK5bRJk1zWlq6qBMCb0E\r\n' +
      'rdD2oICupvN8cEYsYAxZXhhuGWZ60vggbqTTa+4LXB+SGCbKMX711ZoQHdY7rnaF\r\n' +
      'b/Udf4wTLD1yAslx1TrHkV56OfuJcEdWC7JWqyNXQoxedwECQQDZvcEmBT/Sol/S\r\n' +
      'AT5ZSsgXm6xCrEl4K26Vyw3M5UShRSlgk12gfqqSpdeP5Z7jdV/t5+vD89OJVfaa\r\n' +
      'Tw4h9BibAkEA2Khe03oYQzqP1V4YyV3QeC4yl5fCBr8HRyOMC4qHHKQqBp2VDUyu\r\n' +
      'RBJhTqqf1ErzUBkXseawNxtyuPmPrMSl6QJAQOgfu4W1EMT2a1OTkmqIWwE8yGMz\r\n' +
      'Q28u99gftQRjAO/s9az4K++WSUDGkU6RnpxOjEymKzNzy2ykpjsKq3RoIQJAA+XL\r\n' +
      'huxsYVE9Yy5FLeI1LORP3rBJOkvXeq0mCNMeKSK+6s2M7+dQP0NBYuPo6i3LAMbi\r\n' +
      'yT2IMAWbY76Bmi8TeQJAfdLJGwiDNIhTVYHxvDz79ANzgRAd1kPKPddJZ/w7Gfhm\r\n' +
      '8Mezti8HCizDxPb+H8HlJMSkfoHx1veWkdLaPWRFrA==\r\n' +
      '-----END RSA PRIVATE KEY-----';
    var testPublicKey = {
      '@context': 'https://w3id.org/security/v1',
      id: testPublicKeyUrl,
      type: 'CryptographicKey',
      owner: 'https://example.com/i/alice',
      publicKeyPem: testPublicKeyPem
    };
    var testPublicKeyOwner = {
      '@context': 'https://w3id.org/security/v1',
      id: 'https://example.com/i/alice',
      publicKey: [testPublicKey]
    };

    var obj = as.object().displayName('foo').get();

    var options = {
      sign: {
        privateKeyPem:testPrivateKeyPem,
        creator:testPublicKeyUrl
      }
    };

    obj.prettyWrite(options, function(err,doc) {
      assert.equal(err, undefined);
      as.verify(doc, {
        publicKey: testPublicKey,
        publicKeyOwner: testPublicKeyOwner,
      }, function(err,verified) {
        assert.equal(err, undefined);
        assert(verified);
        done();
      });
    });

  });
});
