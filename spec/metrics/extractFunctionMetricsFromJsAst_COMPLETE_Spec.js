const extractJavaScriptASTsFromJsFile = require("../../src/parsing/extract-js-ast-from-js-file");
const functionMetricsFromJsAST = require("../../src/metrics/extract-function-metrics-from-js-ast");

describe("COMPLETE JS", function () {

    it("metrics from COMPLETE function", function () {
        const completeFunctionJsAST = extractJavaScriptASTsFromJsFile('spec/metrics/complete.js', 'utf8');

        let output = functionMetricsFromJsAST(completeFunctionJsAST);
        expect(output).toEqual([{
                _type: 'FunctionDeclaration',
                functionName: 'all',
                metrics: {parametersCount: 2, declarationStmtCount: 4},
                detail: {
                    _type: 'BlockStatement',
                    metrics: {declarationStmtCount: 4},
                    detail: [{
                        _type: 'VariableDeclaration',
                        metrics: {declarationStmtCount: 1},
                        declarations: [{_type: 'VariableDeclarator', variableName: 'sum'}]
                    }, {
                        _type: 'VariableDeclaration',
                        metrics: {declarationStmtCount: 2},
                        declarations: [{_type: 'VariableDeclarator', variableName: 'other'}, {
                            _type: 'VariableDeclarator',
                            variableName: 'yetAnother'
                        }]
                    }, {
                        _type: 'ForStatement',
                        metrics: {declarationStmtCount: 1},
                        detail: {
                            init: [{
                                _type: 'VariableDeclaration',
                                metrics: {declarationStmtCount: 1},
                                declarations: [{_type: 'VariableDeclarator', variableName: 'i'}]
                            }],
                            test: [{_type: 'BinaryExpression'}],
                            update: [{_type: 'UpdateExpression'}],
                            body: [{
                                _type: 'ExpressionStatement',
                                metrics: {},
                                expressionType: 'AssignmentExpression'
                            }, {_type: 'ExpressionStatement', metrics: {}, expressionType: 'AssignmentExpression'}]
                        }
                    }, {_type: 'IfStatement'}, {_type: 'SwitchStatement'}, {_type: 'ReturnStatement'}]
                }
            }]
        );
        const ignore =
            [{
                _type: 'FunctionDeclaration',
                functionName: 'all',
                metrics: {parametersCount: 2, declarationStmtCount: 3},
                detail: {
                    _type: 'BlockStatement',
                    metrics: {declarationStmtCount: 3},
                    detail: [{
                        _type: 'VariableDeclaration',
                        metrics: {declarationStmtCount: 1},
                        declarations: [{_type: 'VariableDeclarator', variableName: 'sum'}]
                    }, {
                        _type: 'VariableDeclaration',
                        metrics: {declarationStmtCount: 2},
                        declarations: [{
                            _type: 'VariableDeclarator',
                            variableName: 'other'
                        }, {_type: 'VariableDeclarator', variableName: 'yetAnother'}]
                    }, {
                        _type: 'ForStatement',
                        detail: {
                            type: 'ForStatement',
                            init: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'i',
                                        loc: {start: {line: 4, column: 13}, end: {line: 4, column: 14}}
                                    },
                                    init: {
                                        type: 'Literal',
                                        value: 0,
                                        raw: '0',
                                        loc: {start: {line: 4, column: 17}, end: {line: 4, column: 18}}
                                    },
                                    loc: {start: {line: 4, column: 13}, end: {line: 4, column: 18}}
                                }],
                                kind: 'var',
                                loc: {start: {line: 4, column: 9}, end: {line: 4, column: 18}}
                            },
                            test: {
                                type: 'BinaryExpression',
                                operator: '<',
                                left: {
                                    type: 'Identifier',
                                    name: 'i',
                                    loc: {start: {line: 4, column: 20}, end: {line: 4, column: 21}}
                                },
                                right: {
                                    type: 'MemberExpression',
                                    computed: false,
                                    object: {
                                        type: 'Identifier',
                                        name: 'myArray',
                                        loc: {start: {line: 4, column: 24}, end: {line: 4, column: 31}}
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'length',
                                        loc: {start: {line: 4, column: 32}, end: {line: 4, column: 38}}
                                    },
                                    loc: {start: {line: 4, column: 24}, end: {line: 4, column: 38}}
                                },
                                loc: {start: {line: 4, column: 20}, end: {line: 4, column: 38}}
                            },
                            update: {
                                type: 'UpdateExpression',
                                operator: '++',
                                argument: {
                                    type: 'Identifier',
                                    name: 'i',
                                    loc: {start: {line: 4, column: 40}, end: {line: 4, column: 41}}
                                },
                                prefix: false,
                                loc: {start: {line: 4, column: 40}, end: {line: 4, column: 43}}
                            },
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'sum',
                                            loc: {start: {line: 5, column: 8}, end: {line: 5, column: 11}}
                                        },
                                        right: {
                                            type: 'BinaryExpression',
                                            operator: '+',
                                            left: {
                                                type: 'Identifier',
                                                name: 'sum',
                                                loc: {start: {line: 5, column: 14}, end: {line: 5, column: 17}}
                                            },
                                            right: {
                                                type: 'MemberExpression',
                                                computed: true,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'myArray',
                                                    loc: {start: {line: 5, column: 20}, end: {line: 5, column: 27}}
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'i',
                                                    loc: {start: {line: 5, column: 28}, end: {line: 5, column: 29}}
                                                },
                                                loc: {start: {line: 5, column: 20}, end: {line: 5, column: 30}}
                                            },
                                            loc: {start: {line: 5, column: 14}, end: {line: 5, column: 30}}
                                        },
                                        loc: {start: {line: 5, column: 8}, end: {line: 5, column: 30}}
                                    },
                                    loc: {start: {line: 5, column: 8}, end: {line: 5, column: 31}}
                                }, {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '*=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'yetAnother',
                                            loc: {start: {line: 6, column: 8}, end: {line: 6, column: 18}}
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'first',
                                            loc: {start: {line: 6, column: 22}, end: {line: 6, column: 27}}
                                        },
                                        loc: {start: {line: 6, column: 8}, end: {line: 6, column: 27}}
                                    },
                                    loc: {start: {line: 6, column: 8}, end: {line: 6, column: 28}}
                                }],
                                loc: {start: {line: 4, column: 45}, end: {line: 7, column: 5}}
                            },
                            loc: {start: {line: 4, column: 4}, end: {line: 7, column: 5}}
                        }
                    }, {_type: 'IfStatement'}, {_type: 'SwitchStatement'}, {_type: 'ReturnStatement'}]
                }
            }]


    });

});