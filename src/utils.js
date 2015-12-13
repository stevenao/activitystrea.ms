'use strict';

const url = require('url');
const moment = require('moment');
const xsd = require('vocabs-xsd');
const _toString = {}.toString;

module.exports = exports = {
  throwif(condition, message) {
    if (condition) throw Error(message);
  },

  range(min, max, val) {
    return Math.min(max, Math.max(min, val));
  },

  define(target, key, accessor, writable) {
    let def = {
      configurable: false,
      enumerable: true
    };
    if (typeof accessor === 'function')
      def.get = accessor;
    else
      def.value = accessor;
    if (writable === true)
      def.writable = true;
    Object.defineProperty(target, key, def);
  },

  is_primitive(val) {
    return val === null ||
           val === undefined ||
           exports.is_string(val) ||
           !isNaN(val) ||
           exports.is_boolean(val);
  },

  is_string(val) {
    return typeof val === 'string' ||
           val instanceof String ||
           _toString.apply(val) === '[object String]';
  },

  is_boolean(val) {
    return typeof val === 'boolean' ||
           val instanceof Boolean ||
           _toString.apply(val) === '[object Boolean]';
  },

  is_date(val) {
    return val instanceof Date ||
           _toString.apply(val) === '[object Date]' ||
           moment.isMoment(val);
  },

  is_integer(val) {
    return !isNaN(val) &&
      isFinite(val) &&
      val > -9007199254740992 &&
      val < 9007199254740992 &&
      Math.floor(val) === val;
  },

  parsed_url(val) {
    try {
      return url.parse(val).href;
    } catch(err) {
      throw Error('Value must be a valid URL');
    }
  },

  set_date_val(key, val) {
    exports.throwif(!exports.is_date(val), `${key} must be a date`);
    let fmt = moment.isMoment(val) ? val.format() : val.toISOString();
    this.set(key, fmt,{type:xsd.dateTime});
  },

  set_ranged_val(key, val, min, max, type) {
    exports.throwif(isNaN(val), `${key} must be a number`);
    if (!isFinite(val)) return;
    this.set(key, exports.range(min, max, val), {type: type});
  },

  set_non_negative_int(key, val) {
    exports.throwif(isNaN(val), `${key} must be a number`);
    if (!isFinite(val)) return;
    this.set(key,
      exports.range(0, Infinity, Math.floor(val)),
      {type: xsd.nonNegativeInteger});
  },

  set_duration_val(key, val) {
    exports.throwif(
      isNaN(val) &&
      !exports.is_string(val) &&
      typeof val.humanize === 'undefined',
      `${key} must be a number or a string`);
    val = !isNaN(val) ?
      moment.duration(val * 1000).toString() :
      val.toString();
    this.set(key, val, {type: xsd.duration});
  }
};
