const expect = require("chai").expect;

const jsCodeFileWalker = require("../../src/dirwalking/jsCodeFilesWalker");

describe("file walker", function () {

    it("works", function () {
        const files = jsCodeFileWalker('test/dirwalking/demo/');
        files.forEach(f => f.fullPath = f.fullPath.replace(/\\/g,"/"));
        expect(files).to.deep.equal([
            {fullPath: 'test/dirwalking/demo/a.js', extension: 'js'},
            {fullPath: 'test/dirwalking/demo/b.js', extension: 'js'},
            {fullPath: 'test/dirwalking/demo/x/h.html', extension: 'html'}
        ]);
    });

});