const path = require('path');
const fs = require('fs');
const gumbo = require("gumbo-parser");

/**
 * Given an HTML file, returns its list of script tags (in HTML-AST format).
 */
module.exports = function (fileName, fileEncoding) {
    let htmlFileContents = fs.readFileSync(fileName, fileEncoding);
    let ast = gumbo(htmlFileContents);
    return extractScriptTags(ast.root);
};

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
