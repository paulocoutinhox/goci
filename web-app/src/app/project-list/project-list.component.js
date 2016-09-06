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
            .then(function (projectList) {
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
    ProjectListComponent = __decorate([
        core_1.Component({
            selector: 'project-list',
            templateUrl: 'project-list.component.html'
        }), 
        __metadata('design:paramtypes', [GlobalService_1.GlobalService, ProjectService_1.ProjectService, router_1.Router])
    ], ProjectListComponent);
    return ProjectListComponent;
}());
exports.ProjectListComponent = ProjectListComponent;
//# sourceMappingURL=project-list.component.js.map