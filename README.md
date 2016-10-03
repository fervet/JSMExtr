# JavaScript source code Metrics Extractor

A tool that parses HTML or JavaScript files and analyses all JavaScript
code found and calculates several code metrics for them.

### How to run

#### Requirements

All code is written in JavaScript and runs on the NodeJS platform.

- Install []Node > 6](https://nodejs.org/en/download/)
- Upgrade NPM to latest: `npm install -g npm@next`
- Install [Python 2.7.x](https://www.python.org/download/releases/2.7/)
- Install Gcc and G++ (or [MS VC++ Build tools, if windows](acdcjunior.github.io/node-gyp-windows.html))

#### Running

Download and process all dependencies:
 
    npm install
    
Try the [sample script](src/index.js):

    npm start
    
The sample script takes metrics from some files located at the `test/demo` folder.
You can (and should) change that to any path containing HTML and/or JS files.
Take a look at the script to learn how to do that. It should be straightforward.