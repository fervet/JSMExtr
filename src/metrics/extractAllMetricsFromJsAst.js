const isObject = require("../utils/isObject");
const isEmptyObject = require("../utils/isEmptyObject");
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
            throw new Error("Couldn't find visitor for type: " + astNode.type + "\n"+JSON.stringify(astNode,null,4));
        }
        return visitorFunction(astNode);
    }

    static extractDetailsAndAddMetrics(statements, metrics) {
        try {
            const statementsDetails = statements.map(statement => Program.visit(statement));
            statementsDetails.forEach(stmtDetail => metrics.addMetrics(stmtDetail.metrics));
            return statementsDetails;
        } catch (e) {
            throw new Error(`Error for statements:\n${JSON.stringify(statements, null, 2)}.\n\nError was: `+e);
        }
    }

    static extractDetailsAndAddMetricsForSingle(stmt, metrics) {
        const metricsForSingle = this.extractDetailsAndAddMetrics([stmt], metrics);
        if (metricsForSingle.length !== 1) {
            throw new Error("Single should always return 1! This is unexpected!");
        }
        return metricsForSingle[0];
    }

    static extractDetailsAndAddMetricsGeneral(node, metrics) {
        if (node === null || node === undefined || isEmptyObject(node)) {
            return {};
        }
        if (Array.isArray(node)) {
            return this.extractDetailsAndAddMetrics(node, metrics);
        }
        if (!isObject(node)) {
            // a token like operator:"=" or name:"stuff"
            return {};
        }
        if (!node.type) {
            let details = {};
            Object.keys(node).forEach(key => {
                details[key] = this.extractDetailsAndAddMetricsGeneral(node[key], metrics);
            });
            return details;
        }
        return this.extractDetailsAndAddMetricsForSingle(node, metrics);
    }

}

function loc(locable) {
    return `${locable.loc.start.line}:${locable.loc.start.column}-${locable.loc.end.line}:${locable.loc.end.column}`
}

class Visitors {

    //noinspection JSUnusedGlobalSymbols
    static visitFunctionDeclaration(functionDeclarationNode) {
        const functionDeclarationMetrics = new Metrics({m: Metrics.parametersCount, c: functionDeclarationNode.params.length});
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
    static visitFunctionExpression(functionExpressionNode) {
        const functionExpressionMetrics = new Metrics({m: Metrics.parametersCount, c: functionExpressionNode.params.length});
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

    static visitorWithoutMetrics(node) {
        return Visitors.visitGeneralNode(node, new Metrics());
    }

    static visitorWithMetrics(metrics) {
        return function (node) {
            return Visitors.visitGeneralNode(node, new Metrics(metrics));
        };
    };

}

Visitors.visitBlockStatement = Visitors.visitorWithoutMetrics;
Visitors.visitAssignmentExpression = Visitors.visitorWithMetrics({m: Metrics.assignmentExprs, c: 1});
Visitors.visitBinaryExpression = Visitors.visitorWithoutMetrics;
Visitors.visitVariableDeclaration = Visitors.visitorWithoutMetrics;
Visitors.visitMemberExpression = Visitors.visitorWithMetrics({m: Metrics.memberExprs, c: 1});
Visitors.visitCallExpression = Visitors.visitorWithMetrics({m: Metrics.callExprs, c: 1});
Visitors.visitReturnStatement = Visitors.visitorWithMetrics({m: Metrics.returnStmts, c: 1});
Visitors.visitVariableDeclarator = Visitors.visitorWithMetrics({m: Metrics.declarationStmts, c: 1});
Visitors.visitExpressionStatement = Visitors.visitorWithMetrics({m: Metrics.executableStmts, c: 1});

// LOOPs
Visitors.visitForStatement = Visitors.visitorWithMetrics({m: Metrics.loopStmts, c: 1});
Visitors.visitWhileStatement = Visitors.visitorWithMetrics({m: Metrics.loopStmts, c: 1}); // no test
Visitors.visitForInStatement = Visitors.visitorWithMetrics({m: Metrics.loopStmts, c: 1}); // no test
Visitors.visitBreakStatement = Visitors.visitorWithoutMetrics; // no test
Visitors.visitContinueStatement = Visitors.visitorWithoutMetrics; // no test

// CONDITIONALs
Visitors.visitIfStatement = Visitors.visitorWithMetrics({m: Metrics.conditionalStmts, c: 1}); // no test
Visitors.visitSwitchStatement = Visitors.visitorWithoutMetrics; // no test
Visitors.visitSwitchCase = Visitors.visitorWithMetrics({m: Metrics.conditionalStmts, c: 1}); // no test
Visitors.visitConditionalExpression = Visitors.visitorWithMetrics({m: Metrics.conditionalStmts, c: 1}); // no test

Visitors.visitLogicalExpression = Visitors.visitorWithoutMetrics; // no test
Visitors.visitUnaryExpression = Visitors.visitorWithoutMetrics; // no test
Visitors.visitNewExpression = Visitors.visitorWithMetrics({m: Metrics.newExprs, c: 1}); // no test
Visitors.visitObjectExpression = Visitors.visitorWithoutMetrics; // no test
Visitors.visitArrayExpression = Visitors.visitorWithoutMetrics; // no test
Visitors.visitProperty = Visitors.visitorWithoutMetrics; // no test
Visitors.visitEmptyStatement = Visitors.visitorWithoutMetrics; // no test
Visitors.visitUpdateExpression = Visitors.visitorWithoutMetrics; // no test
Visitors.visitThisExpression = Visitors.visitorWithoutMetrics; // no test
Visitors.visitTryStatement = Visitors.visitorWithoutMetrics; // no test
Visitors.visitCatchClause = Visitors.visitorWithoutMetrics; // no test
Visitors.visitIdentifier = Visitors.visitorWithoutMetrics; // no test
Visitors.visitLiteral = Visitors.visitorWithoutMetrics; // no test
