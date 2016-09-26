const isObject = require("./isObject");

function toS(obj) {
    return JSON.stringify(obj, (key, value) => {if (value === undefined) return 'undef'; else return value; })
}

function clearEmptyProperties(obj) {
    const shouldBeCleared = [obj];
    for (let i = 0; i < shouldBeCleared.length; i++) {
        let toPickProperties = shouldBeCleared[i];

        if (Array.isArray(toPickProperties)) {
            cleanArray(toPickProperties);
            shouldBeCleared.push(...toPickProperties.filter(isObject));
        } else {
            if (isObject(toPickProperties)) {
                clearEmptyProps(toPickProperties);
                Object.keys(toPickProperties).forEach(key => {
                    let v = toPickProperties[key];
                    if (isObject(v)) {
                        shouldBeCleared.push(v);
                    }
                });
            }
        }
    }
    while (shouldBeCleared.length > 0) {
        let v = shouldBeCleared.pop();
        clearEmptyProps(v);
        cleanArray(v);
    }
    return obj;
}

function clearEmptyProps(obj) {
    if (Array.isArray(obj)) {
        return;
    }
    Object.keys(obj).forEach(key => {
        if (isEmptyValue(obj[key])) {
            delete obj[key];
        }
    });
}

function cleanArray(array) {
    if (!Array.isArray(array)) {
        return;
    }
    for (let i = 0; i < array.length; i++) {
        if (isEmptyValue(array[i])) {
            array.splice(i, 1);
            i--;
        }
    }
    return isEmptyValue;
}

function isEmptyValue(value) {
    return value === undefined ||
        value === null ||
        (isObject(value) && Object.keys(value).length === 0 && value.constructor === Object) || // === {}
        (Array.isArray(value) && value.length === 0); // === [];
}

module.exports = clearEmptyProperties;