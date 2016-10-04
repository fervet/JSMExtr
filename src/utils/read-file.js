const iconvlite = require('iconv-lite');
const fs = require('fs');

function readFileSync_encoding(filename, encoding) {
    let content = fs.readFileSync(filename);
    return iconvlite.decode(content, encoding);
}

module.exports = readFileSync_encoding;