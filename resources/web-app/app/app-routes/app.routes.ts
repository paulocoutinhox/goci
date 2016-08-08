import {provideRouter, RouterConfig} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {JobListComponent} from "../job-list/job-list.component";
import {ProjectListComponent} from "../project-list/project-list.component";
import {NotFoundComponent} from "../not-found/not-found.component";

const routes: RouterConfig = [
	//{ path: '**', component: PageNotFoundComponent },
	{
		path: '',
		redirectTo: 'home',
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
		path: '**',
		component: NotFoundComponent
	}
];

export const appRouterProviders = [
	provideRouter(routes)
];