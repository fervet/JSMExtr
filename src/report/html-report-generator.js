const fs = require('fs');
const Metrics = require('../metrics/Metrics');
const Converter = require("csvtojson").Converter;
const converter = new Converter({});

function generateHtmlReportFromCsv(csvFile, reportHtmlFile) {
    console.info(`Generating HTML report from ${csvFile}...`);
    converter.fromFile(csvFile, (err, allFunctionMetrics) => {

        let clusters = {};

        allFunctionMetrics.forEach(thisFunctionMetrics => {
            //noinspection JSUnresolvedVariable
            if (!clusters[thisFunctionMetrics.cluster]) {
                //noinspection JSUnresolvedVariable
                clusters[thisFunctionMetrics.cluster] = [];
            }
            //noinspection JSUnresolvedVariable
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
        console.info("HTML Report generated.");
    });

    function writeClustersToHtmlFile(clusterTOC, tables) {
        let htmlReport = `
    <html>
    <head>
        <title>Function Clones Report</title>
        <style>table, tr, td, th { border: 1px solid black; border-collapse: collapse; }</style>
    </head>
    <body>
    <h1><a href="https://github.com/acdcjunior/JSMExtr">JSMExtr</a> - Function Clones Report</h1>
    ${clusterTOC}
    <hr>
    ${tables.join("<br>")}
    </body>
    </html>
    `;
        console.info(`Writing HTML report to ${reportHtmlFile}...`);
        fs.writeFileSync(reportHtmlFile, htmlReport);
    }

    function createTableForFunctions(functionMetricsArray) {
        let allRows = [];
        const MAX_FILE_NAME = 60;
        functionMetricsArray.forEach(thisFunctionMetrics => {
            let thisRow = `<tr>
            <td>${thisFunctionMetrics["field1"]}</td>
            <td>${thisFunctionMetrics["functionName"]}</td>
            <td>
                <a href="${thisFunctionMetrics["fileLocation"]}">
                    ${thisFunctionMetrics["fileLocation"].length > MAX_FILE_NAME ? "..." : ""
                }${thisFunctionMetrics["fileLocation"].slice(-MAX_FILE_NAME)}
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
}

const csvFile = "../../r/clonesClustering_generatedClusters.csv";
const reportHtmlFile = "../../r/JSMExtr-FunctionClonesReport.html";

generateHtmlReportFromCsv(csvFile, reportHtmlFile);