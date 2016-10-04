const readFile = require("../utils/read-file");
const parseJavaScriptString = require("./js/parse-js-string-to-ast");

/**
 * Given a JavaScript file, returns one JS-AST for the entire code.
 *
 * @return a single object (not an array) of "type: Program"
 */
module.exports = function (fileName, fileEncoding) {
    let jsFileContents = readFile(fileName, fileEncoding);
    const jsAST = parseJavaScriptString(jsFileContents);
    jsAST.fileLocation = fileName;
    return jsAST;
};
