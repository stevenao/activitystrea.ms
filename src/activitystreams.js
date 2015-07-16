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
var merge_types   = utils.merge_types;
var ext_context   = require('./extcontext');

exports.models = models;

exports.vocabs = vocabs;

exports.use = function(extension) {
  if (extension && typeof extension.init === 'function')
    extension.init(models,reasoner,ext_context);
};

exports.import = function(input, callback) {
  jsonld.import(input, callback);
};

function define(def) {
  this[def[0]] = function(types) {
    if (def[2]) {
      return models[def[1]].Builder(
        merge_types(reasoner, def[2], types));
    } else {
      return models[def[1]].Builder(types);
    }
  };
}

[
  ['object', 'Object'],
  ['actor', 'Actor'],
  ['activity', 'Activity'],
  ['collection', 'Collection'],
  ['orderedCollection', 'OrderedCollection'],
  ['content', 'Content'],
  ['link', 'Link'],
  ['accept', 'Activity', vocabs.as.Accept],
  ['tentativeAccept', 'Activity', vocabs.as.TentativeAccept],
  ['add', 'Activity', vocabs.as.Add],
  ['arrive', 'Activity', vocabs.as.Arrive],
  ['create', 'Activity', vocabs.as.Create],
  ['delete', 'Activity', vocabs.as.Delete],
  ['favorite', 'Activity', vocabs.as.Favorite],
  ['follow', 'Activity', vocabs.as.Follow],
  ['ignore', 'Activity', vocabs.as.Ignore],
  ['join', 'Activity', vocabs.as.Join],
  ['leave', 'Activity', vocabs.as.Leave],
  ['like', 'Activity', vocabs.as.Like],
  ['offer', 'Activity', vocabs.as.Offer],
  ['invite', 'Activity', vocabs.as.Invite],
  ['reject', 'Activity', vocabs.as.Reject],
  ['tentativeReject', 'Activity', vocabs.as.TentativeReject],
  ['remove', 'Activity', vocabs.as.Remove],
  ['undo', 'Activity', vocabs.as.Undo],
  ['update', 'Activity', vocabs.as.Update],
  ['experience', 'Activity', vocabs.as.Experience],
  ['view', 'Activity', vocabs.as.View],
  ['listen', 'Activity', vocabs.as.Listen],
  ['read', 'Activity', vocabs.as.Read],
  ['move', 'Activity', vocabs.as.Move],
  ['travel', 'Activity', vocabs.as.Travel],
  ['announce', 'Activity', vocabs.as.Announce],
  ['block', 'Activity', vocabs.as.Block],
  ['flag', 'Activity', vocabs.as.Flag],
  ['dislike', 'Activity', vocabs.as.Dislike],
  ['application', 'Actor', vocabs.as.Application],
  ['group', 'Actor', vocabs.as.Group],
  ['person', 'Actor', vocabs.as.Person],
  ['process', 'Actor', vocabs.as.Process],
  ['service', 'Actor', vocabs.as.Service],
  ['article', 'Content', vocabs.as.Article],
  ['album', 'Collection', vocabs.as.Album],
  ['folder', 'Collection', vocabs.as.Folder],
  ['story', 'OrderedCollection', vocabs.as.Story],
  ['document', 'Content', vocabs.as.Document],
  ['audio', 'Content', vocabs.as.Audio],
  ['image', 'Content', vocabs.as.Image],
  ['video', 'Content', vocabs.as.Video],
  ['note', 'Content', vocabs.as.Note],
  ['page', 'Content', vocabs.as.Page],
  ['question', 'Question'],
  ['event', 'Object', vocabs.as.Event],
  ['relationship', 'Relationship'],
  ['profile', 'Profile'],
  ['place', 'Place'],
  ['mention', 'Link', vocabs.as.Mention],
].forEach(define.bind(exports));

exports.interval = require('./interval');
exports.social = require('./social');
