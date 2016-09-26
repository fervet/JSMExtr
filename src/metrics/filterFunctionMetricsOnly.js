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

function filterFunctionMetricsOnly(allMetrics) {
    let metricsToFilter = [];
    metricsToFilter.push(...allMetrics);

    let functionMetricsOnly = [];

    while (metricsToFilter.length > 0) {
        let thisMetric = metricsToFilter.pop();

        if (thisMetric._type === 'FunctionDeclaration' || thisMetric._type === 'FunctionExpression') {
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