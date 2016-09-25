const extractJavaScriptASTsFromHtmlFile = require("./parsing/extract-js-asts-from-html-file");
const functionMetricsFromJsAST = require("./metrics/extract-function-metrics-from-js-ast");

const jsASTs = extractJavaScriptASTsFromHtmlFile('spec/demo/portal.html', 'utf8');
// console.log(JSON.stringify(jsASTs));
const functionMetrics = functionMetricsFromJsAST(jsASTs);
// console.log(JSON.stringify(functionMetrics, null, 4));
console.log("##########################################################");
console.log("##########################################################");
console.log("##########################################################");

functionMetrics.forEach(metrics => {
    delete metrics.detail;
    if (metrics._type === 'FunctionDeclaration') {
        metrics.functionName = `${metrics.fileLocation} ~ ${metrics.functionName}`;
        delete metrics.fileLocation;
    }
});

let toPrint = {
    nomeFuncao: [],
    declarationStmtCount: [],
    executableStmtCount: [],
    returnStmtCount: [],
    parametersCount: [],
    callExpressionCount: []
};
functionMetrics.forEach(f => {
    if (f._type === 'FunctionDeclaration') {
        toPrint.nomeFuncao.push(f.functionName);
        toPrint.declarationStmtCount.push(f.metrics.declarationStmtCount || 0);
        toPrint.executableStmtCount.push(f.metrics.executableStmtCount || 0);
        toPrint.returnStmtCount.push(f.metrics.returnStmtCount || 0);
        toPrint.parametersCount.push(f.metrics.parametersCount || 0);
        toPrint.callExpressionCount.push(f.metrics.callExpressionCount || 0);
    }
});

let out = `
js <-
structure(
	list(
		nomeFuncao = c("${toPrint.nomeFuncao.join('", "')}"),
		declarationStmtCount = c(${toPrint.declarationStmtCount.join(", ")}),
		executableStmtCount = c(${toPrint.executableStmtCount.join(", ")}),
		returnStmtCount = c(${toPrint.returnStmtCount.join(", ")}),
		parametersCount = c(${toPrint.parametersCount.join(", ")}),
		callExpressionCount = c(${toPrint.callExpressionCount.join(", ")})
	),
	.Names = c("nomeFuncao", "declarationStmtCount", "executableStmtCount", "returnStmtCount", "parametersCount", "callExpressionCount"),
	class = "data.frame",
	row.names = c(NA, ${toPrint.nomeFuncao.length}L)
)`;

console.log(JSON.stringify(functionMetrics, null, 4));

console.log("#####################################");
console.log("#####################################");
console.log(out);
