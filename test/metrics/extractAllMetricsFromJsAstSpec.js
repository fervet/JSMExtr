const extractJavaScriptASTsFromJsFile = require("../../src/parsing/extract-js-ast-from-js-file");
const extractAllMetricsFromJsAst = require("../../src/metrics/extractAllMetricsFromJsAst");

const demoFileJsAst = extractJavaScriptASTsFromJsFile('test/metrics/extractAllMetricsFromJsAstDemo.js', 'utf8');
const allMetrics = extractAllMetricsFromJsAst(demoFileJsAst);

const functionMetrics = {
    f1_singleEmptyDeclaration: allMetrics[0],
    f2_multipleEmptyDeclarations: allMetrics[1],
    f3_singleInitLiteralDeclaration: allMetrics[2],
    f4_singleInitCallDeclaration: allMetrics[3],
    f5_callNoArgs: allMetrics[4],
    f6_callLiteralArgs: allMetrics[5],
    f7_callCallArgs: allMetrics[6],
    f8_callCallCallCallArgs: allMetrics[7],
    f9_iife: allMetrics[8],
    f10_returnSimple: allMetrics[9],
    f11_returnCall: allMetrics[10],
    f12_declarationAndSumExpressionStatement: allMetrics[11],
    f13_for: allMetrics[12]
};

function testMetrics(functionName, expected) {
    it(`all metrics from ${functionName}`, () => {
        expect(expected.functionName).toEqual(functionName);
        expect(functionMetrics[functionName]).toEqual(expected);
    });
}

//noinspection JSUnusedLocalSymbols
function xtestMetrics() {
}

