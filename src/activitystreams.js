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

function define(type,base,types) {
  return type.Builder((types || []).concat([base]));
}

exports.object = define.bind(this,models.Object,as.Object);
exports.actor = define.bind(this,models.Actor,as.Actor);
exports.activity = define.bind(this,models.Activity,as.Activity);
exports.collection = define.bind(this,models.Collection,as.Collection);
exports.orderedCollection = define.bind(this,
  models.OrderedCollection, as.OrderedCollection);
exports.content = define.bind(this,models.Content,as.Content);
exports.link = define.bind(this,models.Link, as.Link);
exports.accept = define.bind(this,models.Activity, as.Accept);
exports.tentativeAccept = define.bind(this,models.Activity,as.TentativeAccept);
exports.add = define.bind(this,models.Activity, as.Add);
exports.arrive = define.bind(this,models.Activity, as.Arrive);
exports.create = define.bind(this,models.Activity, as.Create);
exports.delete = define.bind(this,models.Activity, as.Delete);
exports.follow = define.bind(this,models.Activity, as.Follow);
exports.ignore = define.bind(this,models.Activity, as.Ignore);
exports.join = define.bind(this,models.Activity, as.Join);
exports.leave = define.bind(this,models.Activity, as.Leave);
exports.like = define.bind(this,models.Activity, as.Like);
exports.offer = define.bind(this,models.Activity, as.Offer);
exports.invite = define.bind(this,models.Activity, as.Invite);
exports.reject = define.bind(this,models.Activity, as.Reject);
exports.tentativeReject = define.bind(this,models.Activity, as.TentativeReject);
exports.remove = define.bind(this,models.Activity, as.Remove);
exports.undo = define.bind(this,models.Activity, as.Undo);
exports.update = define.bind(this,models.Activity, as.Update);
exports.experience = define.bind(this,models.Activity, as.Experience);
exports.view = define.bind(this,models.Activity, as.View);
exports.listen = define.bind(this,models.Activity, as.Listen);
exports.read = define.bind(this,models.Activity, as.Read);
exports.move = define.bind(this,models.Activity, as.Move);
exports.travel = define.bind(this,models.Activity, as.Travel);
exports.announce = define.bind(this,models.Activity, as.Announce);
exports.block = define.bind(this,models.Activity, as.Block);
exports.flag = define.bind(this,models.Activity, as.Flag);
exports.dislike = define.bind(this,models.Activity, as.Dislike);
exports.application = define.bind(this,models.Actor, as.Application);
exports.group = define.bind(this,models.Actor, as.Group);
exports.person = define.bind(this,models.Actor, as.Person);
exports.process = define.bind(this,models.Actor, as.Process);
exports.service = define.bind(this,models.Actor, as.Service);
exports.organization = define.bind(this,models.Actor, as.Organization);
exports.article = define.bind(this,models.Content, as.Article);
exports.album = define.bind(this,models.Collection, as.Album);
exports.folder = define.bind(this,models.Collection, as.Folder);
exports.story = define.bind(this,models.OrderedCollection, as.Story);
exports.document = define.bind(this,models.Content, as.Document);
exports.audio = define.bind(this,models.Content, as.Audio);
exports.image = define.bind(this,models.Content, as.Image);
exports.video = define.bind(this,models.Content, as.Video);
exports.note = define.bind(this,models.Content, as.Note);
exports.page = define.bind(this,models.Content, as.Page);
exports.question = define.bind(this,models.Question, as.Question);
exports.event = define.bind(this,models.Object, as.Event);
exports.relationship = define.bind(this,models.Relationship, as.Relationship);
exports.profile = define.bind(this,models.Profile, as.Profile);
exports.place = define.bind(this,models.Place, as.Place);
exports.mention = define.bind(this,models.Link, as.Mention);

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
