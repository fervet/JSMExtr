// const functionMetrics = functionMetricsFromJsAST(jsASTs);

function rReadableMetrics(functionMetricsOnly) {
    let toPrint = {
        functionName: [],
        fileLocation: [],
        declarationStmtCount: [],
        executableStmtCount: [],
        conditionalStmtCount: [],
        loopingStmtCount: [],
        returnStmtCount: [],
        parametersCount: [],
        callExpressionCount: []
    };

    functionMetricsOnly.forEach(f => {
        if (f._type === 'FunctionDeclaration') {
            toPrint.functionName.push(f.functionName);
        } else {
            let fName = f.loc.replace(/^[^?]+\?/,"");
            if (f.functionName) {
                fName = f.functionName;
            }
            toPrint.functionName.push(fName + ' (expr)');
        }
        toPrint.fileLocation.push(f.loc);
        toPrint.declarationStmtCount.push(f.metrics.declarationStmtCount || 0);
        toPrint.executableStmtCount.push(f.metrics.executableStmtCount || 0);
        toPrint.conditionalStmtCount.push(f.metrics.conditionalStmtCount || 0);
        toPrint.loopingStmtCount.push(f.metrics.loopingStmtCount || 0);
        toPrint.returnStmtCount.push(f.metrics.returnStmtCount || 0);
        toPrint.parametersCount.push(f.metrics.parametersCount || 0);
        toPrint.callExpressionCount.push(f.metrics.callExpressionCount || 0);
    });

    return `js <-
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
		callExpressionCount = c(${toPrint.callExpressionCount.join(", ")})
	),
	.Names = c("functionName", "fileLocation",
	           "declarationStmtCount", "executableStmtCount", "conditionalStmtCount", "loopingStmtCount",
	           "returnStmtCount", "parametersCount", "callExpressionCount"),
	class = "data.frame",
	row.names = c(NA, ${toPrint.functionName.length}L)
)`;
}

module.exports = rReadableMetrics;