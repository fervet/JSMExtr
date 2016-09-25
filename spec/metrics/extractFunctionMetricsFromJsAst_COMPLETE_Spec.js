const extractJavaScriptASTsFromJsFile = require("../../src/parsing/extract-js-ast-from-js-file");
const functionMetricsFromJsAST = require("../../src/metrics/extract-function-metrics-from-js-ast");

describe("COMPLETE JS", function () {

    it("metrics from COMPLETE function", function () {
        const completeFunctionJsAST = extractJavaScriptASTsFromJsFile('spec/metrics/complete.js', 'utf8');

        let output = functionMetricsFromJsAST(completeFunctionJsAST);
        expect(output).toEqual([{
            _type: 'FunctionDeclaration',
            functionName: 'all',
            metrics: {parametersCount: 2},
            detail: {
                _type: 'BlockStatement',
                metrics: {},
                detail: [{
                    _type: 'VariableDeclaration',
                    declarations: [{_type: 'VariableDeclarator', variableName: 'sum'}]
                }, {
                    _type: 'VariableDeclaration',
                    declarations: [{_type: 'VariableDeclarator', variableName: 'other'}]
                }, {_type: 'ForStatement'}, {_type: 'IfStatement'}, {_type: 'SwitchStatement'}, {_type: 'ReturnStatement'}]
            }
        }]);
    });

});