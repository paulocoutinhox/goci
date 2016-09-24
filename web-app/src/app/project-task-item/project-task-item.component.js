"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var GlobalService_1 = require("../services/GlobalService");
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
    ProjectTaskItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'project-task-item',
                    templateUrl: 'project-task-item.component.html'
                },] },
    ];
    /** @nocollapse */
    ProjectTaskItemComponent.ctorParameters = [
        { type: GlobalService_1.GlobalService, },
        { type: router_1.Router, },
    ];
    ProjectTaskItemComponent.propDecorators = {
        'project': [{ type: core_1.Input },],
        'task': [{ type: core_1.Input },],
        'showTaskOptions': [{ type: core_1.Output },],
    };
    return ProjectTaskItemComponent;
}());
exports.ProjectTaskItemComponent = ProjectTaskItemComponent;
//# sourceMappingURL=project-task-item.component.js.map