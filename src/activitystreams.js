'use strict';

const reasoner = require('./reasoner');
const jsonld = require('./jsonld');
const ext_context = require('./extcontext');
const as = require('vocabs-as');

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

module.exports = exports = {
  use(extension) {
    if (extension && typeof extension.init === 'function')
      extension.init(exports.models, reasoner, ext_context);
  },

  get verify() {
    return jsonld.verify;
  },

  get models() {
    return require('./models');
  },

  get import() {
    return jsonld.import;
  },

  get importFromRDF() {
    return jsonld.importFromRDF;
  },

  langmap() {
    return new exports.models.LanguageValue.Builder();
  },

  object(types, environment) {
    return new exports.models.Object.Builder(
      _types(types), undefined, environment);
  },

  actor(types, environment) {
    return new exports.models.Actor.Builder(
      _types(types), undefined, environment);
  },

  activity(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types), undefined, environment);
  },

  collection(types, environment) {
    return new exports.models.Collection.Builder(
      _types(types), undefined, environment);
  },

  orderedCollection(types, environment) {
    return new exports.models.OrderedCollection.Builder(
      _types(types), undefined, environment);
  },

  collectionPage(types, environment) {
    return new exports.models.CollectionPage.Builder(
      _types(types), undefined, environment);
  },

  orderedCollectionPage(types, environment) {
    return new exports.models.OrderedCollectionPage.Builder(
      _types(types), undefined, environment);
  },

  link(types, environment) {
    return new exports.models.Link.Builder(
      _types(types), undefined, environment);
  },

  accept(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Accept), undefined, environment);
  },

  tentativeAccept(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.TentativeAccept), undefined, environment);
  },

  add(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Add), undefined, environment);
  },

  arrive(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Arrive), undefined, environment);
  },

  create(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Create), undefined, environment);
  },

  delete(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Delete), undefined, environment);
  },

  follow(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Follow), undefined, environment);
  },

  ignore(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Ignore), undefined, environment);
  },

  join(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Join), undefined, environment);
  },

  leave(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Leave), undefined, environment);
  },

  like(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Like), undefined, environment);
  },

  offer(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Offer), undefined, environment);
  },

  invite(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Invite), undefined, environment);
  },

  reject(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Reject), undefined, environment);
  },

  tentativeReject(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.TentativeReject), undefined, environment);
  },

  remove(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Remove), undefined, environment);
  },

  undo(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Undo), undefined, environment);
  },

  update(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Update), undefined, environment);
  },

  view(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.View), undefined, environment);
  },

  listen(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Listen), undefined, environment);
  },

  read(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Read), undefined, environment);
  },

  move(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Move), undefined, environment);
  },

  travel(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Travel), undefined, environment);
  },

  announce(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Announce), undefined, environment);
  },

  block(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Block), undefined, environment);
  },

  flag(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Flag), undefined, environment);
  },

  dislike(types, environment) {
    return new exports.models.Activity.Builder(
      _types(types,as.Dislike), undefined, environment);
  },

  application(types, environment) {
    return new exports.models.Actor.Builder(
      _types(types,as.Application), undefined, environment);
  },

  group(types, environment) {
    return new exports.models.Actor.Builder(
      _types(types,as.Group), undefined, environment);
  },

  person(types, environment) {
    return new exports.models.Actor.Builder(
      _types(types,as.Person), undefined, environment);
  },

  service(types, environment) {
    return new exports.models.Actor.Builder(
      _types(types,as.Service), undefined, environment);
  },

  organization(types, environment) {
    return new exports.models.Actor.Builder(
      _types(types,as.Organization), undefined, environment);
  },

  article(types, environment) {
    return new exports.models.Object.Builder(
      _types(types,as.Article), undefined, environment);
  },

  document(types, environment) {
    return new exports.models.Object.Builder(
      _types(types,as.Document), undefined, environment);
  },

  audio(types, environment) {
    return new exports.models.Object.Builder(
      _types(types,as.Audio), undefined, environment);
  },

  image(types, environment) {
    return new exports.models.Object.Builder(
      _types(types,as.Image), undefined, environment);
  },

  video(types, environment) {
    return new exports.models.Object.Builder(
      _types(types,as.Video), undefined, environment);
  },

  note(types, environment) {
    return new exports.models.Object.Builder(
      _types(types,as.Note), undefined, environment);
  },

  page(types, environment) {
    return new exports.models.Object.Builder(
      _types(types,as.Page), undefined, environment);
  },

  question(types, environment) {
    return new exports.models.Question.Builder(
      _types(types), undefined, environment);
  },

  event(types, environment) {
    return new exports.models.Object.Builder(
      _types(types,as.Event), undefined, environment);
  },

  relationship(types, environment) {
    return new exports.models.Relationship.Builder(
      _types(types), undefined, environment);
  },

  profile(types, environment) {
    return new exports.models.Profile.Builder(
      _types(types), undefined, environment);
  },

  place(types, environment) {
    return new exports.models.Place.Builder(
      _types(types), undefined, environment);
  },

  mention(types, environment) {
    return new exports.models.Link.Builder(
      _types(types,as.Mention), undefined, environment);
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
