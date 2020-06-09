var cw = require('../cw');

var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('cw', function() {
    describe('#foo()', function() {
        it('should return hello world', function() {
            assert.equal(cw.foo(), 'Hello World');
        })
    })
})
