import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {JobListComponent} from "../job-list/job-list.component";
import {ProjectListComponent} from "../project-list/project-list.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {ProjectViewComponent} from "../project-view/project-view.component";
import {TaskViewComponent} from "../task-view/task-view.component";

const appRoutes: Routes = [
	//{ path: '**', component: PageNotFoundComponent },
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home', component: HomeComponent
	},
	{
		path: 'job/list', component: JobListComponent
	},
	{
		path: 'project/list', component: ProjectListComponent
	},
	{
		path: 'project/view/:project', component: ProjectViewComponent
	},
	{
		path: 'task/view/:project/:task', component: TaskViewComponent
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

export const routing = RouterModule.forRoot(appRoutes);