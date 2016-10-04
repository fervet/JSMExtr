const expect = require("chai").expect;
const readFile = require("../../src/utils/read-file");

describe("readFile", function () {

    it("iso-8859-1", function () {
        expect(readFile('test/utils/read-fileDemo.txt', 'ISO-8859-1')).to.equal('This is ISO-8859-1 content áéíóú.');
    });

});