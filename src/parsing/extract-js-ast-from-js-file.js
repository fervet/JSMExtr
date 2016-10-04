const readFile = require("../utils/read-file");
const parseJavaScriptString = require("./js/parse-js-string-to-ast");

/**
 * Given a JavaScript file, returns one JS-AST for the entire code.
 */
module.exports = function (fileName, fileEncoding) {
    let jsFileContents = readFile(fileName, fileEncoding);
    const jsAST = parseJavaScriptString(jsFileContents);
    jsAST.fileLocation = fileName;
    return jsAST;
};
