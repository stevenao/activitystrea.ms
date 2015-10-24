'use strict';

const vocabs = require('linkeddata-vocabs');
const reasoner = require('./reasoner');
const jsonld = require('./jsonld');
const ext_context = require('./extcontext');
const as = vocabs.as;

function _types(types, additional) {
  types = types || [];
  if (!Array.isArray(types))
    types = [types];
  if (additional) {
    if (!Array.isArray(additional))
      additional = [additional];
    types = types.concat(additional);
  }
  return types;
}

module.exports = {
  use(extension) {
    if (extension && typeof extension.init === 'function')
      extension.init(module.exports.models, reasoner, ext_context);
  },

  get verify() {
    return jsonld.verify;
  },

  get models() {
    return require('./models');
  },

  get vocabs() {
    return vocabs;
  },

  get import() {
    return jsonld.import;
  },

  get importFromRDF() {
    return jsonld.importFromRDF;
  },

  langmap() {
    return new module.exports.models.LanguageValue.Builder();
  },

  object(types) {
    return new module.exports.models.Object.Builder(_types(types));
  },

  actor(types) {
    return new module.exports.models.Actor.Builder(_types(types));
  },

  activity(types) {
    return new module.exports.models.Activity.Builder(_types(types));
  },

  collection(types) {
    return new module.exports.models.Collection.Builder(_types(types));
  },

  orderedCollection(types) {
    return new module.exports.models.OrderedCollection.Builder(_types(types));
  },

  collectionPage(types) {
    return new module.exports.models.CollectionPage.Builder(_types(types));
  },

  orderedCollectionPage(types) {
    return new module.exports.models.OrderedCollectionPage.Builder(_types(types));
  },

  content(types) {
    return new module.exports.models.Content.Builder(_types(types));
  },

  link(types) {
    return new module.exports.models.Link.Builder(_types(types));
  },

  accept(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Accept));
  },

  tentativeAccept(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.TentativeAccept));
  },

  add(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Add));
  },

  arrive(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Arrive));
  },

  create(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Create));
  },

  delete(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Delete));
  },

  follow(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Follow));
  },

  ignore(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Ignore));
  },

  join(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Join));
  },

  leave(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Leave));
  },

  like(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Like));
  },

  offer(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Offer));
  },

  invite(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Invite));
  },

  reject(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Reject));
  },

  tentativeReject(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.TentativeReject));
  },

  remove(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Remove));
  },

  undo(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Undo));
  },

  update(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Update));
  },

  experience(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Experience));
  },

  view(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.View));
  },

  listen(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Listen));
  },

  read(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Read));
  },

  move(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Move));
  },

  travel(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Travel));
  },

  announce(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Announce));
  },

  block(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Block));
  },

  flag(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Flag));
  },

  dislike(types) {
    return new module.exports.models.Activity.Builder(_types(types,as.Dislike));
  },

  application(types) {
    return new module.exports.models.Actor.Builder(_types(types,as.Application));
  },

  group(types) {
    return new module.exports.models.Actor.Builder(_types(types,as.Group));
  },

  person(types) {
    return new module.exports.models.Actor.Builder(_types(types,as.Person));
  },

  process(types) {
    return new module.exports.models.Actor.Builder(_types(types,as.Process));
  },

  service(types) {
    return new module.exports.models.Actor.Builder(_types(types,as.Service));
  },

  organization(types) {
    return new module.exports.models.Actor.Builder(_types(types,as.Organization));
  },

  article(types) {
    return new module.exports.models.Content.Builder(_types(types,as.Article));
  },

  album(types) {
    return new module.exports.models.Collection.Builder(_types(types,as.Album));
  },

  folder(types) {
    return new module.exports.models.Collection.Builder(_types(types,as.Folder));
  },

  story(types) {
    return new module.exports.models.OrderedCollection.Builder(_types(types,as.Story));
  },

  document(types) {
    return new module.exports.models.Content.Builder(_types(types,as.Document));
  },

  audio(types) {
    return new module.exports.models.Content.Builder(_types(types,as.Audio));
  },

  image(types) {
    return new module.exports.models.Content.Builder(_types(types,as.Image));
  },

  video(types) {
    return new module.exports.models.Content.Builder(_types(types,as.Video));
  },

  note(types) {
    return new module.exports.models.Content.Builder(_types(types,as.Note));
  },

  page(types) {
    return new module.exports.models.Content.Builder(_types(types,as.Page));
  },

  question(types) {
    return new module.exports.models.Question.Builder(_types(types));
  },

  event(types) {
    return new module.exports.models.Object.Builder(_types(types,as.Event));
  },

  relationship(types) {
    return new module.exports.models.Relationship.Builder(_types(types));
  },

  profile(types) {
    return new module.exports.models.Profile.Builder(_types(types));
  },

  place(types) {
    return new module.exports.models.Place.Builder(_types(types));
  },

  mention(types) {
    return new module.exports.models.Link.Builder(_types(types,as.Mention));
  },

  get interval() {
    return require('./interval');
  },

  get social() {
    return require('./social');
  },

  get Stream() {
    return require('./stream');
  },

  get Middleware() {
    return require('./middle');
  },

  get Dust() {
    return require('./dust');
  },

  get mediaType() {
    return 'application/activity+json';
  }
};
