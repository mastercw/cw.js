import { expect } from "chai";
// Import the compiled JavaScript
import * as cw from "../dist/cw.esm.js";

describe("cw", function () {
  describe("#tdit()", function () {
    it("should calculate the correct dit length in ms", function () {
      expect(cw.tdit(20)).to.equal(0.06);
      expect(cw.tdit(50)).to.equal(0.024);
    });
  });

  describe("#tfdit()", function () {
    it("should calculate the correct farnsworth dit length in ms", function () {
      expect(cw.tfdit(20, 10)).to.equal(0.21789473684210525);
      expect(cw.tfdit(20, 20)).to.equal(0.06);
      expect(cw.tfdit(20)).to.equal(0.06);
    });
  });

  describe("#codes", function () {
    it("should provide an object mapping characters to morse code", function () {
      expect(cw.codes["C"]).to.equal("-.-.");
      expect(cw.codes["8"]).to.equal("---..");
      expect(cw.codes["."]).to.equal(".-.-.-");
      expect(cw.codes["w"]).to.be.undefined;
    });
  });
});
