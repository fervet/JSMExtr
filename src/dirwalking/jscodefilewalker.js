let fs = require('fs');
let path = require('path');

function fileWalker(currentDirPath, callback) {
    const filesAndFolders = fs.readdirSync(currentDirPath);
    filesAndFolders.forEach(function (name) {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, false);
        } else if (stat.isDirectory()) {
            callback(filePath, true);
            jsCodeFilesWalker(filePath);
        }
    });
}

function fileHasExtensionThatMayContainJavaScriptCode(filePath) {
    return fileHasExtension(filePath, ["js", "html", "htm", "xhtml", "xhtm", "vm", "jsp"])
}
function fileHasExtension(filePath, fileExtensions) {
    const pathParts = filePath.split(".");
    if (pathParts.length === 1) {
        // file has no extension
        return false;
    }
    const fileExtension = pathParts[pathParts.length - 1];
    return fileExtensions.indexOf(fileExtension) !== -1;
}

function jsCodeFilesWalker(baseDir) {
    const filesToProcess = [];

    fileWalker(baseDir, function (filePath, isDir) {
        if (!isDir && fileHasExtensionThatMayContainJavaScriptCode(filePath)) {
            filesToProcess.push(filePath);
        }
    });

    return filesToProcess;
}

module.exports = jsCodeFilesWalker;
