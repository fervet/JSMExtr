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
                body: Program.extractDetailsAndAddMetricsForSingle(functionDeclarationNode.body, functionDeclarationMetrics)
            },
            loc: loc(functionDeclarationNode)
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitBlockStatement(blockStatementNode) {
        const blockMetrics = new Metrics();
        return {
            _type: 'BlockStatement',
            metrics: blockMetrics,
            detail: {
                body: Program.extractDetailsAndAddMetrics(blockStatementNode.body, blockMetrics)
            }
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitExpressionStatement(expressionStatementNode) {
        const expressionMetrics = new Metrics({executableStmtCount: 1});
        return {
            _type: 'ExpressionStatement',
            metrics: expressionMetrics,
            detail: {
                expression: Program.extractDetailsAndAddMetricsForSingle(expressionStatementNode.expression, expressionMetrics)
            }
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitCallExpression(callExpressionNode) {
        const callExpressionMetrics = new Metrics({callExpressionCount: 1});
        return {
            _type: 'CallExpression',
            // name: callExpressionNode.callee.name,
            metrics: callExpressionMetrics,
            detail: {
                callee: Program.extractDetailsAndAddMetricsForSingle(callExpressionNode.callee, callExpressionMetrics),
                arguments: Program.extractDetailsAndAddMetricsForOptional(callExpressionNode.arguments, callExpressionMetrics)
            }
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitAssignmentExpression(assignmentExpressionNode) {
        const assignmentExpressionMetrics = new Metrics();
        return {
            _type: 'AssignmentExpression',
            metrics: assignmentExpressionMetrics,
            detail: {
                left: Program.extractDetailsAndAddMetricsForSingle(assignmentExpressionNode.left, assignmentExpressionMetrics),
                right: Program.extractDetailsAndAddMetricsForSingle(assignmentExpressionNode.right, assignmentExpressionMetrics)
            }
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitFunctionExpression(functionExpressionNode) {
        const functionExpressionMetrics = new Metrics({parametersCount: functionExpressionNode.params.length});
        return {
            _type: 'FunctionExpression',
            functionName: (functionExpressionNode.id ? functionExpressionNode.id.name : undefined),
            metrics: functionExpressionMetrics,
            detail: {
                body: Program.extractDetailsAndAddMetricsForSingle(functionExpressionNode.body, functionExpressionMetrics)
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
    static visitMemberExpression(memberExpressionNode) {
        const memberExpressionMetrics = new Metrics();
        return {
            _type: 'MemberExpression',
            metrics: memberExpressionMetrics,
            detail: {
                object: Program.extractDetailsAndAddMetricsForSingle(memberExpressionNode.object, memberExpressionMetrics),
                property: Program.extractDetailsAndAddMetricsForSingle(memberExpressionNode.property, memberExpressionMetrics)
            }
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
    static visitVariableDeclaration(variableDeclarationNode) {
        const variableDeclarationMetrics = new Metrics();
        return {
            _type: 'VariableDeclaration',
            metrics: variableDeclarationMetrics,
            detail: {
                declarations: Program.extractDetailsAndAddMetrics(variableDeclarationNode.declarations, variableDeclarationMetrics)
            }
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
                init: Program.extractDetailsAndAddMetricsForOptionalSingle(variableDeclaratorNode.init, variableDeclaratorMetrics)
            }
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitForStatement(forStatementNode) {
        const forMetrics = new Metrics();
        return {
            _type: 'ForStatement',
            metrics: forMetrics,
            detail: {
                init: Program.extractDetailsAndAddMetricsForSingle(forStatementNode.init, forMetrics),
                test: Program.extractDetailsAndAddMetricsForSingle(forStatementNode.test, forMetrics),
                update: Program.extractDetailsAndAddMetricsForSingle(forStatementNode.update, forMetrics),
                body: Program.extractDetailsAndAddMetrics(forStatementNode.body.body, forMetrics),
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
    static visitReturnStatement(returnStatementNode) {
        const returnMetrics = new Metrics({returnStmtCount: 1});
        return {
            _type: 'ReturnStatement',
            metrics: returnMetrics,
            detail: {
                argument: Program.extractDetailsAndAddMetricsForSingle(returnStatementNode.argument, returnMetrics),
            }
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitBinaryExpression(binaryExpressionNode) {
        const binaryExpressionMetrics = new Metrics();
        return {
            _type: 'BinaryExpression',
            metrics: binaryExpressionMetrics,
            detail: {
                left: Program.extractDetailsAndAddMetricsForSingle(binaryExpressionNode.left, binaryExpressionMetrics),
                right: Program.extractDetailsAndAddMetricsForSingle(binaryExpressionNode.right, binaryExpressionMetrics)
            }
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