"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
            .then(function (res) {
            _this.globalService.jobsCount = res.data.count;
            _this.globalService.jobList = res.data.jobs;
            _this.globalService.emitJobsCount();
            _this.globalService.emitJobList();
        })
            .catch(function (error) {
            //
        });
    };
    AppMainComponent = __decorate([
        core_1.Component({
            selector: 'app-main',
            templateUrl: 'app/app-main/app-main.component.html',
            styleUrls: ['app/app-main/app-main.component.css']
        }), 
        __metadata('design:paramtypes', [GlobalService_1.GlobalService, JobService_1.JobService])
    ], AppMainComponent);
    return AppMainComponent;
}());
exports.AppMainComponent = AppMainComponent;
//# sourceMappingURL=app-main.component.js.map