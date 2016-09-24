"use strict";
var core_1 = require("@angular/core");
var GlobalService = (function () {
    function GlobalService() {
        this.jobsCount = 0;
        this.jobsCountEmitter = new core_1.EventEmitter();
        this.jobListEmitter = new core_1.EventEmitter();
        this.loadingDelayTime = 0;
    }
    GlobalService.prototype.emitJobsCount = function () {
        this.jobsCountEmitter.emit(this.jobsCount);
    };
    GlobalService.prototype.emitJobList = function () {
        this.jobListEmitter.emit(this.jobList);
    };
    GlobalService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    GlobalService.ctorParameters = [];
    return GlobalService;
}());
exports.GlobalService = GlobalService;
//# sourceMappingURL=GlobalService.js.map