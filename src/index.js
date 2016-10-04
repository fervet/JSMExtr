const extractJavaScriptASTsFromHtmlFile = require("./parsing/extract-js-asts-from-html-file");
const extractJavaScriptASTsFromJsFile = require("./parsing/extract-js-ast-from-js-file");
const extractAllMetricsFromJsAst = require("./metrics/extract-all-metrics-from-js-ast");
const filterFunctionMetricsOnly = require("./metrics/filter-function-metrics-only");
const rReadableMetrics = require("./r/r-readable-metrics");

((shouldRun) => {
    if (!shouldRun) return;

    // const fileName = 'test/demo/portal.html';
    // const jsASTs = extractJavaScriptASTsFromHtmlFile(fileName, 'utf8');
    // const fileName = 'test/demo/uolutils.js';
    // const jsASTs = extractJavaScriptASTsFromJsFile(fileName, 'utf8');
    const jsASTs = extractJavaScriptASTsFromJsFile('D:\\github\\fontes\\egestao\\src\\main\\webapp\\Web\\EGestao\\econtrole.js', 'ISO-8859-1');

    console.log(JSON.stringify(jsASTs, null, 4));

    const allMetrics = extractAllMetricsFromJsAst(jsASTs);

    const fOnly = filterFunctionMetricsOnly(allMetrics);
    // console.log(JSON.stringify(fOnly, null, 4));

    console.log(rReadableMetrics(fOnly, "functionMetrics.R"));
})(false);

((shouldRun) => {
    if (!shouldRun) return;

    const jsCodeFilesWalker = require("../src/dirwalking/javascript-code-files-walker");
    let allFiles = jsCodeFilesWalker("D:/github/fontes");
    // console.log(JSON.stringify(allFiles, null, 4));

    let allFilesJsASTs = [];
    allFiles.forEach(({fullPath, extension}) => {
        console.log("PROCESSING FILE: "+fullPath);
        if (extension === "js") {
            const thisFileJsASTs = extractJavaScriptASTsFromJsFile(fullPath, 'ISO-8859-1');
            allFilesJsASTs.push(thisFileJsASTs);
        } else if (extension === "html" || extension === "xhtml") {
            const thisFileJsASTs = extractJavaScriptASTsFromHtmlFile(fullPath, 'ISO-8859-1');
            allFilesJsASTs.push(...thisFileJsASTs);
        }
    });

    const allFilesMetrics = extractAllMetricsFromJsAst(allFilesJsASTs);

    const allFilesFunctionsMetrics = filterFunctionMetricsOnly(allFilesMetrics, 4);
    console.log(rReadableMetrics(allFilesFunctionsMetrics, "allFilesFunctionMetrics.R"));
})(true);