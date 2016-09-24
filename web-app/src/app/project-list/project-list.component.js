"use strict";
var core_1 = require("@angular/core");
var ProjectService_1 = require("../services/ProjectService");
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
var GlobalService_1 = require("../services/GlobalService");
var ProjectListComponent = (function () {
    function ProjectListComponent(globalService, projectService, router) {
        this.globalService = globalService;
        this.projectService = projectService;
        this.router = router;
    }
    ProjectListComponent.prototype.ngOnInit = function () {
        this.load();
    };
    ProjectListComponent.prototype.load = function () {
        var _this = this;
        this.hideAll();
        if (this.globalService.loadingDelayTime > 0) {
            this.showLoading = true;
        }
        Rx_1.Observable.empty().delay(this.globalService.loadingDelayTime).subscribe(null, null, function () {
            _this.getData();
        });
    };
    ProjectListComponent.prototype.getData = function () {
        var _this = this;
        this.projectService.list()
            .then(function (wr) {
            var projectList = wr.data['list'];
            if (projectList) {
                _this.projectList = projectList;
                _this.hideAll();
                if (_this.projectList.length > 0) {
                    _this.showList = true;
                }
                else {
                    _this.showEmptyList = true;
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
    ProjectListComponent.prototype.back = function () {
        this.router.navigate(['/']);
    };
    ProjectListComponent.prototype.hideAll = function () {
        this.showList = false;
        this.showEmptyList = false;
        this.showLoading = false;
        this.showError = false;
    };
    ProjectListComponent.prototype.onError = function () {
        this.hideAll();
        this.showError = true;
        this.projectList = [];
    };
    ProjectListComponent.prototype.view = function (projectId) {
        this.router.navigate(['/project/view', projectId]);
    };
    ProjectListComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'project-list',
                    templateUrl: 'project-list.component.html'
                },] },
    ];
    /** @nocollapse */
    ProjectListComponent.ctorParameters = [
        { type: GlobalService_1.GlobalService, },
        { type: ProjectService_1.ProjectService, },
        { type: router_1.Router, },
    ];
    return ProjectListComponent;
}());
exports.ProjectListComponent = ProjectListComponent;
//# sourceMappingURL=project-list.component.js.map