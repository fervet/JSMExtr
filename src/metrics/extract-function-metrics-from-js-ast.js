const clearEmptyProperties = require("../utils/clearEmptyProperties");

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
    metrics.forEach(metric => {
        if (metric.loc) {
            metric.fileLocation = `${programNode.fileLocation}?${metric.loc}`;
            metric.loc = undefined;
        } else {
            metric.fileLocation = programNode.fileLocation  ;
        }
    });
    return metrics;
}


/*
 Number of declaration statements (Decl.) ------------------------ DONE
 Number of executable statements (Stmt.) ------------------------- TODO
 Number of conditional statements (Cond.) ------------------------ TODO
 Number of looping statements (Loop) ----------------------------- TODO
 Maximum nesting level of control constructs (Nest) -------------- TODO
 Number of return statements (Ret.) ------------------------------ DONE
 Number of parameters (Param.) ----------------------------------- DONE
 Number of called functions (Call) ------------------------------- DONE
 */
class Metrics {
    constructor({
        declarationStmtCount = 0, executableStmtCount = 0, conditionalStmtCount = 0, loopingStmtCount = 0,
        maxNestingLevelOfControlConstructs = 0, returnStmtCount = 0, parametersCount = 0, callExpressionCount = 0
    } = {}) {
        if (declarationStmtCount) this.declarationStmtCount = declarationStmtCount;
        if (executableStmtCount) this.executableStmtCount = executableStmtCount;
        if (conditionalStmtCount) this.conditionalStmtCount = conditionalStmtCount;
        if (loopingStmtCount) this.loopingStmtCount = loopingStmtCount;
        if (maxNestingLevelOfControlConstructs) this.maxNestingLevelOfControlConstructs = maxNestingLevelOfControlConstructs;
        if (returnStmtCount) this.returnStmtCount = returnStmtCount;
        if (parametersCount) this.parametersCount = parametersCount;
        if (callExpressionCount) this.callExpressionCount = callExpressionCount;
    }

    addMetrics(otherMetrics) {
        this.add('declarationStmtCount', otherMetrics);
        this.add('executableStmtCount', otherMetrics);
        this.add('conditionalStmtCount', otherMetrics);
        this.add('loopingStmtCount', otherMetrics);
        this.add('maxNestingLevelOfControlConstructs', otherMetrics);
        this.add('returnStmtCount', otherMetrics);
        this.add('parametersCount', otherMetrics);
        this.add('callExpressionCount', otherMetrics);
    }

    add(propName, otherMetrics) {
        if (otherMetrics && otherMetrics[propName]) {
            this[propName] = (this[propName] || 0) + otherMetrics[propName];
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
            detail: Program.extractDetailsAndAddMetricsForSingle(functionDeclarationNode.body, functionDeclarationMetrics),
            loc: loc(functionDeclarationNode)
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitBlockStatement(blockStatementNode) {
        const blockMetrics = new Metrics();
        return {
            _type: 'BlockStatement',
            metrics: blockMetrics,
            detail: Program.extractDetailsAndAddMetrics(blockStatementNode.body, blockMetrics)
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitExpressionStatement(expressionStatementNode) {
        const expressionMetrics = new Metrics();
        return {
            _type: 'ExpressionStatement',
            metrics: expressionMetrics,
            detail: Program.extractDetailsAndAddMetrics([expressionStatementNode.expression], expressionMetrics)
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
    static visitAssignmentExpression() {
        return {
            _type: 'AssignmentExpression',
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitFunctionExpression(functionExpressionNode) {
        const functionExpressionMetrics = new Metrics({parametersCount: functionExpressionNode.params.length});
        return {
            _type: 'FunctionExpression',
            functionName: (functionExpressionNode.id ? functionExpressionNode.id.name : undefined),
            metrics: functionExpressionMetrics,
            detail: Program.extractDetailsAndAddMetricsForSingle(functionExpressionNode.body, functionExpressionMetrics),
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
            declarations: Program.extractDetailsAndAddMetrics(variableDeclarationNode.declarations, variableDeclarationMetrics)
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
                init: Program.extractDetailsAndAddMetrics([forStatementNode.init], forMetrics),
                test: Program.extractDetailsAndAddMetrics([forStatementNode.test], forMetrics),
                update: Program.extractDetailsAndAddMetrics([forStatementNode.update], forMetrics),
                body: Program.extractDetailsAndAddMetrics(forStatementNode.body.body, forMetrics),
            }
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitIfStatement() {
        return {
            _type: 'IfStatement'
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
    static visitBinaryExpression() {
        return {
            _type: 'BinaryExpression'
        };
    }

    //noinspection JSUnusedGlobalSymbols
    static visitUpdateExpression() {
        return {
            _type: 'UpdateExpression'
        };
    }

}