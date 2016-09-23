const extractJavaScriptASTsFromHtmlFile = require("./parsing/extract-js-asts-from-html-file");

const jsASTs = extractJavaScriptASTsFromHtmlFile('../spec/demo/portal.html', 'utf8');
// console.log(JSON.stringify(jsASTs));
console.log(JSON.stringify(jsASTs, null, 4));
console.log("####################");

// jsASTs.forEach(function (jsAST) {
//     console.log(JSON.stringify(jsAST, null, 4)+"\n\n");
// });