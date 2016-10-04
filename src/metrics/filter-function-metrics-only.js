// const allMetrics = functionMetricsFromJsAST(jsASTs);

function cloneAllPropertiesButDetail(objMetric) {
    let clone = {};
    Object.keys(objMetric).forEach(key => {
        if (key !== 'detail') {
            clone[key] = objMetric[key];
        }
    });
    return clone;
}

function shouldKeepMetric(thisMetric, minimumLoc) {
    if (thisMetric._type !== 'FunctionDeclaration' && thisMetric._type !== 'FunctionExpression') {
        return false;
    }
    if (minimumLoc > 0) {
        console.log("LOC: "+thisMetric.loc);
        const locs = thisMetric.loc.match(/\?(\d+):\d+-(\d+):\d+$/);
        let startingLine = +locs[1];
        let endingLine = +locs[2];
        return (endingLine - startingLine) >= minimumLoc;
    }
    return true;
}

function filterFunctionMetricsOnly(allMetrics, minimumLoc = 0) {
    let metricsToFilter = [];
    metricsToFilter.push(...allMetrics);

    let functionMetricsOnly = [];

    while (metricsToFilter.length > 0) {
        let thisMetric = metricsToFilter.pop();

        if (shouldKeepMetric(thisMetric, minimumLoc)) {
            functionMetricsOnly.push(cloneAllPropertiesButDetail(thisMetric));
        }

        if (thisMetric.detail) {
            Object.keys(thisMetric.detail).forEach(key => {
                let thisDetail = thisMetric.detail[key];
                if (Array.isArray(thisDetail)) {
                    metricsToFilter.push(...thisDetail);
                } else {
                    metricsToFilter.push(thisDetail);
                }
            });
        }
    }

    return functionMetricsOnly;
}

module.exports = filterFunctionMetricsOnly;