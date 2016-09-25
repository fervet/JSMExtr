const fs = require('fs');
const parseJavaScriptString = require("./js/parse-js-string-to-ast");

/**
 * Given a JavaScript file, returns one JS-AST for the entire code.
 */
module.exports = function (fileName, fileEncoding) {
    let jsFileContents = fs.readFileSync(fileName, fileEncoding);
    const jsAST = parseJavaScriptString(jsFileContents);
    jsAST.fileLocation = fileName;
    return jsAST;
};
