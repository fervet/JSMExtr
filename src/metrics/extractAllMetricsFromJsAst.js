const isObject = require("../utils/isObject");
const clearEmptyProperties = require("../utils/clearEmptyProperties");
const Metrics = require("./Metrics");

/**
 * Given a JavaScript AST, returns its metrics.
 */
module.exports = function (jsAST) {
    const metrics = extractMetrics(jsAST);
    return clearEmptyProperties(metrics);
};

function extractMetrics(jsAST) {
    if (Array.isArray(jsAST)) {
        return visitArrayOfPrograms(jsAST);
    }
    return visitProgram(jsAST);
}

function visitArrayOfPrograms(arrayOfAstProgramNodes) {
    let metrics = arrayOfAstProgramNodes.map(astProgramNode => visitProgram(astProgramNode));
    return [].concat.apply([], metrics);
}

function visitProgram(programNode) {
    let bodyNodes = programNode.body;
    const metrics = bodyNodes.map(bodyNode => Program.visit(bodyNode));
    fixLoc(metrics, programNode.fileLocation);
    return metrics;
}

function fixLoc(metrics, fileLocation) {
    let toFix = [];
    toFix.push(...metrics);
    while (toFix.length > 0) {
        let thisMetric = toFix.pop();
        if (thisMetric === undefined) {
            continue;
        }

        if (thisMetric._type === 'FunctionDeclaration' || thisMetric._type === 'FunctionExpression') {
            thisMetric.loc = `${fileLocation}?${thisMetric.loc}`;
        }

        if (thisMetric.detail) {
            Object.keys(thisMetric.detail).forEach(key => {
                let thisDetail = thisMetric.detail[key];
                if (Array.isArray(thisDetail)) {
                    toFix.push(...thisDetail);
                } else {
                    toFix.push(thisDetail);
                }
            });
        }
    }
}


class Program {
    static visit(astNode) {
        const visitorFunction = Visitors['visit'+astNode.type];
        if (!visitorFunction) {
            throw new Error("Couldn't find visitor for type: " + astNode.type);//+"\n\nNode: "+JSON.stringify(astNode, null, 4));
        }
        return visitorFunction(astNode);
    }

    static extractDetailsAndAddMetrics(statements, metrics) {
        const statementsDetails = statements.map(statement => Program.visit(statement));
        statementsDetails.forEach(stmtDetail => metrics.addMetrics(stmtDetail.metrics));
        return statementsDetails;
    }

    static extractDetailsAndAddMetricsForSingle(stmt, metrics) {
        const metricsForSingle = this.extractDetailsAndAddMetrics([stmt], metrics);
        if (metricsForSingle.length !== 1) {
            throw new Error("Single should always return 1! This is unexpected!");
        }
        return metricsForSingle[0];
    }

    static extractDetailsAndAddMetricsForOptional(statements, metrics) {
        if (!statements) {
            return undefined;
        }
        if (!Array.isArray(statements)) {
            throw new Error("Argument must be an array!");
        }
        return this.extractDetailsAndAddMetrics(statements, metrics);
    }

    static extractDetailsAndAddMetricsForOptionalSingle(stmt, metrics) {
        if (!stmt) {
            return undefined;
        }
        return this.extractDetailsAndAddMetricsForSingle(stmt, metrics);
    }

    static extractDetailsAndAddMetricsGeneral(node, metrics) {
        if (node === null || node === undefined) {
            return undefined;
        }
        if (Array.isArray(node)) {
            return this.extractDetailsAndAddMetrics(node, metrics);
        }
        if (!isObject(node)) {
            // a token like operator:"=" or name:"stuff"
            return undefined;
        }
        return this.extractDetailsAndAddMetricsForSingle(node, metrics);
    }
}

function loc(locableNode) {
    return `${locableNode.loc.start.line}:${locableNode.loc.start.column}-${locableNode.loc.end.line}:${locableNode.loc.end.column}`
}

class Visitors {

