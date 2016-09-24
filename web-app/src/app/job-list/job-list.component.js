"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var GlobalService_1 = require("../services/GlobalService");
var JobListComponent = (function () {
    function JobListComponent(globalService, router) {
        this.globalService = globalService;
        this.router = router;
        this.chartDataLabels = [];
        this.chartDataOptions = {};
        this.chartDataColors = [];
        this.hideAll();
        this.showLoading = true;
    }
    JobListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globalService.jobListEmitter.subscribe(function (jobList) {
            _this.jobList = jobList;
            if (_this.jobList == null) {
                _this.hideAll();
                _this.showError = true;
            }
            else if (_this.jobList.length == 0) {
                _this.hideAll();
                _this.showEmptyData = true;
            }
            else {
                // job list data
                _this.hideAll();
                _this.showData = true;
                // chart data
                var chartLabels = [];
                var chartColors = [];
                var chartDataset = [];
                var chartOptions = {
                    animation: false
                };
                var chartDataForOnQueue = 0;
                var chartDataForRunning = 0;
                var chartDataForError = 0;
                var chartDataForSuccess = 0;
                for (var jobIndex in _this.jobList) {
                    var job = _this.jobList[jobIndex];
                    var jobStatus = job["status"];
                    switch (jobStatus) {
                        case 'onqueue':
                            chartDataForOnQueue += 1;
                            break;
                        case 'running':
                            chartDataForRunning += 1;
                            break;
                        case 'error':
                            chartDataForError += 1;
                            break;
                        case 'success':
                            chartDataForSuccess += 1;
                            break;
                    }
                }
                if (chartDataForOnQueue > 0) {
                    chartLabels.push("On Queue");
                    chartColors.push("#08b4fa");
                    chartDataset.push(chartDataForOnQueue);
                }
                if (chartDataForSuccess > 0) {
                    chartLabels.push("Success");
                    chartColors.push("#39c558");
                    chartDataset.push(chartDataForSuccess);
                }
                if (chartDataForError > 0) {
                    chartLabels.push("Error");
                    chartColors.push("#ff3e43");
                    chartDataset.push(chartDataForError);
                }
                if (chartDataForRunning > 0) {
                    chartLabels.push("Running");
                    chartColors.push("#ffbe41");
                    chartDataset.push(chartDataForRunning);
                }
                _this.chartData = {
                    type: 'doughnut',
                    animation: {
                        animateScale: false,
                        animateRotate: false
                    },
                    labels: chartLabels,
                    datasets: [
                        {
                            data: chartDataset,
                            backgroundColor: chartColors,
                            hoverBackgroundColor: chartColors
                        }
                    ],
                    graphOptions: {
                        animation: false
                    }
                };
                _this.chartDataDatasets = [{
                        data: chartDataset,
                        backgroundColor: chartColors,
                        hoverBackgroundColor: chartColors
                    }];
                _this.chartDataLabels = chartLabels;
                _this.chartDataOptions = chartOptions;
                _this.chartDataColors = chartColors;
            }
        });
    };
    JobListComponent.prototype.hideAll = function () {
        this.showData = false;
        this.showEmptyData = false;
        this.showLoading = false;
        this.showError = false;
    };
    JobListComponent.prototype.view = function (projectId, taskId) {
        this.router.navigate(['/task/view', projectId, taskId]);
    };
    JobListComponent.prototype.back = function () {
        this.router.navigate(['/project/list']);
    };
    JobListComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'job-list',
                    templateUrl: 'job-list.component.html',
                    styleUrls: ['job-list.component.css']
                },] },
    ];
    /** @nocollapse */
    JobListComponent.ctorParameters = [
        { type: GlobalService_1.GlobalService, },
        { type: router_1.Router, },
    ];
    return JobListComponent;
}());
exports.JobListComponent = JobListComponent;
//# sourceMappingURL=job-list.component.js.map