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
        metrics.function = `${metrics.fileLocation} ~ ${metrics.functionName}`;
        delete metrics.fileLocation;
        delete metrics.functionName;
    }
});

console.log(JSON.stringify(functionMetrics, null, 4));

// jsASTs.forEach(function (jsAST) {
//     console.log(JSON.stringify(jsAST, null, 4)+"\n\n");
// });