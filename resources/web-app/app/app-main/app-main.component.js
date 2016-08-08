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
var app_header_component_1 = require("../app-header/app-header.component");
var router_1 = require("@angular/router");
var home_component_1 = require("../home/home.component");
var app_footer_component_1 = require("../app-footer/app-footer.component");
var job_list_component_1 = require("../job-list/job-list.component");
var project_list_component_1 = require("../project-list/project-list.component");
var not_found_component_1 = require("../not-found/not-found.component");
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
        var jobsCountTimer = Rx_1.Observable.timer(2000, 1000);
        jobsCountTimer.subscribe(function (t) { return _this.setJobCount(); });
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
            directives: [router_1.ROUTER_DIRECTIVES, app_header_component_1.AppHeaderComponent, app_footer_component_1.AppFooterComponent],
            styleUrls: ['app/app-main/app-main.component.css'],
            precompile: [
                home_component_1.HomeComponent,
                app_header_component_1.AppHeaderComponent,
                app_footer_component_1.AppFooterComponent,
                job_list_component_1.JobListComponent,
                project_list_component_1.ProjectListComponent,
                not_found_component_1.NotFoundComponent
            ],
            providers: [
                JobService_1.JobService
            ]
        }), 
        __metadata('design:paramtypes', [GlobalService_1.GlobalService, JobService_1.JobService])
    ], AppMainComponent);
    return AppMainComponent;
}());
exports.AppMainComponent = AppMainComponent;
//# sourceMappingURL=app-main.component.js.map