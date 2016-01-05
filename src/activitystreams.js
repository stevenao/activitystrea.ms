'use strict';

const reasoner = require('./reasoner');
const jsonld = require('./jsonld');
const ext_context = require('./extcontext');
const as = require('vocabs-as');
const models = require('./models');

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
    return models;
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
    return new models.Object.Builder(
      _types(types), undefined, environment);
  },

  activity(types, environment) {
    return exports.object(_types(types, as.Activity), environment);
  },

  collection(types, environment) {
    return exports.object(_types(types, as.Collection), environment);
  },

  orderedCollection(types, environment) {
    return exports.object(_types(types, as.OrderedCollection), environment);
  },

  collectionPage(types, environment) {
    return exports.object(_types(types, as.CollectionPage), environment);
  },

  orderedCollectionPage(types, environment) {
    return exports.object(_types(types, as.OrderedCollectionPage), environment);
  },

  link(types, environment) {
    return new exports.models.Link.Builder(
      _types(types), undefined, environment);
  },

  accept(types, environment) {
    return exports.object(_types(types, as.Accept), environment);
  },

  tentativeAccept(types, environment) {
    return exports.object(_types(types, as.TentativeAccept), environment);
  },

  add(types, environment) {
    return exports.object(_types(types, as.Add), environment);
  },

  arrive(types, environment) {
    return exports.object(_types(types, as.Arrive), environment);
  },

  create(types, environment) {
    return exports.object(_types(types, as.Create), environment);
  },

  delete(types, environment) {
    return exports.object(_types(types, as.Delete), environment);
  },

  follow(types, environment) {
    return exports.object(_types(types, as.Follow), environment);
  },

  ignore(types, environment) {
    return exports.object(_types(types, as.Ignore), environment);
  },

  join(types, environment) {
    return exports.object(_types(types, as.Join), environment);
  },

  leave(types, environment) {
    return exports.object(_types(types, as.Leave), environment);
  },

  like(types, environment) {
    return exports.object(_types(types, as.Like), environment);
  },

  offer(types, environment) {
    return exports.object(_types(types, as.Offer), environment);
  },

  invite(types, environment) {
    return exports.object(_types(types, as.Invite), environment);
  },

  reject(types, environment) {
    return exports.object(_types(types, as.Reject), environment);
  },

  tentativeReject(types, environment) {
    return exports.object(_types(types, as.TentativeReject), environment);
  },

  remove(types, environment) {
    return exports.object(_types(types, as.Remove), environment);
  },

  undo(types, environment) {
    return exports.object(_types(types, as.Undo), environment);
  },

  update(types, environment) {
    return exports.object(_types(types, as.Update), environment);
  },

  view(types, environment) {
    return exports.object(_types(types, as.View), environment);
  },

  listen(types, environment) {
    return exports.object(_types(types, as.Listen), environment);
  },

  read(types, environment) {
    return exports.object(_types(types, as.Read), environment);
  },

  move(types, environment) {
    return exports.object(_types(types, as.Move), environment);
  },

  travel(types, environment) {
    return exports.object(_types(types, as.Travel), environment);
  },

  announce(types, environment) {
    return exports.object(_types(types, as.Announce), environment);
  },

  block(types, environment) {
    return exports.object(_types(types, as.Block), environment);
  },

  flag(types, environment) {
    return exports.object(_types(types, as.Flag), environment);
  },

  dislike(types, environment) {
    return exports.object(_types(types, as.Dislike), environment);
  },

  application(types, environment) {
    return exports.object(_types(types, as.Application), environment);
  },

  group(types, environment) {
    return exports.object(_types(types, as.Group), environment);
  },

  person(types, environment) {
    return exports.object(_types(types, as.Person), environment);
  },

  service(types, environment) {
    return exports.object(_types(types, as.Service), environment);
  },

  organization(types, environment) {
    return exports.object(_types(types, as.Organization), environment);
  },

  article(types, environment) {
    return exports.object(_types(types, as.Article), environment);
  },

  document(types, environment) {
    return exports.object(_types(types, as.Document), environment);
  },

  audio(types, environment) {
    return exports.object(_types(types, as.Audio), environment);
  },

  image(types, environment) {
    return exports.object(_types(types, as.Image), environment);
  },

  video(types, environment) {
    return exports.object(_types(types, as.Video), environment);
  },

  note(types, environment) {
    return exports.object(_types(types, as.Note), environment);
  },

  page(types, environment) {
    return exports.object(_types(types, as.Page), environment);
  },

  question(types, environment) {
    return exports.object(_types(types, as.Question), environment);
  },

  event(types, environment) {
    return exports.object(_types(types, as.Event), environment);
  },

  relationship(types, environment) {
    return exports.object(_types(types, as.Relationship), environment);
  },

  profile(types, environment) {
    return exports.object(_types(types, as.Profile), environment);
  },

  place(types, environment) {
    return exports.object(_types(types, as.Place), environment);
  },

  mention(types, environment) {
    return exports.link(_types(types, as.Mention), environment);
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

  get mediaType() {
    return 'application/activity+json';
  }
};
