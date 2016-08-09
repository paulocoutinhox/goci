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
var ProjectViewComponent = (function () {
    function ProjectViewComponent(projectService, router, route) {
        this.projectService = projectService;
        this.router = router;
        this.route = route;
    }
    ProjectViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.projectId = params['project'];
        });
        this.load();
    };
    ProjectViewComponent.prototype.load = function () {
        var _this = this;
        this.hideAll();
        this.showLoading = true;
        Rx_1.Observable.empty().delay(1000).subscribe(null, null, function () {
            _this.getData();
        });
        toastr.success('Are you the 6 fingered man?', 'aaa', { 'hideDuration': 99999999 });
    };
    ProjectViewComponent.prototype.getData = function () {
        var _this = this;
        this.projectService.view(this.projectId)
            .then(function (response) {
            if (response != null && response.success == true) {
                _this.project = response.data.project;
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
    };
    ProjectViewComponent.prototype.onError = function () {
        this.hideAll();
        this.showError = true;
        this.project = null;
    };
    ProjectViewComponent.prototype.view = function (projectId, taskId) {
        this.router.navigate(['/task/view', projectId, taskId]);
    };
    ProjectViewComponent = __decorate([
        core_1.Component({
            selector: 'project-view',
            templateUrl: 'app/project-view/project-view.component.html',
            styleUrls: ['app/project-view/project-view.component.css'],
            providers: [
                ProjectService_1.ProjectService
            ]
        }), 
        __metadata('design:paramtypes', [ProjectService_1.ProjectService, router_1.Router, router_1.ActivatedRoute])
    ], ProjectViewComponent);
    return ProjectViewComponent;
}());
exports.ProjectViewComponent = ProjectViewComponent;
//# sourceMappingURL=project-view.component.js.map