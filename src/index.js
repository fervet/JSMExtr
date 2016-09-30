const extractJavaScriptASTsFromHtmlFile = require("./parsing/extract-js-asts-from-html-file");
const extractJavaScriptASTsFromJsFile = require("./parsing/extract-js-ast-from-js-file");
const extractAllMetricsFromJsAst = require("./metrics/extractAllMetricsFromJsAst");
const filterFunctionMetricsOnly = require("./metrics/filterFunctionMetricsOnly");
const rReadableMetrics = require("./r/r-readable-metrics");


// const jsCodeFileWalker = require("../../src/dirwalking/jscodefilewalker");


// const fileName = 'test/demo/portal.html';
// const jsASTs = extractJavaScriptASTsFromHtmlFile(fileName, 'utf8');
const fileName = 'test/demo/uolutils.js';
const jsASTs = extractJavaScriptASTsFromJsFile(fileName, 'utf8');
const allMetrics = extractAllMetricsFromJsAst(jsASTs);

const fOnly = filterFunctionMetricsOnly(allMetrics);
console.log(JSON.stringify(fOnly, null, 4));

console.log("#####################################");
console.log("#####################################");
console.log(rReadableMetrics(fOnly));
