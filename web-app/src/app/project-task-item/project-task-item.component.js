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
var GlobalService_1 = require("../services/GlobalService");
var Project_1 = require("../models/Project");
var ProjectTask_1 = require("../models/ProjectTask");
var ProjectTaskItemComponent = (function () {
    function ProjectTaskItemComponent(globalService, router) {
        this.globalService = globalService;
        this.router = router;
        this.showTaskOptions = new core_1.EventEmitter();
    }
    ProjectTaskItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globalService.jobListEmitter.subscribe(function (jobList) {
            _this.lastJob = _this.getLastJobByProjectAndTask(jobList, _this.project.id, _this.task.id);
        });
    };
    ProjectTaskItemComponent.prototype.getLastJobByProjectAndTask = function (jobList, projectId, taskId) {
        if (jobList == null) {
            return null;
        }
        var lastJob = null;
        for (var jobIndex in jobList) {
            var job = jobList[jobIndex];
            if (job.projectId == projectId && job.taskId == taskId) {
                lastJob = job;
            }
        }
        return lastJob;
    };
    ProjectTaskItemComponent.prototype.sendShowTaskOptionsEvent = function () {
        this.showTaskOptions.emit(this.task);
    };
    ProjectTaskItemComponent.prototype.view = function (taskId) {
        this.router.navigate(['/task/view', this.project['id'], taskId]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Project_1.Project)
    ], ProjectTaskItemComponent.prototype, "project", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', ProjectTask_1.ProjectTask)
    ], ProjectTaskItemComponent.prototype, "task", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ProjectTaskItemComponent.prototype, "showTaskOptions", void 0);
    ProjectTaskItemComponent = __decorate([
        core_1.Component({
            selector: 'project-task-item',
            templateUrl: 'project-task-item.component.html'
        }), 
        __metadata('design:paramtypes', [GlobalService_1.GlobalService, router_1.Router])
    ], ProjectTaskItemComponent);
    return ProjectTaskItemComponent;
}());
exports.ProjectTaskItemComponent = ProjectTaskItemComponent;
//# sourceMappingURL=project-task-item.component.js.map