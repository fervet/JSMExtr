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
    return bodyNodes.map(bodyNode => visit(bodyNode));
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
    constructor(declarationStmtCount, executableStmtCount, conditionalStmtCount, loopingStmtCount,
                maxNestingLevelOfControlConstructs, returnStmtCount, parametersCount, callExpressionCount)
    {
        this.declarationStmtCount = declarationStmtCount;
        this.executableStmtCount = executableStmtCount;
        this.conditionalStmtCount = conditionalStmtCount;
        this.loopingStmtCount = loopingStmtCount;
        this.maxNestingLevelOfControlConstructs = maxNestingLevelOfControlConstructs;
        this.returnStmtCount = returnStmtCount;
        this.parametersCount = parametersCount;
        this.callExpressionCount = callExpressionCount;
    }

    addMetrics(otherMetrics) {
        this.declarationStmtCount += otherMetrics.declarationStmtCount;
        this.executableStmtCount += otherMetrics.executableStmtCount;
        this.conditionalStmtCount += otherMetrics.conditionalStmtCount;
        this.loopingStmtCount += otherMetrics.loopingStmtCount;
        this.maxNestingLevelOfControlConstructs += otherMetrics.maxNestingLevelOfControlConstructs;
        this.returnStmtCount += otherMetrics.returnStmtCount;
        this.parametersCount += otherMetrics.parametersCount;
        this.callExpressionCount += otherMetrics.callExpressionCount;
    }
}

function visit(astNode, optionalFunctionMetrics) {
    const visitorFunction = visitor[astNode.type];
    if (!visitorFunction) {
        throw new Error("Couldn't find visitor for type: "+astNode.type);//+"\n\nNode: "+JSON.stringify(astNode, null, 4));
    }
    return visitorFunction(astNode, optionalFunctionMetrics);
}

const visitor = {
    FunctionDeclaration: visitFunctionDeclaration,
    ExpressionStatement: visitExpressionStatement,
    VariableDeclaration: visitVariableDeclaration,
    ForStatement: visitForStatement,
    IfStatement: visitIfStatement,
    SwitchStatement: visitSwitchStatement
};

function visitFunctionDeclaration(functionDeclarationNode) {
    const functionMetrics = new Metrics(1, 2, 3, 4, 5, 6, functionDeclarationNode.params.length, 8);
    const blockDetail = visitBlockStatement(functionDeclarationNode.body);
    functionMetrics.addMetrics(blockDetail.metrics);
    return {
        functionName: functionDeclarationNode.id.name,
        metrics: functionMetrics,
        detail: blockDetail
    };
}

function visitBlockStatement(blockStatementNode) {
    let statements = blockStatementNode.body;
    const statementsDetails = statements.map(statement => visit(statement));
    const blockMetrics = new Metrics(0, 0, 0, 0, 0, 0, 0, 0);
    return {
        metrics: blockMetrics,
        detail: statementsDetails
    };
}

function visitExpressionStatement(expressionStatementNode) {
    return { expressionType: expressionStatementNode.expression.type };
}

function visitVariableDeclaration(variableDeclarationNode) {
    return {
        statementType: 'VariableDeclaration',
        declarations: variableDeclarationNode.declarations.map(visitVariableDeclarator)
    };
}

function visitVariableDeclarator(variableDeclaratorNode) {
    return variableDeclaratorNode.id.name;
}

function visitForStatement() {
    return { statementType: 'ForStatement' };
}

function visitIfStatement() {
    return { statementType: 'IfStatement' };
}

function visitSwitchStatement() {
    return { statementType: 'SwitchStatement' };
}


