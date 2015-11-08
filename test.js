'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var assertFs = require('./');
assertFs(assert);
var a, b;

describe('assert-fs', function () {
  it('should export a function', function () {
    assert.equal(typeof assertFs, 'function');
  });

  it('should return a function', function () {
    assert.equal(typeof assertFs(assert), 'function');
  });

  it('should decorate methods onto assert', function () {
    assert.equal(typeof assert.exists, 'function');
    assert.equal(typeof assert.existsSync, 'function');
  });

  it('should throw an error when invalid args are passed', function (cb) {
    try {
      assertFs();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected assert as the first argument');
      cb();
    }
  });
});

describe('strict comparison', function () {
  var assertFs = require('./');

  beforeEach(function() {
    assertFs(assert);
  });

  describe('assert.exists', function () {
    it('should throw an error if a callback is not passed', function (cb) {
      try {
        assert.exists();
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert.equal(err.message, 'expected a callback function');
        cb();
      }
    });

    it('should throw an error if filepath is not a string', function (cb) {
      assert.exists(null, function(err) {
        assert(err);
        assert.equal(err.message, 'expected filepath to be a string');
        cb();
      });
    });

    it('should return true if a filepath exists', function (cb) {
      assert.exists('index.js', function(err) {
        assert(!err);
        cb();
      });
    });

    it('should throw an error if a filepath does not exist', function (cb) {
      assert.exists('fooo.js', function(err) {
        assert(err);
        cb();
      });
    });
  });

  describe('assert.existsSync', function () {
    it('should throw an error if filepath is not a string', function (cb) {
      try {
        assert.existsSync();
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert.equal(err.message, 'expected filepath to be a string');
        cb();
      }
    });

    it('should return true if a filepath existsSync', function (cb) {
      try {
        assert.existsSync('index.js');
        cb();
      } catch (err) {
        cb(err);
      }
    });

    it('should throw an error if a filepath does not exist', function (cb) {
      try {
        assert.existsSync('fooo.js');
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        cb();
      }
    });
  });
});
