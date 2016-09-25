/**
 * Given a JavaScript AST, returns its metrics.
 */
module.exports = function (jsAST) {
    if (Array.isArray(jsAST)) {
        return visitArrayOfPrograms(jsAST);
    }
    return visitProgram(jsAST);
};

function visitArrayOfPrograms(arrayOfAstProgramNodes) {
    let metrics = arrayOfAstProgramNodes.map(astProgramNode => visitProgram(astProgramNode));
    return [].concat.apply([], metrics);
}

function visitProgram(programNode) {
    let bodyNodes = programNode.body;
    return bodyNodes.map(bodyNode => Visitors.visitStatement(bodyNode));
}

/*
 Number of declaration statements (Decl.)
 Number of executable statements (Stmt.)
 Number of conditional statements (Cond.)
 Number of looping statements (Loop)
 Maximum nesting level of control constructs (Nest)
 Number of return statements (Ret.)
 Number of parameters (Param.)
 Number of called functions (Call)
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

class Visitors {
    static visit(astNode, visitors) {
        const visitorFunction = visitors[astNode.type];
        if (!visitorFunction) {
            throw new Error("Couldn't find visitor for type: " + astNode.type);//+"\n\nNode: "+JSON.stringify(astNode, null, 4));
        }
        return visitorFunction(astNode);
    }

    static visitStatement(astNode) {
        return Visitors.visit(astNode, this.statementVisitors);
    }

    static extractDetailsAndAddMetricsFromStatement(statements, metrics) {
        const statementsDetails = statements.map(statement => Visitors.visitStatement(statement));
        statementsDetails.forEach(stmtDetail => metrics.addMetrics(stmtDetail.metrics));
        return statementsDetails;
    }
}
Visitors.statementVisitors = {
    FunctionDeclaration: visitFunctionDeclaration,
    ExpressionStatement: visitExpressionStatement,
    VariableDeclaration: visitVariableDeclaration,
    ForStatement: visitForStatement,
    IfStatement: visitIfStatement,
    SwitchStatement: visitSwitchStatement,
    ReturnStatement: visitReturnStatement,
    BinaryExpression: visitBinaryExpression,
    UpdateExpression: visitUpdateExpression
};

function visitFunctionDeclaration(functionDeclarationNode) {
    const functionMetrics = new Metrics({parametersCount: functionDeclarationNode.params.length});
    const blockDetail = visitBlockStatement(functionDeclarationNode.body);
    functionMetrics.addMetrics(blockDetail.metrics);
    return {
        _type: 'FunctionDeclaration',
        functionName: functionDeclarationNode.id.name,
        metrics: functionMetrics,
        detail: blockDetail
    };
}

function visitBlockStatement(blockStatementNode) {
    const blockMetrics = new Metrics();
    return {
        _type: 'BlockStatement',
        metrics: blockMetrics,
        detail: Visitors.extractDetailsAndAddMetricsFromStatement(blockStatementNode.body, blockMetrics)
    };
}

function visitExpressionStatement(expressionStatementNode) {
    const expressionMetrics = new Metrics();
    if (expressionStatementNode.expression.type === 'CallExpression') {
        expressionMetrics.addMetrics({callExpressionCount: 1})
    }
    if (expressionStatementNode.expression.type === 'AssignmentExpression') {
    }
    return {
        _type: 'ExpressionStatement',
        metrics: expressionMetrics,
        expressionType: expressionStatementNode.expression.type
    };
}

function visitVariableDeclaration(variableDeclarationNode) {
    const declarationMetrics = new Metrics({declarationStmtCount: variableDeclarationNode.declarations.length});
    return {
        _type: 'VariableDeclaration',
        metrics: declarationMetrics,
        declarations: variableDeclarationNode.declarations.map(visitVariableDeclarator)
    };
}

function visitVariableDeclarator(variableDeclaratorNode) {
    return {
        _type: 'VariableDeclarator',
        variableName: variableDeclaratorNode.id.name
    };
}

function visitForStatement(forStatementNode) {
    const forMetrics = new Metrics();
    return {
        _type: 'ForStatement',
        metrics: forMetrics,
        detail: {
            init: Visitors.extractDetailsAndAddMetricsFromStatement([forStatementNode.init], forMetrics),
            test: Visitors.extractDetailsAndAddMetricsFromStatement([forStatementNode.test], forMetrics),
            update: Visitors.extractDetailsAndAddMetricsFromStatement([forStatementNode.update], forMetrics),
            body: Visitors.extractDetailsAndAddMetricsFromStatement(forStatementNode.body.body, forMetrics),
        }
    };
}

function visitIfStatement() {
    return {
        _type: 'IfStatement'
    };
}

function visitSwitchStatement() {
    return {
        _type: 'SwitchStatement'
    };
}

function visitReturnStatement() {
    return {
        _type: 'ReturnStatement'
    };
}

function visitBinaryExpression() {
    return {
        _type: 'BinaryExpression'
    };
}

function visitUpdateExpression() {
    return {
        _type: 'UpdateExpression'
    };
}

