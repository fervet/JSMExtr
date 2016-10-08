const extractJavaScriptASTsFromHtmlFile = require("./parsing/extract-js-asts-from-html-file");
const extractJavaScriptASTsFromJsFile = require("./parsing/extract-js-ast-from-js-file");
const extractAllMetricsFromJsAst = require("./metrics/extract-all-metrics-from-js-ast");
const filterFunctionMetricsOnly = require("./metrics/filter-function-metrics-only");
const rReadableMetrics = require("./r/r-readable-metrics");
const jsCodeFilesWalker = require("../src/dirwalking/javascript-code-files-walker");

//noinspection JSUnusedLocalSymbols
function extractSingleFile(fileName, fileEncoding) {
    // const jsASTs = extractJavaScriptASTsFromJsFile(fileName, fileEncoding);
    const jsASTs = extractJavaScriptASTsFromHtmlFile(fileName, fileEncoding);

    console.log(JSON.stringify(jsASTs, null, 4));

    const allMetrics = extractAllMetricsFromJsAst(jsASTs);

    const fOnly = filterFunctionMetricsOnly(allMetrics);
    // console.log(JSON.stringify(fOnly, null, 4));
    console.log(rReadableMetrics(fOnly, "functionMetrics.R"));
}

//noinspection JSUnusedLocalSymbols
let fileEncoding;
//noinspection JSUnusedAssignment
fileEncoding = 'utf8';
fileEncoding = 'ISO-8859-1';

let fileName;
//noinspection JSUnusedAssignment
fileName = 'test/demo/portal.html';
//noinspection JSUnusedAssignment
fileName = 'test/demo/uolutils.js';
// extractSingleFile(fileName, fileEncoding);


function extractMultipleFiles(baseDir, fileEncoding, rFileName) {
    let allFilesJsASTs = [];
    jsCodeFilesWalker(baseDir).forEach(({fullPath, extension}) => {
        console.log("PROCESSING FILE: " + fullPath);
        if (extension === "js") {
            const thisFileJsASTs = extractJavaScriptASTsFromJsFile(fullPath, fileEncoding);
            allFilesJsASTs.push(thisFileJsASTs);
        } else if (extension === "html" || extension === "xhtml") {
            const thisFileJsASTs = extractJavaScriptASTsFromHtmlFile(fullPath, fileEncoding);
            allFilesJsASTs.push(...thisFileJsASTs);
        }
    });

    const allFilesMetrics = extractAllMetricsFromJsAst(allFilesJsASTs);
    const allFilesFunctionsMetrics = filterFunctionMetricsOnly(allFilesMetrics, 5);
    console.log(rReadableMetrics(allFilesFunctionsMetrics, rFileName));
}

let baseDir;
baseDir = "../fontes2/takeOut";

fileEncoding = 'ISO-8859-1';
const rFileName = "allFilesFunctionMetrics.R";
extractMultipleFiles(baseDir, fileEncoding, rFileName);
