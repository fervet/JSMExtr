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

class Metrics {
    constructor(...metrics) {
        Metrics.forEachTrackedMetric(trackedMetric => {
            metrics.forEach(({m: metricName, c: metricCount}) => {
                if (metricName === trackedMetric && metricCount) {
                    this[trackedMetric] = metricCount;
                }
            });

        });
    }

    addMetrics(otherMetrics) {
        if (!otherMetrics) {
            return;
        }
        Metrics.forEachTrackedMetric(trackedMetric => {
            if (otherMetrics[trackedMetric]) {
                let currentMetricValue = this[trackedMetric] || 0;
                this[trackedMetric] = currentMetricValue + otherMetrics[trackedMetric];
            }
        });
    }

    static trackedMetrics() {
        return Object.keys(Metrics);
    }
    static forEachTrackedMetric(f) {
        Metrics.trackedMetrics().forEach(f);
    }
    static trackedMetricsAsStringArray() {
        return Metrics.trackedMetrics();
    }
}
Metrics.declarationStmtCount = 'declarationStmtCount';
Metrics.executableStmtCount = 'executableStmtCount';
Metrics.conditionalStmtCount = 'conditionalStmtCount';
Metrics.loopingStmtCount = 'loopingStmtCount';
Metrics.returnStmtCount = 'returnStmtCount';
Metrics.parametersCount = 'parametersCount';
Metrics.callExpressionCount = 'callExpressionCount';
Metrics.newExpressionCount = 'newExpressionCount';
Metrics.assignmentExpressions = 'assignmentExpressions';

module.exports = Metrics;