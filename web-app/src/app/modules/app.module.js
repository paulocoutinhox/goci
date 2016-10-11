"use strict";
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
var task_view_component_1 = require("../task-view/task-view.component");
var timestampFormat_1 = require("../pipes/timestampFormat");
var task_options_component_1 = require("../task-options/task-options.component");
var project_task_item_component_1 = require("../project-task-item/project-task-item.component");
var ng2_charts_1 = require("ng2-charts/ng2-charts");
toastr.options = { timeOut: 5000, progressBar: true, hideDuration: 300, positionClass: 'toast-top-center' };
var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        app_main_component_1.AppMainComponent,
                        home_component_1.HomeComponent,
                        app_header_component_1.AppHeaderComponent,
                        app_footer_component_1.AppFooterComponent,
                        job_list_component_1.JobListComponent,
                        project_list_component_1.ProjectListComponent,
                        project_view_component_1.ProjectViewComponent,
                        not_found_component_1.NotFoundComponent,
                        task_view_component_1.TaskViewComponent,
                        task_options_component_1.TaskOptionsComponent,
                        project_task_item_component_1.ProjectTaskItemComponent,
                        timestampFormat_1.TimestampFormat
                    ],
                    imports: [
                        app_routes_1.routing,
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule,
                        forms_1.ReactiveFormsModule,
                        http_1.HttpModule,
                        router_1.RouterModule,
                        ng2_charts_1.ChartsModule
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
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [];
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map