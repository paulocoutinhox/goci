import {Component, OnInit} from "@angular/core";
import {AppHeaderComponent} from "../app-header/app-header.component";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {AppFooterComponent} from "../app-footer/app-footer.component";
import {JobListComponent} from "../job-list/job-list.component";
import {ProjectListComponent} from "../project-list/project-list.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {GlobalService} from "../services/GlobalService";
import {JobService} from "../services/JobService";
import {Observable} from "rxjs/Rx";

@Component({
	selector: 'app-main',
	templateUrl: 'app/app-main/app-main.component.html',
	directives: [ROUTER_DIRECTIVES, AppHeaderComponent, AppFooterComponent],
	styleUrls: ['app/app-main/app-main.component.css'],
	precompile: [
		HomeComponent,
		AppHeaderComponent,
		AppFooterComponent,
		JobListComponent,
		ProjectListComponent,
		NotFoundComponent
	],
	providers: [
		JobService
	]
})

export class AppMainComponent implements OnInit {

	constructor(private globalService: GlobalService, private jobService: JobService) {

	}

	ngOnInit(): any {
		let jobsCountTimer = Observable.timer(2000, 1000);
		jobsCountTimer.subscribe(t => this.setJobCount());
	}

	setJobCount() {
		this.jobService.getRunningList()
			.then(res => {
				this.globalService.jobsCount = res.data.count;
				this.globalService.jobList = res.data.jobs;
				this.globalService.emitJobsCount();
			})
			.catch(error => {
				//
			});
	}

}