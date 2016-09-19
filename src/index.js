var fs = require('fs');
var gumbo = require("gumbo-parser");

var htmlFileContents = fs.readFileSync('demo.html', 'utf8');
console.log(htmlFileContents);

console.log("########################################");

var tree = gumbo(htmlFileContents);
console.log(JSON.stringify(tree));