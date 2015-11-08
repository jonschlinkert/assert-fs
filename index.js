/*!
 * assert-fs <https://github.com/jonschlinkert/assert-fs>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function assertFs(assert, options) {
  if (typeof assert === 'undefined') {
    throw new Error('expected assert as the first argument');
  }

  options = options || {};

  assert.exists = function(fp, cb) {
    if (typeof cb !== 'function') {
      throw new Error('expected a callback function');
    }
    if (fp == null) {
      return cb(new Error('expected filepath to be a string'));
    }
    // might be better to use `fs.stat` for these
    fs.exists(path.resolve(fp), function(exists) {
      if (!exists) {
        cb(new Error('filepath: "' + fp + '" does not exist.'));
        return;
      }
      cb();
    });
  };

  assert.existsSync = function(fp) {
    if (fp == null) {
      throw new Error('expected filepath to be a string');
    }
    var exists = fs.existsSync(path.resolve(fp));
    if (!exists) {
      throw new Error('filepath: "' + fp + '" does not exist.');
    }
  };
  return assert;
};
