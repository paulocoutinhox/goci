"use strict";
var core_1 = require("@angular/core");
var GlobalService_1 = require("../services/GlobalService");
var JobService_1 = require("../services/JobService");
var Rx_1 = require("rxjs/Rx");
var AppMainComponent = (function () {
    function AppMainComponent(globalService, jobService) {
        this.globalService = globalService;
        this.jobService = jobService;
    }
    AppMainComponent.prototype.ngOnInit = function () {
        var _this = this;
        var jobsCountTimer = Rx_1.Observable.timer(1000, 1000);
        jobsCountTimer.subscribe(function () { return _this.setJobCount(); });
    };
    AppMainComponent.prototype.setJobCount = function () {
        var _this = this;
        this.jobService.getRunningList()
            .then(function (wr) {
            _this.globalService.jobsCount = wr.data['count'];
            _this.globalService.jobList = wr.data['jobs'];
            _this.globalService.emitJobsCount();
            _this.globalService.emitJobList();
        })
            .catch(function () {
            _this.globalService.jobsCount = 0;
            _this.globalService.jobList = null;
            _this.globalService.emitJobsCount();
            _this.globalService.emitJobList();
        });
    };
    AppMainComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-main',
                    templateUrl: 'app-main.component.html'
                },] },
    ];
    /** @nocollapse */
    AppMainComponent.ctorParameters = [
        { type: GlobalService_1.GlobalService, },
        { type: JobService_1.JobService, },
    ];
    return AppMainComponent;
}());
exports.AppMainComponent = AppMainComponent;
//# sourceMappingURL=app-main.component.js.map