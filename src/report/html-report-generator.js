const fs = require('fs');
const Metrics = require('../metrics/Metrics');
const Converter = require("csvtojson").Converter;
const converter = new Converter({});

const csvFile = "../../r/allClusters.csv";

converter.fromFile(csvFile, (err, allFunctionMetrics) => {

    let clusters = {};

    allFunctionMetrics.forEach(thisFunctionMetrics => {
        if (!clusters[thisFunctionMetrics.cluster]) {
            clusters[thisFunctionMetrics.cluster] = [];
        }
        clusters[thisFunctionMetrics.cluster].push(thisFunctionMetrics);
    });

    let clusterTOC = "<ul>";

    let allTables = [];
    Object.keys(clusters).forEach(clusterNumber => {
        let functionsAtThisCluster = clusters[clusterNumber];
        if (functionsAtThisCluster.length > 1) {
            clusterTOC += `
                <li>
                    <a href="#cluster-${clusterNumber}">
                    Cluster #${clusterNumber} (${functionsAtThisCluster.length} functions)
                    </a>
                </li>
            `;
            allTables.push(`
                 <h1 id="cluster-${clusterNumber}">Cluster #${clusterNumber}</h1>
                ${createTableForFunctions(functionsAtThisCluster)}
            `);
        }
    });
    clusterTOC += "</ul>";

    writeClustersToHtmlFile(clusterTOC, allTables);
});

function writeClustersToHtmlFile(clusterTOC, tables) {
    let htmlReport = `
    <html>
    <head>
        <title>Function Clones Report</title>
        <style>table, tr, td, th { border: 1px solid black; border-collapse: collapse;</style>
    </head>
    <body>
    <h1>Function Clones Report</h1>
    ${clusterTOC}
    <hr>
    ${tables.join("<br>")}
    </body>
    </html>
    `;
    fs.writeFileSync("../../r/FunctionClones.html", htmlReport);
}

function createTableForFunctions(functionMetricsArray) {
    let allRows = [];
    functionMetricsArray.forEach(thisFunctionMetrics => {
        let thisRow = `<tr>
            <td>${thisFunctionMetrics["field1"]}</td>
            <td>${thisFunctionMetrics["functionName"]}</td>
            <td>
                <a href="${thisFunctionMetrics["fileLocation"]}">
                    ${thisFunctionMetrics["fileLocation"]}
                </a>
            </td>
        `;
        Metrics.forEachTrackedMetric(trackedMetric => {
            thisRow += `<td>${thisFunctionMetrics[trackedMetric]}</td>`;
        });
        thisRow += `</tr>`;
        allRows.push(thisRow);
    });

    let headers = `<tr><th>#</th><th>Function Name</th><th>File Location</th>`;
    Metrics.forEachTrackedMetric(trackedMetric => {
        headers += `<th>${trackedMetric}</th>`;
    });
    headers += `</tr>`;

    return `<table>${headers}${allRows.join("")}</table>`;
}