const extractJavaScriptASTsFromHtmlFile = require("./parsing/extract-js-asts-from-html-file");
const functionMetricsFromJsAST = require("./metrics/extract-function-metrics-from-js-ast");
const rReadableMetrics = require("./r/r-readable-metrics");

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

console.log(JSON.stringify(functionMetrics, null, 4));

console.log("#####################################");
console.log("#####################################");
console.log(rReadableMetrics(functionMetrics));
