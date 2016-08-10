"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("../home/home.component");
var job_list_component_1 = require("../job-list/job-list.component");
var project_list_component_1 = require("../project-list/project-list.component");
var not_found_component_1 = require("../not-found/not-found.component");
var project_view_component_1 = require("../project-view/project-view.component");
var appRoutes = [
    //{ path: '**', component: PageNotFoundComponent },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home', component: home_component_1.HomeComponent
    },
    {
        path: 'job/list', component: job_list_component_1.JobListComponent
    },
    {
        path: 'project/list', component: project_list_component_1.ProjectListComponent
    },
    {
        path: 'project/view/:project', component: project_view_component_1.ProjectViewComponent
    },
    {
        path: '**',
        component: not_found_component_1.NotFoundComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map