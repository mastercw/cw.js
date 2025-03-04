import { tdit, tfdit, codes } from "../src/index.js";
import { expect } from "chai";

describe("cw", function () {
  describe("#tdit()", function () {
    it("should calculate the correct dit length in ms", function () {
      expect(tdit(20)).to.equal(0.06);
      expect(tdit(50)).to.equal(0.024);
    });
  });

  describe("#tfdit()", function () {
    it("should calculate the correct farnsworth dit length in ms", function () {
      expect(tfdit(20, 10)).to.equal(0.21789473684210525);
      expect(tfdit(20, 20)).to.equal(0.06);
      expect(tfdit(20)).to.equal(0.06);
    });
  });

  describe("#codes", function () {
    it("should provide an object mapping characters to morse code", function () {
      expect(codes["C"]).to.equal("-.-.");
      expect(codes["8"]).to.equal("---..");
      expect(codes["."]).to.equal(".-.-.-");
      expect(codes["w"]).to.be.undefined;
    });
  });
});
