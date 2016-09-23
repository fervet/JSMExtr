const extractJavaScriptASTsFromHtmlFile = require("./parsing/extract-js-asts-from-html-file");

const jsASTs = extractJavaScriptASTsFromHtmlFile('../spec/demo/demo.html', 'utf8');
console.log(JSON.stringify(jsASTs));
console.log("####################");

jsASTs.forEach(function (jsAST) {
    console.log(JSON.stringify(jsAST, null, 4)+"\n\n");
});

// parse html file
// extract script tags with positional information
// send script tags content to ES parser
// parse ES

// read JS file
// send file content to ES parser
// parse

// input folder, do procedure above to each of folder