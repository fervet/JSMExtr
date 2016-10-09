# JSMExtr - JavaScript source code Metrics Extractor

A tool that parses HTML or JavaScript files and inspects all JavaScript
code found. Outputs several metrics for the analyzed source.

## Scripts

- [r-readable-metrics](src/r/r-readable-metrics.js)

- [extract-all-metrics-from-js-ast](src/metrics/extract-all-metrics-from-js-ast.js)
- [filter-function-metrics-only](src/metrics/filter-function-metrics-only.js)

- [parse-js-string-to-ast](src/parsing/js/parse-js-string-to-ast.js)
- [extract-js-ast-from-js-file](src/parsing/js/extract-js-ast-from-js-file.js)
- [extract-js-asts-from-html-file](src/parsing/js/extract-js-asts-from-html-file.js)

- [extract-script-tags-from-html-file](src/parsing/html/extract-script-tags-from-html-file.js)

- [javascript-code-files-walker](src/dirwalking/javascript-code-files-walker.js)

## Running it on your own

#### Requirements

All code is written in JavaScript and runs on the NodeJS platform.

- Install [Node > 6](https://nodejs.org/en/download/)
- Upgrade NPM to latest: `npm install -g npm@next`
- Install [Python 2.7.x](https://www.python.org/download/releases/2.7/)
- Install Gcc and G++ (or [MS VC++ Build tools, if windows](http://acdcjunior.github.io/node-gyp-windows.html))

#### Running

Download and process all dependencies:
 
    npm install
    
Try the [sample script](src/index.js):

    npm start
    
The sample script takes metrics from some files located at the `test/demo` folder.
You can (and should) change that to any path containing HTML and/or JS files.
Take a look at the script to learn how to do that. It should be straightforward.

#### Tests

The test scripts is a very good source on the specific behavior of each function. To run it, use:

    npm test
    
The test framework used is [Mocha](http://mochajs.org), mainly due to its capacity to test server-side code seamlessly.


# Other

This repo follows the [angular commit message](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) style.