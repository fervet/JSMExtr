const extractJavaScriptASTsFromJsFile = require("../src/parsing/extract-js-ast-from-js-file");

describe("Exemplo", function () {

    it("extractJavaScriptASTsFromHtmlFile demo-html", function () {
        const jsAST = extractJavaScriptASTsFromJsFile('spec/demo/demo.js', 'utf8');

        const expectedDemoAST = {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {type: 'Identifier', name: 'console'},
                            property: {type: 'Identifier', name: 'log'}
                        },
                        arguments: [{type: 'Literal', value: 'one', raw: '"one"'}]
                    }
                }, {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {type: 'Identifier', name: 'console'},
                            property: {type: 'Identifier', name: 'log'}
                        },
                        arguments: [{type: 'Literal', value: 'two', raw: '"two"'}]
                    }
                }
            ],
            sourceType: 'script'
        };
        expect(jsAST).toEqual(expectedDemoAST);
        JSON.stringify(jsAST, null, 4); // to debug
    });

});