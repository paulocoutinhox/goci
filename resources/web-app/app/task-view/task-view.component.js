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
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
var TaskService_1 = require("../services/TaskService");
var JobService_1 = require("../services/JobService");
var timestampFormat_1 = require("../pipes/timestampFormat");
var TaskViewComponent = (function () {
    function TaskViewComponent(taskService, jobService, router, route) {
        this.taskService = taskService;
        this.jobService = jobService;
        this.router = router;
        this.route = route;
    }
    TaskViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.projectId = params['project'];
            _this.taskId = params['task'];
        });
        this.load();
        var lastJobTimer = Rx_1.Observable.timer(1000, 1000);
        lastJobTimer.subscribe(function () { return _this.getLastJobData(); });
    };
    TaskViewComponent.prototype.load = function () {
        var _this = this;
        this.hideAll();
        this.showLoading = true;
        Rx_1.Observable.empty().delay(1000).subscribe(null, null, function () {
            _this.getData();
        });
    };
    TaskViewComponent.prototype.getData = function () {
        var _this = this;
        this.taskService.view(this.projectId, this.taskId)
            .then(function (response) {
            if (response != null && response.success == true) {
                _this.project = response.data.project;
                _this.task = response.data.task;
                _this.hideAll();
                if (_this.project != null && _this.task != null) {
                    _this.showData = true;
                }
                else {
                    _this.showEmptyData = true;
                }
            }
            else {
                _this.onError();
            }
        })
            .catch(function () {
            _this.onError();
        });
    };
    TaskViewComponent.prototype.back = function () {
        this.router.navigate(['/project/view', this.projectId]);
    };
    TaskViewComponent.prototype.hideAll = function () {
        this.showData = false;
        this.showEmptyData = false;
        this.showLoading = false;
        this.showError = false;
        this.showTaskOptionsForm = false;
    };
    TaskViewComponent.prototype.hideAllForLastJob = function () {
        this.showLastJobData = false;
        this.showLastJobEmptyData = false;
        this.showLastJobLoading = false;
        this.showLastJobError = false;
    };
    TaskViewComponent.prototype.onError = function () {
        this.hideAll();
        this.showError = true;
        this.project = null;
    };
    TaskViewComponent.prototype.onErrorForLastJob = function () {
        this.hideAll();
        this.showLastJobError = true;
        this.lastJob = null;
    };
    TaskViewComponent.prototype.view = function (projectId, taskId) {
        this.router.navigate(['/task/view', projectId, taskId]);
    };
    TaskViewComponent.prototype.showTaskOptions = function (projectId, taskId, taskName, taskDescription) {
        var _this = this;
        this.showTaskOptionsForm = false;
        this.runProjectId = projectId;
        this.runTaskId = taskId;
        this.runTaskName = taskName;
        this.runTaskDescription = taskDescription;
        this.runTaskOptions = null;
        this.taskService.options(projectId, taskId)
            .then(function (response) {
            if (response != null && response.success == true) {
                _this.hideAll();
                _this.runTaskOptions = response.data.options;
                _this.showTaskOptionsForm = true;
            }
            else {
                toastr.error('Error when get task options, try again');
            }
        })
            .catch(function (error) {
            toastr.error(error);
        });
    };
    TaskViewComponent.prototype.taskRunWithSuccess = function ($event) {
        this.hideAll();
        this.showData = true;
    };
    TaskViewComponent.prototype.taskRunWithError = function ($event) {
    };
    TaskViewComponent.prototype.taskRunCancel = function ($event) {
        this.hideAll();
        this.showData = true;
    };
    TaskViewComponent.prototype.getLastJobData = function () {
        var _this = this;
        this.jobService.last(this.projectId, this.taskId)
            .then(function (response) {
            if (response != null && response.success == true) {
                _this.lastJob = response.data.job;
                _this.hideAllForLastJob();
                if (_this.lastJob != null) {
                    _this.showLastJobData = true;
                }
                else {
                    _this.showLastJobEmptyData = true;
                }
            }
            else {
                _this.onErrorForLastJob();
            }
        })
            .catch(function () {
            _this.onErrorForLastJob();
        });
    };
    TaskViewComponent = __decorate([
        core_1.Component({
            selector: 'task-view',
            templateUrl: 'app/task-view/task-view.component.html',
            styleUrls: ['app/task-view/task-view.component.css'],
            pipes: [
                timestampFormat_1.TimestampFormat
            ]
        }), 
        __metadata('design:paramtypes', [TaskService_1.TaskService, JobService_1.JobService, router_1.Router, router_1.ActivatedRoute])
    ], TaskViewComponent);
    return TaskViewComponent;
}());
exports.TaskViewComponent = TaskViewComponent;
//# sourceMappingURL=task-view.component.js.map