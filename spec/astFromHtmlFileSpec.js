const extractJavaScriptASTsFromHtmlFile = require("../src/parsing/extract-js-asts-from-html-file");

describe("Exemplo", function () {

    it("extractJavaScriptASTsFromHtmlFile demo-html", function () {
        const jsASTs = extractJavaScriptASTsFromHtmlFile('spec/demo/demo.html', 'utf8');

        const expectedDemoASTs = [
            {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "MemberExpression",
                                "computed": false,
                                "object": {"type": "Identifier", "name": "console"},
                                "property": {"type": "Identifier", "name": "log"}
                            },
                            "arguments": [{"type": "Literal", "value": "one", "raw": "\"one\""}]
                        }
                    }
                ],
                "sourceType": "script"
            },
            {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "MemberExpression",
                                "computed": false,
                                "object": {"type": "Identifier", "name": "console"},
                                "property": {"type": "Identifier", "name": "log"}
                            },
                            "arguments": [{"type": "Literal", "value": "two", "raw": "\"two\""}]
                        }
                    }
                ],
                "sourceType": "script"
            }
        ];
        expect(jsASTs).toEqual(expectedDemoASTs);
        JSON.stringify(jsASTs, null, 4); // to debug
    });

});