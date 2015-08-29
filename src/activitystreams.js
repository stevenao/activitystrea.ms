'use strict';

const models        = require('./models');
const vocabs        = require('linkeddata-vocabs');
const reasoner      = require('./reasoner');
const utils         = require('./utils');
const jsonld        = require('./jsonld');
const ext_context   = require('./extcontext');
const as = vocabs.as;

exports.use = function(extension) {
  if (extension && typeof extension.init === 'function')
    extension.init(models,reasoner,ext_context);
};

exports.verify = jsonld.verify;
exports.models = models;
exports.vocabs = vocabs;
exports.import = jsonld.import;
exports.importFromRDF = jsonld.importFromRDF;

exports.object = function(types) {
  return models.Object.Builder((types || []).concat(as.Object));
};

exports.actor = function(types) {
  return models.Actor.Builder((types || []).concat(as.Actor));
};

exports.activity = function(types) {
  return models.Activity.Builder((types || []).concat(as.Activity));
};

exports.collection = function(types) {
  return models.Collection.Builder((types || []).concat(as.Collection));
};

exports.orderedCollection = function(types) {
  return models.OrderedCollection.Builder(
    (types || []).concat(as.OrderedCollection));
};

exports.collectionPage = function(types) {
  return models.CollectionPage.Builder(
    (types || []).concat(as.CollectionPage));
};

exports.orderedCollectionPage = function(types) {
  return models.OrderedCollectionPage.Builder(
    (types || []).concat(as.OrderedCollectionPage));
};

exports.content = function(types) {
  return models.Content.Builder((types || []).concat(as.Content));
};

exports.link = function(types) {
  return models.Link.Builder((types || []).concat(as.Link));
};

exports.accept = function(types) {
  return models.Activity.Builder((types || []).concat(as.Accept));
};

exports.tentativeAccept = function(types) {
  return models.Activity.Builder((types || []).concat(as.TentativeAccept));
};

exports.add = function(types) {
  return models.Activity.Builder((types || []).concat(as.Add));
};

exports.arrive = function(types) {
  return models.Activity.Builder((types || []).concat(as.Arrive));
};

exports.create = function(types) {
  return models.Activity.Builder((types || []).concat(as.Create));
};

exports.delete = function(types) {
  return models.Activity.Builder((types || []).concat(as.Delete));
};

exports.follow = function(types) {
  return models.Activity.Builder((types || []).concat(as.Follow));
};

exports.ignore = function(types) {
  return models.Activity.Builder((types || []).concat(as.Ignore));
};

exports.join = function(types) {
  return models.Activity.Builder((types || []).concat(as.Join));
};

exports.leave = function(types) {
  return models.Activity.Builder((types || []).concat(as.Leave));
};

exports.like = function(types) {
  return models.Activity.Builder((types || []).concat(as.Like));
};

exports.offer = function(types) {
  return models.Activity.Builder((types || []).concat(as.Offer));
};

exports.invite = function(types) {
  return models.Activity.Builder((types || []).concat(as.Invite));
};

exports.reject = function(types) {
  return models.Activity.Builder((types || []).concat(as.Reject));
};

exports.tentativeReject = function(types) {
  return models.Activity.Builder((types || []).concat(as.TentativeReject));
};

exports.remove = function(types) {
  return models.Activity.Builder((types || []).concat(as.Remove));
};

exports.undo = function(types) {
  return models.Activity.Builder((types || []).concat(as.Undo));
};

exports.update = function(types) {
  return models.Activity.Builder((types || []).concat(as.Update));
};

exports.experience = function(types) {
  return models.Activity.Builder((types || []).concat(as.Experience));
};

exports.view = function(types) {
  return models.Activity.Builder((types || []).concat(as.View));
};

exports.listen = function(types) {
  return models.Activity.Builder((types || []).concat(as.Listen));
};

exports.read = function(types) {
  return models.Activity.Builder((types || []).concat(as.Read));
};

exports.move = function(types) {
  return models.Activity.Builder((types || []).concat(as.Move));
};

exports.travel = function(types) {
  return models.Activity.Builder((types || []).concat(as.Travel));
};

exports.announce = function(types) {
  return models.Activity.Builder((types || []).concat(as.Announce));
};

exports.block = function(types) {
  return models.Activity.Builder((types || []).concat(as.Block));
};

exports.flag = function(types) {
  return models.Activity.Builder((types || []).concat(as.Flag));
};

exports.dislike = function(types) {
  return models.Activity.Builder((types || []).concat(as.Dislike));
};

exports.application = function(types) {
  return models.Actor.Builder((types || []).concat(as.Application));
};

exports.group = function(types) {
  return models.Actor.Builder((types || []).concat(as.Group));
};

exports.person = function(types) {
  return models.Actor.Builder((types || []).concat(as.Person));
};

exports.process = function(types) {
  return models.Actor.Builder((types || []).concat(as.Process));
};

exports.service = function(types) {
  return models.Actor.Builder((types || []).concat(as.Service));
};

exports.organization = function(types) {
  return models.Actor.Builder((types || []).concat(as.Organization));
};

exports.article = function(types) {
  return models.Content.Builder((types || []).concat(as.Article));
};

exports.album = function(types) {
  return models.Collection.Builder((types || []).concat(as.Album));
};

exports.folder = function(types) {
  return models.Collection.Builder((types || []).concat(as.Folder));
};

exports.story = function(types) {
  return models.OrderedCollection.Builder((types || []).concat(as.Story));
};

exports.document = function(types) {
  return models.Content.Builder((types || []).concat(as.Document));
};

exports.audio = function(types) {
  return models.Content.Builder((types || []).concat(as.Audio));
};

exports.image = function(types) {
  return models.Content.Builder((types || []).concat(as.Image));
};

exports.video = function(types) {
  return models.Content.Builder((types || []).concat(as.Video));
};

exports.note = function(types) {
  return models.Content.Builder((types || []).concat(as.Note));
};

exports.page = function(types) {
  return models.Content.Builder((types || []).concat(as.Page));
};

exports.question = function(types) {
  return models.Question.Builder((types || []).concat(as.Question));
};

exports.event = function(types) {
  return models.Object.Builder((types || []).concat(as.Event));
};

exports.relationship = function(types) {
  return models.Relationship.Builder((types || []).concat(as.Relationship));
};

exports.profile = function(types) {
  return models.Profile.Builder((types || []).concat(as.Profile));
};

exports.place = function(types) {
  return models.Place.Builder((types || []).concat(as.Place));
};

exports.mention = function(types) {
  return models.Link.Builder((types || []).concat(as.Mention));
};

utils.define(exports,'interval',function() {
  return require('./interval');
});
utils.define(exports,'social',function() {
  return require('./social');
});
utils.define(exports,'Stream',function() {
  return require('./stream');
});
utils.define(exports,'Middleware',function() {
  return require('./middle');
});
utils.define(exports,'Dust',function() {
  return require('./dust');
});

utils.define(exports,'mediaType','application/activity+json');
