const esprima = require('esprima');

/**
 * Given a string containing JavaScript source code, returns its JS-AST representation.
 */
module.exports = function (javaScriptString) {
    return esprima.parse(javaScriptString);
};