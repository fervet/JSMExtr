const extractJavaScriptASTsFromJsFile = require("../../src/parsing/extract-js-ast-from-js-file");
const extractAllMetricsFromJsAst = require("../../src/metrics/extractAllMetricsFromJsAst");
const filterFunctionMetricsOnly = require("../../src/metrics/filterFunctionMetricsOnly");

const demoFileJsAST = extractJavaScriptASTsFromJsFile('test/metrics/filterFunctionsMetricsOnlyDemo.js', 'utf8');
const demoFileFullMetrics = extractAllMetricsFromJsAst(demoFileJsAST);

describe("filterFunctionsMetrics", function () {

    it(`ast`, () => {
        expect(demoFileFullMetrics).toEqual(
            [{
                _type: 'VariableDeclaration',
                metrics: {declarationStmtCount: 3, executableStmtCount: 1, parametersCount: 2, callExpressionCount: 2},
                detail: {
                    declarations: [{
                        _type: 'VariableDeclarator',
                        metrics: {declarationStmtCount: 3, executableStmtCount: 1, parametersCount: 2, callExpressionCount: 2},
                        detail: {
                            id: {_type: 'Identifier'},
                            init: {
                                _type: 'CallExpression',
                                metrics: {callExpressionCount: 2, declarationStmtCount: 2, executableStmtCount: 1, parametersCount: 2},
                                detail: {
                                    callee: {
                                        _type: 'FunctionExpression',
                                        metrics: {parametersCount: 2, declarationStmtCount: 2, executableStmtCount: 1, callExpressionCount: 1},
                                        detail: {
                                            body: {
                                                _type: 'BlockStatement',
                                                metrics: {declarationStmtCount: 2, executableStmtCount: 1, parametersCount: 1, callExpressionCount: 1},
                                                detail: {
                                                    body: [{
                                                        _type: 'FunctionDeclaration',
                                                        functionName: 'aaa',
                                                        metrics: {declarationStmtCount: 1},
                                                        detail: {
                                                            body: {
                                                                _type: 'BlockStatement',
                                                                metrics: {declarationStmtCount: 1},
                                                                detail: {
                                                                    body: [{
                                                                        _type: 'VariableDeclaration',
                                                                        metrics: {declarationStmtCount: 1},
                                                                        detail: {
                                                                            declarations: [{
                                                                                _type: 'VariableDeclarator',
                                                                                metrics: {declarationStmtCount: 1},
                                                                                detail: {id: {_type: 'Identifier'}, init: {_type: 'Literal'}}
                                                                            }]
                                                                        }
                                                                    }]
                                                                }
                                                            }
                                                        },
                                                        loc: 'test/metrics/filterFunctionsMetricsOnlyDemo.js?2:4-4:5'
                                                    }, {
                                                        _type: 'ExpressionStatement',
                                                        metrics: {executableStmtCount: 1, declarationStmtCount: 1, parametersCount: 1, callExpressionCount: 1},
                                                        detail: {
                                                            expression: {
                                                                _type: 'CallExpression',
                                                                metrics: {callExpressionCount: 1, declarationStmtCount: 1, parametersCount: 1},
                                                                detail: {
                                                                    callee: {
                                                                        _type: 'FunctionExpression',
                                                                        functionName: 'yyy',
                                                                        metrics: {parametersCount: 1, declarationStmtCount: 1},
                                                                        detail: {
                                                                            body: {
                                                                                _type: 'BlockStatement',
                                                                                metrics: {declarationStmtCount: 1},
                                                                                detail: {
                                                                                    body: [{
                                                                                        _type: 'FunctionDeclaration',
                                                                                        functionName: 'bbb',
                                                                                        metrics: {declarationStmtCount: 1},
                                                                                        detail: {
                                                                                            body: {
                                                                                                _type: 'BlockStatement',
                                                                                                metrics: {declarationStmtCount: 1},
                                                                                                detail: {
                                                                                                    body: [{
                                                                                                        _type: 'VariableDeclaration',
                                                                                                        metrics: {declarationStmtCount: 1},
                                                                                                        detail: {
                                                                                                            declarations: [{
                                                                                                                _type: 'VariableDeclarator',
                                                                                                                metrics: {declarationStmtCount: 1},
                                                                                                                detail: {
                                                                                                                    id: {_type: 'Identifier'},
                                                                                                                    init: {_type: 'Literal'}
                                                                                                                }
                                                                                                            }]
                                                                                                        }
                                                                                                    }]
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        loc: 'test/metrics/filterFunctionsMetricsOnlyDemo.js?6:8-8:9'
                                                                                    }]
                                                                                }
                                                                            }
                                                                        },
                                                                        loc: 'test/metrics/filterFunctionsMetricsOnlyDemo.js?5:5-9:5'
                                                                    }, arguments: [{_type: 'Literal'}]
                                                                }
                                                            }
                                                        }
                                                    }]
                                                }
                                            }
                                        },
                                        loc: 'test/metrics/filterFunctionsMetricsOnlyDemo.js?1:9-10:1'
                                    }, arguments: [{_type: 'Literal'}]
                                }
                            }
                        }
                    }]
                }
            }]
        );
    });

    it(`filtering`, () => {
        const functionMetricsOnly = filterFunctionMetricsOnly(demoFileFullMetrics);

        expect(functionMetricsOnly).toEqual(
            [{
                _type: 'FunctionExpression',
                metrics: {parametersCount: 2, declarationStmtCount: 2, executableStmtCount: 1, callExpressionCount: 1},
                loc: 'test/metrics/filterFunctionsMetricsOnlyDemo.js?1:9-10:1'
            }, {
                _type: 'FunctionExpression',
                functionName: 'yyy',
                metrics: {parametersCount: 1, declarationStmtCount: 1},
                loc: 'test/metrics/filterFunctionsMetricsOnlyDemo.js?5:5-9:5'
            }, {
                _type: 'FunctionDeclaration',
                functionName: 'bbb',
                metrics: {declarationStmtCount: 1},
                loc: 'test/metrics/filterFunctionsMetricsOnlyDemo.js?6:8-8:9'
            }, {
                _type: 'FunctionDeclaration',
                functionName: 'aaa',
                metrics: {declarationStmtCount: 1},
                loc: 'test/metrics/filterFunctionsMetricsOnlyDemo.js?2:4-4:5'
            }]
        );
    });

});