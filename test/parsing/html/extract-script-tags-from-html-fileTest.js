const expect = require("chai").expect;

const extractScriptTagsFromHtmlFile = require("../../../src/parsing/html/extract-script-tags-from-html-file");

describe("HTML", function () {

    it("extract TAGs from HTML file", function () {
        const htmlAST = extractScriptTagsFromHtmlFile('test/demo/demo.html', 'utf8');

        const expectedAST = [{
            "originalTag": "<script>",
            "originalEndTag": "</script>",
            "nodeType": 1,
            "nodeName": "script",
            "tagName": "script",
            "tagNamespace": "HTML",
            "childNodes": [{
                "nodeType": 3,
                "nodeName": "#text",
                "textContent": "console.log(\"one\");",
                "startPos": {"line": 5, "column": 9, "offset": 84}
            }],
            "attributes": [],
            "startPos": {"line": 5, "column": 1, "offset": 76},
            "endPos": {"line": 5, "column": 28, "offset": 103}
        }, {
            "originalTag": "<script>",
            "originalEndTag": "</script>",
            "nodeType": 1,
            "nodeName": "script",
            "tagName": "script",
            "tagNamespace": "HTML",
            "childNodes": [{
                "nodeType": 3,
                "nodeName": "#text",
                "textContent": "console.log(\"two\");",
                "startPos": {"line": 6, "column": 9, "offset": 122}
            }],
            "attributes": [],
            "startPos": {"line": 6, "column": 1, "offset": 114},
            "endPos": {"line": 6, "column": 28, "offset": 141}
        }];
        expect(JSON.stringify(htmlAST, null, 4)).to.deep.equal(JSON.stringify(expectedAST, null, 4));
    });

});