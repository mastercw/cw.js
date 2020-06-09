var cw = require("../cw");

var assert = require("assert");

describe("cw", function () {
  describe("#tdit()", function () {
    it("should calculate the correct dit length in ms", function () {
      assert.equal(cw.tdit(20), 0.06);
      assert.equal(cw.tdit(50), 0.024);
    });
  });
});

describe("cw", function () {
  describe("#tfdit()", function () {
    it("should calculate the correct farnsworth dit length in ms", function () {
      assert.equal(cw.tfdit(20, 10), 0.21789473684210525);
      assert.equal(cw.tfdit(20, 20), 0.06);
    });
  });
});
