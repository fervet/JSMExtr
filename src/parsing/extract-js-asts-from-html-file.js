const extractScriptTagsFromHtmlFile = require("./html/extract-script-tags-from-html-file");
const parseJavaScriptString = require("./js/parse-js-string-to-ast");

/**
 * Given an HTML file, returns one JS-AST for each script tag.
 */
module.exports = function (fileName, fileEncoding) {
    const scriptTags = extractScriptTagsFromHtmlFile(fileName, fileEncoding);

    let javaScriptASTs = [];
    scriptTags.forEach(function (scriptTag) {
        // If len is zero, then it is a <script src="file"></script> tag
        if (scriptTag.childNodes.length) {
            let textScript = scriptTag.childNodes[0].textContent;
            const jsAST = parseJavaScriptString(textScript);
            jsAST.htmlLocation = generateHtmlLocation(fileName, scriptTag);
            javaScriptASTs.push(jsAST);
        }
    });
    return javaScriptASTs;
};

function generateHtmlLocation(fileName, scriptTag) {
    return `${fileName}?${scriptTag.startPos.line}:${scriptTag.startPos.column}-${scriptTag.endPos.line}:${scriptTag.endPos.column}`;
}