/*
 Number of declaration statements (Decl.) ------------------------ DONE
 Number of executable statements (Stmt.) ------------------------- DONE
 Number of conditional statements (Cond.) ------------------------ DONE
 Number of looping statements (Loop) ----------------------------- DONE
 Number of return statements (Ret.) ------------------------------ DONE
 Number of parameters (Param.) ----------------------------------- DONE
 Number of called functions (Call) ------------------------------- DONE
 Maximum nesting level of control constructs (Nest) -------------- WONTFIX
 */

const trackedMetrics = [
    'declarationStmtCount',
    'executableStmtCount',
    'conditionalStmtCount',
    'loopingStmtCount',
    'returnStmtCount',
    'parametersCount',
    'callExpressionCount',
    'newExpressionCount'
];

class Metrics {
    constructor(options = {}) {
        trackedMetrics.forEach(trackedMetric => {
            if (options[trackedMetric]) {
                this[trackedMetric] = options[trackedMetric];
            }
        });
    }

    addMetrics(otherMetrics) {
        if (!otherMetrics) {
            return;
        }
        trackedMetrics.forEach(trackedMetric => {
            if (otherMetrics[trackedMetric]) {
                let currentMetricValue = this[trackedMetric] || 0;
                this[trackedMetric] = currentMetricValue + otherMetrics[trackedMetric];
            }
        });
    }
}
Metrics.trackedMetrics = trackedMetrics;

module.exports = Metrics;