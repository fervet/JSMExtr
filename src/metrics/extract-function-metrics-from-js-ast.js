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
    constructor({declarationStmtCount=0, executableStmtCount=0, conditionalStmtCount=0, loopingStmtCount=0,
       maxNestingLevelOfControlConstructs=0, returnStmtCount=0, parametersCount=0, callExpressionCount=0} = {})
    {
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
        if (otherMetrics[propName]) {
            this[propName] = (this[propName] || 0) + otherMetrics[propName];
        }
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
    const functionMetrics = new Metrics({parametersCount: functionDeclarationNode.params.length});
    const blockDetail = visitBlockStatement(functionDeclarationNode.body);
    functionMetrics.addMetrics(blockDetail.metrics);
    return {
        functionName: functionDeclarationNode.id.name,
        metrics: functionMetrics,
        detail: blockDetail
    };
}

function visitBlockStatement(blockStatementNode) {
    const blockMetrics = new Metrics();
    let statements = blockStatementNode.body;
    const statementsDetails = statements.map(statement => visit(statement));
    statementsDetails.forEach(stmtDetail => blockMetrics.addMetrics(stmtDetail.metrics));
    return {
        metrics: blockMetrics,
        detail: statementsDetails
    };
}

function visitExpressionStatement(expressionStatementNode) {
    const expressionMetrics = new Metrics();
    if (expressionStatementNode.expression.type === 'CallExpression') {
        expressionMetrics.addMetrics({callExpressionCount: 1})
    }
    return {
        metrics: expressionMetrics,
        expressionType: expressionStatementNode.expression.type
    };
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


