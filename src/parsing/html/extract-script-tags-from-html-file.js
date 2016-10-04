const readFile = require("../../utils/read-file");
const gumbo = require("gumbo-parser");

//noinspection JSUnusedLocalSymbols
const toS = require('../../utils/to-s');

/**
 * Given an HTML file, returns its list of script tags (in HTML-AST format).
 *
 * @return {Array}
 */
module.exports = function (fileName, fileEncoding) {
    let htmlFileContents = readFile(fileName, fileEncoding);
    let ast = gumbo(htmlFileContents);
    return extractScriptTags(nodeToBeEvaluated(ast));
};

function nodeToBeEvaluated(ast) {
    if (ast.document && ast.document.childNodes) {
        return ast.document;
    }
    return ast.root;
}

function extractScriptTags(ast) {
    let elementsToBeChecked = [];
    elementsToBeChecked.push(...ast.childNodes);

    let scriptTags = [];
    while (elementsToBeChecked.length > 0) {
        let currentElement = elementsToBeChecked.shift();
        if (currentElement.tagName === 'script') {
            scriptTags.push(currentElement);
        } else if (currentElement.childNodes) {
            elementsToBeChecked.push(...currentElement.childNodes);
        }
    }

    return scriptTags;
}
