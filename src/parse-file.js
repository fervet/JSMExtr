const fs = require('fs');
const gumbo = require("gumbo-parser");

export function parseFile(fileName, fileEncoding) {
    let htmlFileContents = fs.readFileSync('demo.html', 'utf8');
    return gumbo(htmlFileContents);
}