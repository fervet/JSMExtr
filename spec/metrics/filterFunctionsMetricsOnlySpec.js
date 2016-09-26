const extractJavaScriptASTsFromJsFile = require("../../src/parsing/extract-js-ast-from-js-file");
const extractAllMetricsFromJsAst = require("../../src/metrics/extractAllMetricsFromJsAst");
const filterFunctionMetricsOnly = require("../../src/metrics/filterFunctionMetricsOnly");

const demoFileJsAST = extractJavaScriptASTsFromJsFile('spec/metrics/filterFunctionsMetricsOnlyDemo.js', 'utf8');
const demoFileFullMetrics = extractAllMetricsFromJsAst(demoFileJsAST);

describe("filterFunctionsMetrics", function () {

    it(`"ast`, () => {
        expect(demoFileFullMetrics).toEqual(
            [{
                _type: 'VariableDeclaration',
                metrics: {declarationStmtCount: 3, executableStmtCount: 1, parametersCount: 2, callExpressionCount: 2},
                detail: {
                    declarations: [{
                        _type: 'VariableDeclarator',
                        variableName: 'q',
                        metrics: {declarationStmtCount: 3, executableStmtCount: 1, parametersCount: 2, callExpressionCount: 2},
                        detail: {
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
                                                                                variableName: 'a1',
                                                                                metrics: {declarationStmtCount: 1},
                                                                                detail: {init: {_type: 'Literal'}}
                                                                            }]
                                                                        }
                                                                    }]
                                                                }
                                                            }
                                                        },
                                                        loc: '2:4-4:5'
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
                                                                                                                variableName: 'b1',
                                                                                                                metrics: {declarationStmtCount: 1},
                                                                                                                detail: {init: {_type: 'Literal'}}
                                                                                                            }]
                                                                                                        }
                                                                                                    }]
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        loc: '6:8-8:9'
                                                                                    }]
                                                                                }
                                                                            }
                                                                        },
                                                                        loc: '5:5-9:5'
                                                                    }, arguments: [{_type: 'Literal'}]
                                                                }
                                                            }
                                                        }
                                                    }]
                                                }
                                            }
                                        },
                                        loc: '1:9-10:1'
                                    }, arguments: [{_type: 'Literal'}]
                                }
                            }
                        }
                    }]
                },
                fileLocation: 'spec/metrics/filterFunctionsMetricsOnlyDemo.js'
            }]
        );
    });

    it(`"filtering`, () => {
        const functionMetricsOnly = filterFunctionMetricsOnly(demoFileFullMetrics);

        expect(functionMetricsOnly).toEqual(
            [
                {
                    _type: 'FunctionExpression',
                    metrics: {parametersCount: 2, declarationStmtCount: 2, executableStmtCount: 1, callExpressionCount: 1},
                    loc: '1:9-10:1'
                },
                {
                    _type: 'FunctionExpression',
                    metrics: {parametersCount: 1, declarationStmtCount: 1},
                    loc: '5:5-9:5'
                },
                {
                    _type: 'FunctionDeclaration',
                    functionName: 'bbb',
                    metrics: {declarationStmtCount: 1},
                    loc: '6:8-8:9'
                },
                {
                    _type: 'FunctionDeclaration',
                    functionName: 'aaa',
                    metrics: {declarationStmtCount: 1},
                    loc: '2:4-4:5'
                }
            ]
        );
    });

});