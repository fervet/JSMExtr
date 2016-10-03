const isObject = require("./is-object");

function isEmptyObject(v) {
    return isObject(v) && Object.keys(v).length === 0 && !Array.isArray(v);
}

module.exports = isEmptyObject;