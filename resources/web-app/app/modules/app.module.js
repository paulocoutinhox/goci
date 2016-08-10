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
var platform_browser_1 = require("@angular/platform-browser");
var app_main_component_1 = require("../app-main/app-main.component");
var app_routes_1 = require("../app-routes/app.routes");
var GlobalService_1 = require("../services/GlobalService");
var JobService_1 = require("../services/JobService");
var router_1 = require("@angular/router");
var home_component_1 = require("../home/home.component");
var app_header_component_1 = require("../app-header/app-header.component");
var app_footer_component_1 = require("../app-footer/app-footer.component");
var job_list_component_1 = require("../job-list/job-list.component");
var project_list_component_1 = require("../project-list/project-list.component");
var project_view_component_1 = require("../project-view/project-view.component");
var not_found_component_1 = require("../not-found/not-found.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var TaskService_1 = require("../services/TaskService");
var ProjectService_1 = require("../services/ProjectService");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_main_component_1.AppMainComponent,
                home_component_1.HomeComponent,
                app_header_component_1.AppHeaderComponent,
                app_footer_component_1.AppFooterComponent,
                job_list_component_1.JobListComponent,
                project_list_component_1.ProjectListComponent,
                project_view_component_1.ProjectViewComponent,
                not_found_component_1.NotFoundComponent
            ],
            imports: [
                app_routes_1.routing,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                router_1.RouterModule
            ],
            bootstrap: [
                app_main_component_1.AppMainComponent
            ],
            providers: [
                GlobalService_1.GlobalService,
                JobService_1.JobService,
                TaskService_1.TaskService,
                ProjectService_1.ProjectService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map