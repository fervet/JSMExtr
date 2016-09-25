const extractJavaScriptASTsFromJsFile = require("../../src/parsing/extract-js-ast-from-js-file");
const functionMetricsFromJsAST = require("../../src/metrics/extract-function-metrics-from-js-ast");

const completeFileJsAST = extractJavaScriptASTsFromJsFile('spec/metrics/complete.js', 'utf8');
const completeMetrics = functionMetricsFromJsAST(completeFileJsAST);

const functionMetrics = {
    f1_singleEmptyDeclaration: completeMetrics[0],
    f2_multipleEmptyDeclarations: completeMetrics[1],
    f3_singleInitLiteralDeclaration: completeMetrics[2],
    f4_singleInitCallDeclaration: completeMetrics[3],
    f5_callNoArgs: completeMetrics[4],
    f6_callLiteralArgs: completeMetrics[5],
    f7_callCallArgs: completeMetrics[6],
    f8_callCallCallCallArgs: completeMetrics[7],
    f9_iife: completeMetrics[8],
    f10_returnSimple: completeMetrics[9],
    f11_returnCall: completeMetrics[10]
};

function testMetrics(functionName, expected) {
    it(`"metrics from ${functionName}`, () => {
        expect(expected.functionName).toEqual(functionName);
        expect(functionMetrics[functionName]).toEqual(expected);
    });
}

//noinspection JSUnusedLocalSymbols
function xtestMetrics() {
}

