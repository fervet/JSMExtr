const extractJavaScriptASTsFromHtmlFile = require("../../src/parsing/extract-js-asts-from-html-file");

describe("HTML", function () {

    it("extract AST from HTML file", function () {
        const jsASTs = extractJavaScriptASTsFromHtmlFile('spec/demo/demo.html', 'utf8');

        const expectedDemoASTs = [
            {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'console',
                                    loc: {start: {line: 1, column: 0}, end: {line: 1, column: 7}}
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'log',
                                    loc: {start: {line: 1, column: 8}, end: {line: 1, column: 11}}
                                },
                                loc: {start: {line: 1, column: 0}, end: {line: 1, column: 11}}
                            },
                            arguments: [{
                                type: 'Literal',
                                value: 'one',
                                raw: '"one"',
                                loc: {start: {line: 1, column: 12}, end: {line: 1, column: 17}}
                            }],
                            loc: {start: {line: 1, column: 0}, end: {line: 1, column: 18}}
                        },
                        loc: {start: {line: 1, column: 0}, end: {line: 1, column: 19}}
                    }
                ],
                sourceType: 'script',
                loc: {start: {line: 1, column: 0}, end: {line: 1, column: 19}},
                htmlLocation : 'spec/demo/demo.html?5:1-5:28'
            }, {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'console',
                                    loc: {start: {line: 1, column: 0}, end: {line: 1, column: 7}}
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'log',
                                    loc: {start: {line: 1, column: 8}, end: {line: 1, column: 11}}
                                },
                                loc: {start: {line: 1, column: 0}, end: {line: 1, column: 11}}
                            },
                            arguments: [{
                                type: 'Literal',
                                value: 'two',
                                raw: '"two"',
                                loc: {start: {line: 1, column: 12}, end: {line: 1, column: 17}}
                            }],
                            loc: {start: {line: 1, column: 0}, end: {line: 1, column: 18}}
                        },
                        loc: {start: {line: 1, column: 0}, end: {line: 1, column: 19}}
                    }
                ],
                sourceType: 'script',
                loc: {start: {line: 1, column: 0}, end: {line: 1, column: 19}},
                htmlLocation : 'spec/demo/demo.html?6:1-6:28'
            }
        ];
        expect(jsASTs).toEqual(expectedDemoASTs);
        JSON.stringify(jsASTs, null, 4); // to debug
    });

});