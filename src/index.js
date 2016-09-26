const extractJavaScriptASTsFromHtmlFile = require("./parsing/extract-js-asts-from-html-file");
const extractJavaScriptASTsFromJsFile = require("./parsing/extract-js-ast-from-js-file");
const functionMetricsFromJsAST = require("./metrics/extract-metrics-from-js-ast");
const filterFunctionMetricsOnly = require("./metrics/filterFunctionMetricsOnly");
const rReadableMetrics = require("./r/r-readable-metrics");


// const jsCodeFileWalker = require("../../src/dirwalking/jscodefilewalker");


// const fileName = 'spec/demo/portal.html';
const fileName = 'spec/demo/uolutils.js';
// const jsASTs = extractJavaScriptASTsFromHtmlFile(fileName, 'utf8');
const jsASTs = extractJavaScriptASTsFromJsFile(fileName, 'utf8');
const allMetrics = functionMetricsFromJsAST(jsASTs);

const fOnly = filterFunctionMetricsOnly(allMetrics);
console.log(JSON.stringify(fOnly, null, 4));

console.log("#####################################");
console.log("#####################################");
// console.log(rReadableMetrics(allMetrics));