describe("extractAllMetricsFromJsAst", function () {

    testMetrics(
        'f1_singleEmptyDeclaration',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f1_singleEmptyDeclaration',
            metrics: {declarationStmtCount: 1},
            detail: {
                body: {
                    _type: 'BlockStatement',
                    metrics: {declarationStmtCount: 1},
                    detail: {
                        body: [{
                            _type: 'VariableDeclaration',
                            metrics: {declarationStmtCount: 1},
                            detail: {declarations: [{_type: 'VariableDeclarator', metrics: {declarationStmtCount: 1}, detail: {id: {_type: 'Identifier'}}}]}
                        }]
                    }
                }
            },
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?1:0-3:1'
        }
    );

    testMetrics(
        'f2_multipleEmptyDeclarations',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f2_multipleEmptyDeclarations',
            metrics: {declarationStmtCount: 2},
            detail: {
                body: {
                    _type: 'BlockStatement',
                    metrics: {declarationStmtCount: 2},
                    detail: {
                        body: [{
                            _type: 'VariableDeclaration',
                            metrics: {declarationStmtCount: 2},
                            detail: {
                                declarations: [{
                                    _type: 'VariableDeclarator',
                                    metrics: {declarationStmtCount: 1},
                                    detail: {id: {_type: 'Identifier'}}
                                }, {_type: 'VariableDeclarator', metrics: {declarationStmtCount: 1}, detail: {id: {_type: 'Identifier'}}}]
                            }
                        }]
                    }
                }
            },
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?4:0-6:1'
        }
    );

    testMetrics(
        'f3_singleInitLiteralDeclaration',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f3_singleInitLiteralDeclaration',
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
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?7:0-9:1'
        }
    );

    testMetrics(
        'f4_singleInitCallDeclaration',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f4_singleInitCallDeclaration',
            metrics: {declarationStmtCount: 1, callExpressionCount: 1},
            detail: {
                body: {
                    _type: 'BlockStatement',
                    metrics: {declarationStmtCount: 1, callExpressionCount: 1},
                    detail: {
                        body: [{
                            _type: 'VariableDeclaration',
                            metrics: {declarationStmtCount: 1, callExpressionCount: 1},
                            detail: {
                                declarations: [{
                                    _type: 'VariableDeclarator',
                                    metrics: {declarationStmtCount: 1, callExpressionCount: 1},
                                    detail: {
                                        id: {_type: 'Identifier'},
                                        init: {
                                            _type: 'CallExpression',
                                            metrics: {callExpressionCount: 1},
                                            detail: {callee: {_type: 'Identifier'}, arguments: [{_type: 'Literal'}]}
                                        }
                                    }
                                }]
                            }
                        }]
                    }
                }
            },
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?10:0-12:1'
        }
    );

    testMetrics(
        'f5_callNoArgs',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f5_callNoArgs',
            metrics: {executableStmtCount: 1, callExpressionCount: 1},
            detail: {
                body: {
                    _type: 'BlockStatement',
                    metrics: {executableStmtCount: 1, callExpressionCount: 1},
                    detail: {
                        body: [{
                            _type: 'ExpressionStatement',
                            metrics: {executableStmtCount: 1, callExpressionCount: 1},
                            detail: {expression: {_type: 'CallExpression', metrics: {callExpressionCount: 1}, detail: {callee: {_type: 'Identifier'}}}}
                        }]
                    }
                }
            },
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?13:0-15:1'
        }
    );

    testMetrics(
        'f6_callLiteralArgs',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f6_callLiteralArgs',
            metrics: {executableStmtCount: 1, callExpressionCount: 1},
            detail: {
                body: {
                    _type: 'BlockStatement',
                    metrics: {executableStmtCount: 1, callExpressionCount: 1},
                    detail: {
                        body: [{
                            _type: 'ExpressionStatement',
                            metrics: {executableStmtCount: 1, callExpressionCount: 1},
                            detail: {
                                expression: {
                                    _type: 'CallExpression',
                                    metrics: {callExpressionCount: 1},
                                    detail: {callee: {_type: 'Identifier'}, arguments: [{_type: 'Literal'}]}
                                }
                            }
                        }]
                    }
                }
            },
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?16:0-18:1'
        }
    );

    testMetrics(
        'f7_callCallArgs',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f7_callCallArgs',
            metrics: {executableStmtCount: 1, callExpressionCount: 2},
            detail: {
                body: {
                    _type: 'BlockStatement',
                    metrics: {executableStmtCount: 1, callExpressionCount: 2},
                    detail: {
                        body: [{
                            _type: 'ExpressionStatement',
                            metrics: {executableStmtCount: 1, callExpressionCount: 2},
                            detail: {
                                expression: {
                                    _type: 'CallExpression',
                                    metrics: {callExpressionCount: 2},
                                    detail: {
                                        callee: {_type: 'Identifier'},
                                        arguments: [{_type: 'CallExpression', metrics: {callExpressionCount: 1}, detail: {callee: {_type: 'Identifier'}}}]
                                    }
                                }
                            }
                        }]
                    }
                }
            },
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?19:0-21:1'
        }
    );

    testMetrics(
        'f8_callCallCallCallArgs',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f8_callCallCallCallArgs',
            metrics: {executableStmtCount: 1, callExpressionCount: 7},
            detail: {
                body: {
                    _type: 'BlockStatement',
                    metrics: {executableStmtCount: 1, callExpressionCount: 7},
                    detail: {
                        body: [{
                            _type: 'ExpressionStatement',
                            metrics: {executableStmtCount: 1, callExpressionCount: 7},
                            detail: {
                                expression: {
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
                                                property: {_type: 'CallExpression', metrics: {callExpressionCount: 1}, detail: {callee: {_type: 'Identifier'}}}
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
                                                                    detail: {callee: {_type: 'Identifier'}, arguments: [{_type: 'Literal'}]}
                                                                }, property: {_type: 'Identifier'}
                                                            }
                                                        }
                                                    }
                                                }]
                                            }
                                        }]
                                    }
                                }
                            }
                        }]
                    }
                }
            },
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?22:0-24:1'
        }
    );

    testMetrics(
        'f9_iife',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f9_iife',
            metrics: {declarationStmtCount: 1, executableStmtCount: 1, parametersCount: 1, callExpressionCount: 1},
            detail: {
                body: {
                    _type: 'BlockStatement',
                    metrics: {declarationStmtCount: 1, executableStmtCount: 1, parametersCount: 1, callExpressionCount: 1},
                    detail: {
                        body: [{
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
                                            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?26:5-28:5'
                                        }, arguments: [{_type: 'Literal'}]
                                    }
                                }
                            }
                        }]
                    }
                }
            },
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?25:0-29:1'
        }
    );

    testMetrics(
        'f10_returnSimple',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f10_returnSimple',
            metrics: {returnStmtCount: 1},
            detail: {
                body: {
                    _type: 'BlockStatement',
                    metrics: {returnStmtCount: 1},
                    detail: {body: [{_type: 'ReturnStatement', metrics: {returnStmtCount: 1}, detail: {argument: {_type: 'Literal'}}}]}
                }
            },
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?30:0-32:1'
        }
    );

    testMetrics(
        'f11_returnCall',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f11_returnCall',
            metrics: {returnStmtCount: 1, callExpressionCount: 1},
            detail: {
                body: {
                    _type: 'BlockStatement',
                    metrics: {returnStmtCount: 1, callExpressionCount: 1},
                    detail: {
                        body: [{
                            _type: 'ReturnStatement',
                            metrics: {returnStmtCount: 1, callExpressionCount: 1},
                            detail: {argument: {_type: 'CallExpression', metrics: {callExpressionCount: 1}, detail: {callee: {_type: 'Identifier'}}}}
                        }]
                    }
                }
            },
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?33:0-35:1'
        }
    );

    testMetrics(
        'f12_declarationAndSumExpressionStatement',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f12_declarationAndSumExpressionStatement',
            metrics: {declarationStmtCount: 2, executableStmtCount: 1, returnStmtCount: 1, callExpressionCount: 1},
            detail: {
                body: {
                    _type: 'BlockStatement',
                    metrics: {declarationStmtCount: 2, executableStmtCount: 1, callExpressionCount: 1, returnStmtCount: 1},
                    detail: {
                        body: [{
                            _type: 'VariableDeclaration',
                            metrics: {declarationStmtCount: 2},
                            detail: {
                                declarations: [{
                                    _type: 'VariableDeclarator',
                                    metrics: {declarationStmtCount: 1},
                                    detail: {id: {_type: 'Identifier'}, init: {_type: 'Literal'}}
                                }, {_type: 'VariableDeclarator', metrics: {declarationStmtCount: 1}, detail: {id: {_type: 'Identifier'}}}]
                            }
                        }, {
                            _type: 'ExpressionStatement',
                            metrics: {executableStmtCount: 1, callExpressionCount: 1},
                            detail: {
                                expression: {
                                    _type: 'AssignmentExpression',
                                    metrics: {callExpressionCount: 1},
                                    detail: {
                                        left: {_type: 'Identifier'},
                                        right: {
                                            _type: 'BinaryExpression',
                                            metrics: {callExpressionCount: 1},
                                            detail: {
                                                left: {_type: 'Identifier'},
                                                right: {_type: 'CallExpression', metrics: {callExpressionCount: 1}, detail: {callee: {_type: 'Identifier'}}}
                                            }
                                        }
                                    }
                                }
                            }
                        }, {_type: 'ReturnStatement', metrics: {returnStmtCount: 1}, detail: {argument: {_type: 'Identifier'}}}]
                    }
                }
            },
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?36:0-40:1'
        }
    );

    testMetrics(
        'f13_for',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f13_for',
            metrics: {parametersCount: 1, declarationStmtCount: 2, executableStmtCount: 1},
            detail: {
                body: {
                    _type: 'BlockStatement',
                    metrics: {declarationStmtCount: 2, executableStmtCount: 1},
                    detail: {
                        body: [{
                            _type: 'ForStatement',
                            metrics: {declarationStmtCount: 2, executableStmtCount: 1},
                            detail: {
                                init: {
                                    _type: 'VariableDeclaration',
                                    metrics: {declarationStmtCount: 2},
                                    detail: {
                                        declarations: [{
                                            _type: 'VariableDeclarator',
                                            metrics: {declarationStmtCount: 1},
                                            detail: {id: {_type: 'Identifier'}, init: {_type: 'Literal'}}
                                        }, {
                                            _type: 'VariableDeclarator',
                                            metrics: {declarationStmtCount: 1},
                                            detail: {id: {_type: 'Identifier'}, init: {_type: 'Literal'}}
                                        }]
                                    }
                                },
                                test: {
                                    _type: 'BinaryExpression',
                                    metrics: {},
                                    detail: {
                                        left: {_type: 'Identifier'},
                                        right: {
                                            _type: 'MemberExpression',
                                            metrics: {},
                                            detail: {object: {_type: 'Identifier'}, property: {_type: 'Identifier'}}
                                        }
                                    }
                                },
                                update: {_type: 'UpdateExpression', metrics: {}, detail: {argument: {_type: 'Identifier'}}},
                                body: {
                                    _type: 'BlockStatement',
                                    metrics: {executableStmtCount: 1},
                                    detail: {
                                        body: [{
                                            _type: 'ExpressionStatement',
                                            metrics: {executableStmtCount: 1},
                                            detail: {
                                                expression: {
                                                    _type: 'AssignmentExpression',
                                                    metrics: {},
                                                    detail: {
                                                        left: {_type: 'Identifier'},
                                                        right: {
                                                            _type: 'BinaryExpression',
                                                            metrics: {},
                                                            detail: {
                                                                left: {_type: 'Identifier'},
                                                                right: {
                                                                    _type: 'MemberExpression',
                                                                    metrics: {},
                                                                    detail: {object: {_type: 'Identifier'}, property: {_type: 'Identifier'}}
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }]
                                    }
                                }
                            }
                        }]
                    }
                }
            },
            loc: 'test/metrics/extractAllMetricsFromJsAstDemo.js?41:0-45:1'
        }
    );

});