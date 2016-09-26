var expect = require("chai").expect;

describe("a", function() {
  describe("x", function() {
    it("x", function() {

      expect({a:1, b: {c:2}}).to.deep.equal({a:1, b: {c:2}});
    });
  });
});