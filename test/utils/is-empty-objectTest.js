const expect = require("chai").expect;
const isEmptyObject = require("../../src/utils/is-empty-object");

describe("isEmptyObject", function () {

    it("{}", function () {
        expect(isEmptyObject({})).to.be.true;
    });

    class SomeClass {}

    it("new SomeClass()", function () {
        expect(isEmptyObject(new SomeClass())).to.be.true;
    });

    it("[]", function () {
        expect(isEmptyObject([])).to.be.false;
    });

    it("empty string", function () {
        expect(isEmptyObject("")).to.be.false;
    });

});