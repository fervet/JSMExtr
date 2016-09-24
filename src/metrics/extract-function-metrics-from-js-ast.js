/**
 * Given a JavaScript AST, returns its metrics.
 */
module.exports = function (jsAST) {
    if (Array.isArray(jsAST)) {
        return visitArrayOfNodes(jsAST);
    }
    return visit(jsAST);
};

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
        functionMetrics: visitBlockStatement(functionDeclarationNode.body)
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


