function toS(obj) {
    return JSON.stringify(obj, (key, value) => {
        if (value === undefined) return '!undefined!'; else return value;
    }, 4);
}

module.exports = toS;