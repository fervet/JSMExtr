const isObject = require("./isObject");

function isEmptyObject(v) {
    return isObject(v) && Object.keys(v).length === 0 && !Array.isArray(v);
}

module.exports = isEmptyObject;