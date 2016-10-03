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
    constructor({
        declarationStmtCount = 0,
        executableStmtCount = 0,
        conditionalStmtCount = 0,
        loopingStmtCount = 0,
        returnStmtCount = 0,
        parametersCount = 0,
        callExpressionCount = 0,
        newExpressionCount = 0,
    } = {}) {
        if (declarationStmtCount) this.declarationStmtCount = declarationStmtCount;
        if (executableStmtCount) this.executableStmtCount = executableStmtCount;
        if (conditionalStmtCount) this.conditionalStmtCount = conditionalStmtCount;
        if (loopingStmtCount) this.loopingStmtCount = loopingStmtCount;
        if (returnStmtCount) this.returnStmtCount = returnStmtCount;
        if (parametersCount) this.parametersCount = parametersCount;
        if (callExpressionCount) this.callExpressionCount = callExpressionCount;
        if (newExpressionCount) this.newExpressionCount = newExpressionCount;
    }

    addMetrics(otherMetrics) {
        this.add('declarationStmtCount', otherMetrics);
        this.add('executableStmtCount', otherMetrics);
        this.add('conditionalStmtCount', otherMetrics);
        this.add('loopingStmtCount', otherMetrics);
        this.add('returnStmtCount', otherMetrics);
        this.add('parametersCount', otherMetrics);
        this.add('callExpressionCount', otherMetrics);
        this.add('newExpressionCount', otherMetrics);
    }

    add(propName, otherMetrics) {
        if (otherMetrics && otherMetrics[propName]) {
            this[propName] = (this[propName] || 0) + otherMetrics[propName];
        }
    }
}

module.exports = Metrics;