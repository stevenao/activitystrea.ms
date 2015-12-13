'use strict';

const as = require('vocabs-as');
const Loader = require('./contextloader');
const _input = Symbol('input');
const _origcontext = Symbol('originalContext');
const _defcontext = Symbol('defaultContext');
const _loader = Symbol('loader');

var default_context = [as.ns];

class Environment {
  constructor(input) {
    this[_input] = input;
    this[_origcontext] = input ? input['@context'] : undefined;
    this[_defcontext] = [].concat(default_context);
    this[_loader] = Loader.defaultInstance;
  }
  
  get input() {
    return this[_input];
  }
  
  get originalContext() {
    return this[_origcontext];
  }
  
  get loader() {
    return this[_loader];
  }
  
  set loader(loader) {
    if (!(loader instanceof Loader))
      throw new TypeError('value must be an instance of Loader');
    this[_loader] = loader;
  }
  
  addAssumedContext() {
    let contexts = Array.prototype.slice.call(arguments);
    if (contexts.length > 0)
      this[_defcontext] = contexts.concat(this[_defcontext]);
    return this;
  }
  
  setAssumedContext() {
    let contexts = Array.prototype.slice.call(arguments);
    if (contexts.indexOf(as.ns) < 0)
      contexts.push(as.ns);
    this[_defcontext] = contexts;
    return this;
  }
  
  applyAssumedContext(input) {
    if (!input['@context'])
      input['@context'] = this[_defcontext];
  }
}

Object.defineProperty(Environment, 'environment', {
  configurable: false,
  enumerable: true,
  value: Symbol('environment')
});

Environment.addDefaultAssumedContext = function() {
  let contexts = Array.prototype.slice.call(arguments);
  if (contexts.length > 0) {
    for (let context of contexts)
      default_context.unshift(context);
  }
};

Environment.setDefaultAssumedContext = function() {
  let contexts = Array.prototype.slice.call(arguments);
  if (contexts.indexOf(as.ns) < 0)
    contexts.push(as.ns);
  default_context = contexts;
};

module.exports = Environment;
