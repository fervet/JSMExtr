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
    f7_callCallArgs: completeMetrics[6]
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
                        metrics: {declarationStmtCount: 1},
                        detail: {}
                    }]
                }]
            }
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
                        detail: {}
                    }, {
                        _type: 'VariableDeclarator',
                        variableName: 'b',
                        metrics: {declarationStmtCount: 1},
                        detail: {}
                    }]
                }]
            }
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
                        detail: {init: [{_type: 'Literal'}]}
                    }]
                }]
            }
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
                        detail: {init: [{_type: 'CallExpression', metrics: {callExpressionCount: 1}}]}
                    }]
                }]
            }
        }
    );

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
                    detail: [{_type: 'CallExpression', metrics: {callExpressionCount: 1}}]
                }]
            }
        }
    );

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
                    detail: [{_type: 'CallExpression', metrics: {callExpressionCount: 1}}]
                }]
            }
        }
    );

    testMetrics(
        'f7_callCallArgs',
        {
            _type: 'FunctionDeclaration',
            functionName: 'f7_callCallArgs',
            metrics: {callExpressionCount: 1},
            detail: {
                _type: 'BlockStatement',
                metrics: {callExpressionCount: 1},
                detail: [{
                    _type: 'ExpressionStatement',
                    metrics: {callExpressionCount: 1},
                    detail: [{_type: 'CallExpression', metrics: {callExpressionCount: 1}}]
                }]
            }
        }
    );

});