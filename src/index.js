const extractJavaScriptASTsFromHtmlFile = require("./parsing/extract-js-asts-from-html-file");
const functionMetricsFromJsAST = require("./metrics/extract-function-metrics-from-js-ast");

const jsASTs = extractJavaScriptASTsFromHtmlFile('spec/demo/portal.html', 'utf8');
// console.log(JSON.stringify(jsASTs));
const functionMetrics = functionMetricsFromJsAST(jsASTs);
// console.log(JSON.stringify(functionMetrics, null, 4));
console.log("##########################################################");
console.log("##########################################################");
console.log("##########################################################");
console.log(JSON.stringify(functionMetrics, (k, v) => {if (k === 'detail') return undefined; return v; }, 4));

// jsASTs.forEach(function (jsAST) {
//     console.log(JSON.stringify(jsAST, null, 4)+"\n\n");
// });