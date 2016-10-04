const esprima = require('esprima');

/**
 * Given a string containing JavaScript source code, returns its JS-AST representation.
 */
module.exports = function (javaScriptString) {
    let javaScriptFixedString = javaScriptString;
    if (javaScriptString.match(JSF_EL)) {
        javaScriptFixedString = javaScriptString.replace(JSF_EL, replaceJSFELExpression);
    }
    return esprima.parse(javaScriptFixedString, {loc: true});
};

const JSF_EL = /#\{([^}]*)}/g;

// no UT
//noinspection JSUnusedLocalSymbols
function replaceJSFELExpression(match, capture) {
    if (capture.match(/^not empty/)) {
        return true;
    }
    if (capture.match(/^rich:component\('[\w:.]+'\)/)) {
        return "component";
    }
    if (capture.match(/^rich:clientId\('[\w:.]+'\)/)) {
        return "clientId";
    }
    // console.log("#@MATCH: "+match);
    return capture;
}