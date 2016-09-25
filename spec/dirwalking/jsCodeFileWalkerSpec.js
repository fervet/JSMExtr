const jsCodeFileWalker = require("../../src/dirwalking/jscodefilewalker");

describe("file walker", function () {

    it("works", function () {
        const files = jsCodeFileWalker('spec/dirwalking/demo/');
        expect(files).toEqual([
            {fullPath: 'spec/dirwalking/demo/a.js', extension: 'js'},
            {fullPath: 'spec/dirwalking/demo/b.js', extension: 'js'},
            {fullPath: 'spec/dirwalking/demo/x/h.html', extension: 'html'}
        ]);
    });

});