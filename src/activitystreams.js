/**
 * Copyright 2013 OpenSocial Foundation
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

var models        = require('./models');
var vocabs        = require('linkeddata-vocabs');
var reasoner      = require('./reasoner');
var utils         = require('./utils');
var jsonld        = require('./jsonld');
var ext_context   = require('./extcontext');
var merge_types   = utils.merge_types;
var as = vocabs.as;

exports.verify = jsonld.verify;
exports.models = models;
exports.vocabs = vocabs;

exports.use = function(extension) {
  if (extension && typeof extension.init === 'function')
    extension.init(models,reasoner,ext_context);
};

exports.import = jsonld.import;

exports.importFromRDF = jsonld.importFromRDF;

function define(type,sub,types) {
  if (sub !== undefined) {
    return models[type].Builder(
      merge_types(reasoner, sub, types));
  } else {
    return models[type].Builder(types);
  }
}

exports.object = define.bind(this,'Object',undefined);
exports.actor = define.bind(this,'Actor',undefined);
exports.activity = define.bind(this,'Activity',undefined);
exports.collection = define.bind(this,'Collection',undefined);
exports.orderedCollection = define.bind(this,'OrderedCollection',undefined);
exports.content = define.bind(this,'Content',undefined);
exports.link = define.bind(this,'Link',undefined);
exports.accept = define.bind(this,'Activity',as.Accept);
exports.tentativeAccept = define.bind(this,'Activity',as.TentativeAccept);
exports.add = define.bind(this,'Activity',as.Add);
exports.arrive = define.bind(this,'Activity',as.Arrive);
exports.create = define.bind(this,'Activity',as.Create);
exports.delete = define.bind(this,'Activity',as.Delete);
exports.follow = define.bind(this,'Activity',as.Follow);
exports.ignore = define.bind(this,'Activity',as.Ignore);
exports.join = define.bind(this,'Activity',as.Join);
exports.leave = define.bind(this,'Activity',as.Leave);
exports.like = define.bind(this,'Activity',as.Like);
exports.offer = define.bind(this,'Activity',as.Offer);
exports.invite = define.bind(this,'Activity',as.Invite);
exports.reject = define.bind(this,'Activity',as.Reject);
exports.tentativeReject = define.bind(this,'Activity',as.TentativeReject);
exports.remove = define.bind(this,'Activity',as.Remove);
exports.undo = define.bind(this,'Activity',as.Undo);
exports.update = define.bind(this,'Activity',as.Update);
exports.experience = define.bind(this,'Activity',as.Experience);
exports.view = define.bind(this,'Activity',as.View);
exports.listen = define.bind(this,'Activity',as.Listen);
exports.read = define.bind(this,'Activity',as.Read);
exports.move = define.bind(this,'Activity',as.Move);
exports.travel = define.bind(this,'Activity',as.Travel);
exports.announce = define.bind(this,'Activity',as.Announce);
exports.block = define.bind(this,'Activity',as.Block);
exports.flag = define.bind(this,'Activity',as.Flag);
exports.dislike = define.bind(this,'Activity',as.Dislike);
exports.application = define.bind(this,'Actor',as.Application);
exports.group = define.bind(this,'Actor',as.Group);
exports.person = define.bind(this,'Actor',as.Person);
exports.process = define.bind(this,'Actor',as.Process);
exports.service = define.bind(this,'Actor',as.Service);
exports.organization = define.bind(this,'Actor',as.Organization);
exports.article = define.bind(this,'Content',as.Article);
exports.album = define.bind(this,'Collection',as.Album);
exports.folder = define.bind(this,'Collection',as.Folder);
exports.story = define.bind(this,'OrderedCollection',as.Story);
exports.document = define.bind(this,'Content',as.Document);
exports.audio = define.bind(this,'Content',as.Audio);
exports.image = define.bind(this,'Content',as.Image);
exports.video = define.bind(this,'Content',as.Video);
exports.note = define.bind(this,'Content',as.Note);
exports.page = define.bind(this,'Content',as.Page);
exports.question = define.bind(this,'Question',undefined);
exports.event = define.bind(this,'Object',as.Event);
exports.relationship = define.bind(this,'Relationship',undefined);
exports.profile = define.bind(this,'Profile',undefined);
exports.place = define.bind(this,'Place',undefined);
exports.mention = define.bind(this,'Link',as.Mention);

utils.define(exports,'interval',function() {
  return require('./interval');
});
utils.define(exports,'social',function() {
  return require('./social');
});
