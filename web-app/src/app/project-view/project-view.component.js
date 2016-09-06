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
var ProjectService_1 = require("../services/ProjectService");
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
var TaskService_1 = require("../services/TaskService");
var GlobalService_1 = require("../services/GlobalService");
var ProjectViewComponent = (function () {
    function ProjectViewComponent(globalService, projectService, taskService, router, route) {
        this.globalService = globalService;
        this.projectService = projectService;
        this.taskService = taskService;
        this.router = router;
        this.route = route;
    }
    ProjectViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.projectId = params['project'];
        });
        this.globalService.jobListEmitter.subscribe(function (jobList) {
            _this.jobList = jobList;
        });
        this.load();
    };
    ProjectViewComponent.prototype.load = function () {
        var _this = this;
        this.hideAll();
        if (this.globalService.loadingDelayTime > 0) {
            this.showLoading = true;
        }
        Rx_1.Observable.empty().delay(this.globalService.loadingDelayTime).subscribe(null, null, function () {
            _this.getData();
        });
    };
    ProjectViewComponent.prototype.getData = function () {
        var _this = this;
        this.projectService.view(this.projectId)
            .then(function (wr) {
            var project = wr.data['project'];
            if (project) {
                _this.project = project;
                _this.hideAll();
                if (_this.project != null) {
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
    ProjectViewComponent.prototype.back = function () {
        this.router.navigate(['/project/list']);
    };
    ProjectViewComponent.prototype.hideAll = function () {
        this.showData = false;
        this.showEmptyData = false;
        this.showLoading = false;
        this.showError = false;
        this.showTaskOptionsForm = false;
    };
    ProjectViewComponent.prototype.onError = function () {
        this.hideAll();
        this.showError = true;
        this.project = null;
    };
    ProjectViewComponent.prototype.showTaskOptions = function (task) {
        var _this = this;
        this.showTaskOptionsForm = false;
        this.runProjectId = this.project.id;
        this.runProjectName = this.project.name;
        this.runTaskId = task.id;
        this.runTaskName = task.name;
        this.runTaskDescription = task.description;
        this.runTaskOptions = null;
        this.taskService.options(this.project.id, task.id)
            .then(function (wr) {
            if (wr.success != null) {
                _this.runTaskOptions = wr.data['options'];
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
    ProjectViewComponent.prototype.taskRunWithSuccess = function ($event) {
        this.hideAll();
        this.showData = true;
    };
    ProjectViewComponent.prototype.taskRunWithError = function ($event) {
        this.hideAll();
        this.showData = true;
    };
    ProjectViewComponent.prototype.taskRunCancel = function ($event) {
        this.hideAll();
        this.showData = true;
    };
    ProjectViewComponent = __decorate([
        core_1.Component({
            selector: 'project-view',
            templateUrl: 'project-view.component.html'
        }), 
        __metadata('design:paramtypes', [GlobalService_1.GlobalService, ProjectService_1.ProjectService, TaskService_1.TaskService, router_1.Router, router_1.ActivatedRoute])
    ], ProjectViewComponent);
    return ProjectViewComponent;
}());
exports.ProjectViewComponent = ProjectViewComponent;
//# sourceMappingURL=project-view.component.js.map