    //noinspection JSUnusedGlobalSymbols
    static visitFunctionDeclaration(functionDeclarationNode) {
        const functionDeclarationMetrics = new Metrics({parametersCount: functionDeclarationNode.params.length});
        return {
            _type: 'FunctionDeclaration',
            functionName: functionDeclarationNode.id.name,
            metrics: functionDeclarationMetrics,
            detail: {
                body: Program.extractDetailsAndAddMetricsGeneral(functionDeclarationNode.body, functionDeclarationMetrics)
            },
            loc: loc(functionDeclarationNode)
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitExpressionStatement(expressionStatementNode) {
        const expressionMetrics = new Metrics({executableStmtCount: 1});
        return Visitors.visitGeneralNode(expressionStatementNode, expressionMetrics);
    }

    static visitGeneralNode(node, metrics) {
        const result = {
            _type: node.type,
            metrics: metrics,
            detail: {}
        };
        Object.keys(node).filter(key => key !== 'type' && key !== 'loc').forEach(key => {
            result.detail[key] = Program.extractDetailsAndAddMetricsGeneral(node[key], metrics);
        });
        return result;
    }

    //noinspection JSUnusedGlobalSymbols
    static visitorWithoutMetrics(node) {
        return Visitors.visitGeneralNode(node, new Metrics());
    }

    //noinspection JSUnusedGlobalSymbols
    static visitorWithMetrics(metrics) {
        return function (node) {
            return Visitors.visitGeneralNode(node, new Metrics(metrics));
        };
    };

    //noinspection JSUnusedGlobalSymbols
    static visitFunctionExpression(functionExpressionNode) {
        const functionExpressionMetrics = new Metrics({parametersCount: functionExpressionNode.params.length});
        return {
            _type: 'FunctionExpression',
            functionName: (functionExpressionNode.id ? functionExpressionNode.id.name : undefined),
            metrics: functionExpressionMetrics,
            detail: {
                body: Program.extractDetailsAndAddMetricsGeneral(functionExpressionNode.body, functionExpressionMetrics)
            },
            loc: loc(functionExpressionNode)
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitNewExpression() {
        return {
            _type: 'NewExpression',
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitObjectExpression() {
        return {
            _type: 'ObjectExpression',
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitArrayExpression() {
        return {
            _type: 'ArrayExpression',
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitLiteral() {
        return {
            _type: 'Literal'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitIdentifier() {
        return {
            _type: 'Identifier'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitVariableDeclarator(variableDeclaratorNode) {
        const variableDeclaratorMetrics = new Metrics({declarationStmtCount: 1});
        return {
            _type: 'VariableDeclarator',
            variableName: variableDeclaratorNode.id.name,
            metrics: variableDeclaratorMetrics,
            detail: {
                init: Program.extractDetailsAndAddMetricsGeneral(variableDeclaratorNode.init, variableDeclaratorMetrics)
            }
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitForInStatement() {
        return {
            _type: 'ForInStatement'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitIfStatement() {
        return {
            _type: 'IfStatement'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitWhileStatement() {
        return {
            _type: 'WhileStatement'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitSwitchStatement() {
        return {
            _type: 'SwitchStatement'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitUnaryExpression() {
        return {
            _type: 'UnaryExpression'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitConditionalExpression() {
        return {
            _type: 'ConditionalExpression'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitLogicalExpression() {
        return {
            _type: 'LogicalExpression'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitUpdateExpression() {
        return {
            _type: 'UpdateExpression'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitThisExpression() {
        return {
            _type: 'ThisExpression'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitTryStatement() {
        return {
            _type: 'TryStatement'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitEmptyStatement() {
        return {
            _type: 'EmptyStatement'
        };
    }

}

Visitors.visitBlockStatement = Visitors.visitorWithoutMetrics;
Visitors.visitAssignmentExpression = Visitors.visitorWithoutMetrics;
Visitors.visitBinaryExpression = Visitors.visitorWithoutMetrics;
Visitors.visitVariableDeclaration = Visitors.visitorWithoutMetrics;
Visitors.visitMemberExpression = Visitors.visitorWithoutMetrics;
Visitors.visitForStatement = Visitors.visitorWithoutMetrics;
Visitors.visitCallExpression = Visitors.visitorWithMetrics({callExpressionCount: 1});
Visitors.visitReturnStatement = Visitors.visitorWithMetrics({returnStmtCount: 1});
