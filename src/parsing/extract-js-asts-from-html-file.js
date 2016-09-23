const extractScriptTagsFromHtmlFile = require("./extract-script-tags-from-html-file");
const parseJavaScriptString = require("./parse-js-string-to-ast");

/**
 * Given an HTML file, returns one JS-AST for each script tag.
 */
module.exports = function (fileName, fileEncoding) {
    const scriptTags = extractScriptTagsFromHtmlFile(fileName, fileEncoding);

    let javaScriptASTs = [];
    scriptTags.forEach(function (scriptTag) {
        let textScript = scriptTag.childNodes[0].textContent;
        javaScriptASTs.push(parseJavaScriptString(textScript));
    });
    return javaScriptASTs;
};