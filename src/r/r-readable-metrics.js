// const functionMetrics = functionMetricsFromJsAST(jsASTs);
const fs = require('fs');

function rReadableMetrics(functionMetricsOnly, fileName) {
    let toPrint = {
        functionName: [],
        fileLocation: [],
        declarationStmtCount: [],
        executableStmtCount: [],
        conditionalStmtCount: [],
        loopingStmtCount: [],
        returnStmtCount: [],
        parametersCount: [],
        callExpressionCount: [],
        newExpressionCount: [],
    };

    functionMetricsOnly.forEach(f => {
        toPrint.functionName.push(extractFunctionName(f, toPrint.functionName.length));
        toPrint.fileLocation.push(f.loc);
        toPrint.declarationStmtCount.push((f.metrics && f.metrics.declarationStmtCount) || 0);
        toPrint.executableStmtCount.push((f.metrics && f.metrics.executableStmtCount) || 0);
        toPrint.conditionalStmtCount.push((f.metrics && f.metrics.conditionalStmtCount) || 0);
        toPrint.loopingStmtCount.push((f.metrics && f.metrics.loopingStmtCount) || 0);
        toPrint.returnStmtCount.push((f.metrics && f.metrics.returnStmtCount) || 0);
        toPrint.parametersCount.push((f.metrics && f.metrics.parametersCount) || 0);
        toPrint.callExpressionCount.push((f.metrics && f.metrics.callExpressionCount) || 0);
        toPrint.newExpressionCount.push((f.metrics && f.metrics.newExpressionCount) || 0);
    });

    let fileContent = `js <-
structure(
	list(
		functionName = c("${toPrint.functionName.join('", "')}"),
		fileLocation = c("${toPrint.fileLocation.join('", "')}"),
		declarationStmtCount = c(${toPrint.declarationStmtCount.join(", ")}),
		executableStmtCount = c(${toPrint.executableStmtCount.join(", ")}),
		conditionalStmtCount = c(${toPrint.conditionalStmtCount.join(", ")}),
		loopingStmtCount = c(${toPrint.loopingStmtCount.join(", ")}),
		returnStmtCount = c(${toPrint.returnStmtCount.join(", ")}),
		parametersCount = c(${toPrint.parametersCount.join(", ")}),
		callExpressionCount = c(${toPrint.callExpressionCount.join(", ")}),
		newExpressionCount = c(${toPrint.newExpressionCount.join(", ")})
	),
	.Names = c("functionName", "fileLocation",
	           "declarationStmtCount", "executableStmtCount", "conditionalStmtCount", "loopingStmtCount",
	           "returnStmtCount", "parametersCount", "callExpressionCount"),
	class = "data.frame",
	row.names = c(NA, ${toPrint.functionName.length}L)
)`;

    fs.writeFileSync(fileName, fileContent);

    return fileContent;
}

function extractFunctionName(f, order) {
    let functionName = f.functionName;
    if (f._type === 'FunctionExpression') {
        // if there's no functionName, return the text with everything before the first '?' removed
        functionName = (f.functionName || f.loc.replace(/^[^?]+\?/, "")) + ' (expr)';
    }
    return `[${order}] ${functionName}`;
}

module.exports = rReadableMetrics;