describe("COMPLETE JS", function () {

    testMetrics(
        'f1_singleEmptyDeclaration',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f1_singleEmptyDeclaration',
            metrics: {declarationStmtCount: 1},
            detail: {
                _type: 'BlockStatement',
                metrics: {declarationStmtCount: 1},
                detail: [{
                    _type: 'VariableDeclaration',
                    metrics: {declarationStmtCount: 1},
                    declarations: [{
                        _type: 'VariableDeclarator',
                        variableName: 'x',
                        metrics: {declarationStmtCount: 1}
                    }]
                }]
            },
            fileLocation: 'spec/metrics/complete.js?1:0-3:1'
        }
    );

    testMetrics(
        'f2_multipleEmptyDeclarations',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f2_multipleEmptyDeclarations',
            metrics: {declarationStmtCount: 2},
            detail: {
                _type: 'BlockStatement',
                metrics: {declarationStmtCount: 2},
                detail: [{
                    _type: 'VariableDeclaration',
                    metrics: {declarationStmtCount: 2},
                    declarations: [{
                        _type: 'VariableDeclarator',
                        variableName: 'a',
                        metrics: {declarationStmtCount: 1},
                    }, {
                        _type: 'VariableDeclarator',
                        variableName: 'b',
                        metrics: {declarationStmtCount: 1},
                    }]
                }]
            },
            fileLocation: 'spec/metrics/complete.js?4:0-6:1'
        }
    );

    testMetrics(
        'f3_singleInitLiteralDeclaration',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f3_singleInitLiteralDeclaration',
            metrics: {declarationStmtCount: 1},
            detail: {
                _type: 'BlockStatement',
                metrics: {declarationStmtCount: 1},
                detail: [{
                    _type: 'VariableDeclaration',
                    metrics: {declarationStmtCount: 1},
                    declarations: [{
                        _type: 'VariableDeclarator',
                        variableName: 'c',
                        metrics: {declarationStmtCount: 1},
                        detail: {init: {_type: 'Literal'}}
                    }]
                }]
            },
            fileLocation: 'spec/metrics/complete.js?7:0-9:1'
        }
    );

    testMetrics(
        'f4_singleInitCallDeclaration',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f4_singleInitCallDeclaration',
            metrics: {declarationStmtCount: 1, callExpressionCount: 1},
            detail: {
                _type: 'BlockStatement',
                metrics: {declarationStmtCount: 1, callExpressionCount: 1},
                detail: [{
                    _type: 'VariableDeclaration',
                    metrics: {declarationStmtCount: 1, callExpressionCount: 1},
                    declarations: [{
                        _type: 'VariableDeclarator',
                        variableName: 'd',
                        metrics: {declarationStmtCount: 1, callExpressionCount: 1},
                        detail: {
                            init: {
                                _type: 'CallExpression',
                                metrics: {callExpressionCount: 1},
                                detail: {callee: {_type: 'Identifier'}, arguments: [{_type: 'Literal'}]}
                            }
                        }
                    }]
                }]
            },
            fileLocation: 'spec/metrics/complete.js?10:0-12:1'
        });

    testMetrics(
        'f5_callNoArgs',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f5_callNoArgs',
            metrics: {callExpressionCount: 1},
            detail: {
                _type: 'BlockStatement',
                metrics: {callExpressionCount: 1},
                detail: [{
                    _type: 'ExpressionStatement',
                    metrics: {callExpressionCount: 1},
                    detail: [{
                        _type: 'CallExpression',
                        metrics: {callExpressionCount: 1},
                        detail: {callee: {_type: 'Identifier'}}
                    }]
                }]
            },
            fileLocation: 'spec/metrics/complete.js?13:0-15:1'
        });

    testMetrics(
        'f6_callLiteralArgs',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f6_callLiteralArgs',
            metrics: {callExpressionCount: 1},
            detail: {
                _type: 'BlockStatement',
                metrics: {callExpressionCount: 1},
                detail: [{
                    _type: 'ExpressionStatement',
                    metrics: {callExpressionCount: 1},
                    detail: [{
                        _type: 'CallExpression',
                        metrics: {callExpressionCount: 1},
                        detail: {callee: {_type: 'Identifier'}, arguments: [{_type: 'Literal'}]}
                    }]
                }]
            },
            fileLocation: 'spec/metrics/complete.js?16:0-18:1'
        }
    );

    testMetrics(
        'f7_callCallArgs',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f7_callCallArgs',
            metrics: {callExpressionCount: 2},
            detail: {
                _type: 'BlockStatement',
                metrics: {callExpressionCount: 2},
                detail: [{
                    _type: 'ExpressionStatement',
                    metrics: {callExpressionCount: 2},
                    detail: [{
                        _type: 'CallExpression',
                        metrics: {callExpressionCount: 2},
                        detail: {
                            callee: {_type: 'Identifier'},
                            arguments: [{
                                _type: 'CallExpression',
                                metrics: {callExpressionCount: 1},
                                detail: {callee: {_type: 'Identifier'}}
                            }]
                        }
                    }]
                }]
            },
            fileLocation: 'spec/metrics/complete.js?19:0-21:1'
        }
    );

    testMetrics(
        'f8_callCallCallCallArgs',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f8_callCallCallCallArgs',
            metrics: {callExpressionCount: 7},
            detail: {
                _type: 'BlockStatement',
                metrics: {callExpressionCount: 7},
                detail: [{
                    _type: 'ExpressionStatement',
                    metrics: {callExpressionCount: 7},
                    detail: [{
                        _type: 'CallExpression',
                        metrics: {callExpressionCount: 7},
                        detail: {
                            callee: {
                                _type: 'MemberExpression',
                                metrics: {callExpressionCount: 2},
                                detail: {
                                    object: {
                                        _type: 'CallExpression',
                                        metrics: {callExpressionCount: 1},
                                        detail: {callee: {_type: 'Identifier'}}
                                    },
                                    property: {
                                        _type: 'CallExpression',
                                        metrics: {callExpressionCount: 1},
                                        detail: {callee: {_type: 'Identifier'}}
                                    }
                                }
                            },
                            arguments: [{
                                _type: 'CallExpression',
                                metrics: {callExpressionCount: 1},
                                detail: {callee: {_type: 'Identifier'}}
                            }, {
                                _type: 'CallExpression',
                                metrics: {callExpressionCount: 3},
                                detail: {
                                    callee: {_type: 'Identifier'},
                                    arguments: [{_type: 'Literal'}, {
                                        _type: 'CallExpression',
                                        metrics: {callExpressionCount: 2},
                                        detail: {
                                            callee: {
                                                _type: 'MemberExpression',
                                                metrics: {callExpressionCount: 1},
                                                detail: {
                                                    object: {
                                                        _type: 'CallExpression',
                                                        metrics: {callExpressionCount: 1},
                                                        detail: {
                                                            callee: {_type: 'Identifier'},
                                                            arguments: [{_type: 'Literal'}]
                                                        }
                                                    }, property: {_type: 'Identifier'}
                                                }
                                            }
                                        }
                                    }]
                                }
                            }]
                        }
                    }]
                }]
            },
            fileLocation: 'spec/metrics/complete.js?22:0-24:1'
        }
    );

    testMetrics(
        'f9_iife',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f9_iife',
            metrics: {declarationStmtCount: 1, parametersCount: 1, callExpressionCount: 1},
            detail: {
                _type: 'BlockStatement',
                metrics: {declarationStmtCount: 1, parametersCount: 1, callExpressionCount: 1},
                detail: [{
                    _type: 'ExpressionStatement',
                    metrics: {declarationStmtCount: 1, parametersCount: 1, callExpressionCount: 1},
                    detail: [{
                        _type: 'CallExpression',
                        metrics: {callExpressionCount: 1, declarationStmtCount: 1, parametersCount: 1},
                        detail: {
                            callee: {
                                _type: 'FunctionExpression',
                                metrics: {parametersCount: 1, declarationStmtCount: 1},
                                detail: {
                                    _type: 'BlockStatement',
                                    metrics: {declarationStmtCount: 1},
                                    detail: [{
                                        _type: 'VariableDeclaration',
                                        metrics: {declarationStmtCount: 1},
                                        declarations: [{
                                            _type: 'VariableDeclarator',
                                            variableName: 'i',
                                            metrics: {declarationStmtCount: 1},
                                            detail: {init: {_type: 'Literal'}}
                                        }]
                                    }]
                                }
                            }, arguments: [{_type: 'Literal'}]
                        }
                    }]
                }]
            },
            fileLocation: 'spec/metrics/complete.js?25:0-29:1'
        }
    );

    testMetrics(
        'f10_returnSimple',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f10_returnSimple',
            metrics: {returnStmtCount: 1},
            detail: {
                _type: 'BlockStatement',
                metrics: {returnStmtCount: 1},
                detail: [{
                    _type: 'ReturnStatement',
                    metrics: {returnStmtCount: 1},
                    detail: {argument: {_type: 'Literal'}}
                }]
            },
            fileLocation: 'spec/metrics/complete.js?30:0-32:1'
        }
    );

    testMetrics(
        'f11_returnCall',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f11_returnCall',
            metrics: {returnStmtCount: 1, callExpressionCount: 1},
            detail: {
                _type: 'BlockStatement',
                metrics: {returnStmtCount: 1, callExpressionCount: 1},
                detail: [{
                    _type: 'ReturnStatement',
                    metrics: {returnStmtCount: 1, callExpressionCount: 1},
                    detail: {
                        argument: {
                            _type: 'CallExpression',
                            metrics: {callExpressionCount: 1},
                            detail: {callee: {_type: 'Identifier'}}
                        }
                    }
                }]
            },
            fileLocation: 'spec/metrics/complete.js?33:0-35:1'
        }
    );

});