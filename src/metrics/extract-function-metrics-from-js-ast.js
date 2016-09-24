/**
 * Given a JavaScript AST, returns its metrics.
 */
module.exports = function (jsAST) {
    if (Array.isArray(jsAST)) {
        return visitArrayOfNodes(jsAST);
    }
    return visit(jsAST);
};

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
class FunctionMetrics {
    constructor(declarationStmtCount, executableStmtCount, conditionalStmtCount, loopingStmtCount,
                maxNestingLevelOfControlConstructs, returnStmtCount, parametersCount, callExpressionCount)
    {
        //noinspection JSUnusedGlobalSymbols
        this.declarationStmtCount = declarationStmtCount;
        //noinspection JSUnusedGlobalSymbols
        this.executableStmtCount = executableStmtCount;
        //noinspection JSUnusedGlobalSymbols
        this.conditionalStmtCount = conditionalStmtCount;
        //noinspection JSUnusedGlobalSymbols
        this.loopingStmtCount = loopingStmtCount;
        //noinspection JSUnusedGlobalSymbols
        this.maxNestingLevelOfControlConstructs = maxNestingLevelOfControlConstructs;
        //noinspection JSUnusedGlobalSymbols
        this.returnStmtCount = returnStmtCount;
        //noinspection JSUnusedGlobalSymbols
        this.parametersCount = parametersCount;
        //noinspection JSUnusedGlobalSymbols
        this.callExpressionCount = callExpressionCount;
    }
}

function visitArrayOfNodes(arrayOfAstNodes) {
    let metrics = arrayOfAstNodes.map(astNode => visit(astNode));
    return [].concat.apply([], metrics);
}

function visit(astNode) {
    const visitorFunction = visitor[astNode.type];
    if (!visitorFunction) {
        throw new Error("Couldn't find visitor for type: "+astNode.type);//+"\n\nNode: "+JSON.stringify(astNode, null, 4));
    }
    return visitorFunction(astNode);
}

const visitor = {
    Program: visitProgram,
    FunctionDeclaration: visitFunctionDeclaration,
    ExpressionStatement: visitExpressionStatement,
    VariableDeclaration: visitVariableDeclaration,
    ForStatement: visitForStatement,
    IfStatement: visitIfStatement,
    SwitchStatement: visitSwitchStatement
};

function visitProgram(programNode) {
    let bodyNodes = programNode.body;
    return bodyNodes.map(bodyNode => visit(bodyNode));
}

function visitFunctionDeclaration(functionDeclarationNode) {
    return {
        functionName: functionDeclarationNode.id.name,
        functionMetrics: new FunctionMetrics(1,2,3,4,5,6, functionDeclarationNode.params.length,8),
        metricsDetail: visitBlockStatement(functionDeclarationNode.body)
    };
}

function visitBlockStatement(blockStatementNode) {
    let statements = blockStatementNode.body;
    return statements.map(statement => visit(statement));
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


