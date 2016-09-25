/*
 Number of declaration statements (Decl.) ------------------------ DONE
 Number of executable statements (Stmt.) ------------------------- DONE
 Number of conditional statements (Cond.) ------------------------ TODO
 Number of looping statements (Loop) ----------------------------- TODO
 Maximum nesting level of control constructs (Nest) -------------- TODO
 Number of return statements (Ret.) ------------------------------ DONE
 Number of parameters (Param.) ----------------------------------- DONE
 Number of called functions (Call) ------------------------------- DONE
 */
class Metrics {
    constructor({
        declarationStmtCount = 0,
        executableStmtCount = 0,
        conditionalStmtCount = 0,
        loopingStmtCount = 0,
        returnStmtCount = 0,
        parametersCount = 0,
        callExpressionCount = 0
    } = {}) {
        if (declarationStmtCount) this.declarationStmtCount = declarationStmtCount;
        if (executableStmtCount) this.executableStmtCount = executableStmtCount;
        if (conditionalStmtCount) this.conditionalStmtCount = conditionalStmtCount;
        if (loopingStmtCount) this.loopingStmtCount = loopingStmtCount;
        if (returnStmtCount) this.returnStmtCount = returnStmtCount;
        if (parametersCount) this.parametersCount = parametersCount;
        if (callExpressionCount) this.callExpressionCount = callExpressionCount;
    }

    addMetrics(otherMetrics) {
        this.add('declarationStmtCount', otherMetrics);
        this.add('executableStmtCount', otherMetrics);
        this.add('conditionalStmtCount', otherMetrics);
        this.add('loopingStmtCount', otherMetrics);
        this.add('maxNestingLevelOfControlConstructs', otherMetrics);
        this.add('returnStmtCount', otherMetrics);
        this.add('parametersCount', otherMetrics);
        this.add('callExpressionCount', otherMetrics);
    }

    add(propName, otherMetrics) {
        if (otherMetrics && otherMetrics[propName]) {
            this[propName] = (this[propName] || 0) + otherMetrics[propName];
        }
    }
}

module.exports = Metrics;