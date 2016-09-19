var fs = require('fs');
var gumbo = require("gumbo-parser");

var htmlFileContents = fs.readFileSync('demo.html', 'utf8');
console.log(htmlFileContents);

console.log("########################################");

var tree = gumbo(htmlFileContents);
console.log(JSON.stringify(tree));

// parse html file
// extract script tags with positional information
// send script tags content to ES parser
// parse ES

// read JS file
// send file content to ES parser
// parse

// input folder, do procedure above to each of folder