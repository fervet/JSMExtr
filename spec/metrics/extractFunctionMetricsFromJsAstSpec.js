const functionMetricsFromJsAST = require("../../src/metrics/extract-function-metrics-from-js-ast");

describe("JS", function () {

    it("single function from JS file", function () {
        const jsAstFromJsFile = {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'one',
                        loc: {start: {line: 3, column: 9}, end: {line: 3, column: 12}}
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
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
                                            loc: {start: {line: 4, column: 4}, end: {line: 4, column: 11}}
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'log',
                                            loc: {start: {line: 4, column: 12}, end: {line: 4, column: 15}}
                                        },
                                        loc: {start: {line: 4, column: 4}, end: {line: 4, column: 15}}
                                    },
                                    arguments: [
                                        {
                                            type: 'Literal',
                                            value: 'function-one',
                                            raw: '"function-one"',
                                            loc: {start: {line: 4, column: 16}, end: {line: 4, column: 30}}
                                        }
                                    ],
                                    loc: {start: {line: 4, column: 4}, end: {line: 4, column: 31}}
                                },
                                loc: {start: {line: 4, column: 4}, end: {line: 4, column: 32}}
                            }
                        ],
                        loc: {start: {line: 3, column: 15}, end: {line: 5, column: 1}}
                    },
                    generator: false,
                    expression: false,
                    loc: {start: {line: 3, column: 0}, end: {line: 5, column: 1}}
                }
            ],
            sourceType: 'script',
            loc: {start: {line: 1, column: 0}, end: {line: 26, column: 1}}
        };

        let output = functionMetricsFromJsAST(jsAstFromJsFile);
        expect(output).toEqual([
            {
                functionName: 'one',
                functionMetrics: {
                    declarationStmtCount: 1,
                    executableStmtCount: 2,
                    conditionalStmtCount: 3,
                    loopingStmtCount: 4,
                    maxNestingLevelOfControlConstructs: 5,
                    returnStmtCount: 6,
                    parametersCount: 0,
                    callExpressionCount: 8
                },
                metricsDetail: [{expressionType: 'CallExpression'}]
            }
        ]);
    });

    it("two single functions from HTML file", function () {
        const jsAstFromHtmlFile = [{
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                id: {type: 'Identifier', name: 'one', loc: {start: {line: 2, column: 9}, end: {line: 2, column: 12}}},
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'console',
                                    loc: {start: {line: 3, column: 4}, end: {line: 3, column: 11}}
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'log',
                                    loc: {start: {line: 3, column: 12}, end: {line: 3, column: 15}}
                                },
                                loc: {start: {line: 3, column: 4}, end: {line: 3, column: 15}}
                            },
                            arguments: [{
                                type: 'Literal',
                                value: 'one',
                                raw: '"one"',
                                loc: {start: {line: 3, column: 16}, end: {line: 3, column: 21}}
                            }],
                            loc: {start: {line: 3, column: 4}, end: {line: 3, column: 22}}
                        },
                        loc: {start: {line: 3, column: 4}, end: {line: 3, column: 23}}
                    }],
                    loc: {start: {line: 2, column: 15}, end: {line: 4, column: 1}}
                },
                generator: false,
                expression: false,
                loc: {start: {line: 2, column: 0}, end: {line: 4, column: 1}}
            }],
            sourceType: 'script',
            loc: {start: {line: 2, column: 0}, end: {line: 4, column: 1}}
        }, {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                id: {type: 'Identifier', name: 'two', loc: {start: {line: 2, column: 9}, end: {line: 2, column: 12}}},
                params: [
                    {type: "Identifier", name: "a", loc: {start: {line: 1, column: 13}, end: {line: 1, column: 14}}},
                    {type: "Identifier", name: "b", loc: {start: {line: 1, column: 16}, end: {line: 1, column: 17}}}
                ],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                computed: false,
                                object: {
                                    type: 'Identifier',
                                    name: 'console',
                                    loc: {start: {line: 3, column: 4}, end: {line: 3, column: 11}}
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'log',
                                    loc: {start: {line: 3, column: 12}, end: {line: 3, column: 15}}
                                },
                                loc: {start: {line: 3, column: 4}, end: {line: 3, column: 15}}
                            },
                            arguments: [{
                                type: 'Literal',
                                value: 'two',
                                raw: '"two"',
                                loc: {start: {line: 3, column: 16}, end: {line: 3, column: 21}}
                            }],
                            loc: {start: {line: 3, column: 4}, end: {line: 3, column: 22}}
                        },
                        loc: {start: {line: 3, column: 4}, end: {line: 3, column: 23}}
                    }],
                    loc: {start: {line: 2, column: 15}, end: {line: 4, column: 1}}
                },
                generator: false,
                expression: false,
                loc: {start: {line: 2, column: 0}, end: {line: 4, column: 1}}
            }],
            sourceType: 'script',
            loc: {start: {line: 2, column: 0}, end: {line: 4, column: 1}}
        }];

        let output = functionMetricsFromJsAST(jsAstFromHtmlFile);
        expect(output).toEqual(
            [
                {
                    functionName: 'one',
                    functionMetrics: {
                        declarationStmtCount: 1,
                        executableStmtCount: 2,
                        conditionalStmtCount: 3,
                        loopingStmtCount: 4,
                        maxNestingLevelOfControlConstructs: 5,
                        returnStmtCount: 6,
                        parametersCount: 0,
                        callExpressionCount: 8
                    },
                    metricsDetail: [{expressionType: 'CallExpression'}]
                }
                ,
                {
                    functionName: 'two',
                    functionMetrics: {
                        declarationStmtCount: 1,
                        executableStmtCount: 2,
                        conditionalStmtCount: 3,
                        loopingStmtCount: 4,
                        maxNestingLevelOfControlConstructs: 5,
                        returnStmtCount: 6,
                        parametersCount: 2,
                        callExpressionCount: 8
                    },
                    metricsDetail: [{expressionType: 'CallExpression'}]
                }
            ]
        );
    });

});