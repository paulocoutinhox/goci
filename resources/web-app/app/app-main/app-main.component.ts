import {Component, OnInit} from "@angular/core";
import {GlobalService} from "../services/GlobalService";
import {JobService} from "../services/JobService";
import {Observable} from "rxjs/Rx";

@Component({
	selector: 'app-main',
	templateUrl: 'app/app-main/app-main.component.html',
	styleUrls: ['app/app-main/app-main.component.css']
})

export class AppMainComponent implements OnInit {

	constructor(private globalService: GlobalService, private jobService: JobService) {

	}

	ngOnInit(): any {
		let jobsCountTimer = Observable.timer(1000, 1000);
		jobsCountTimer.subscribe(() => this.setJobCount());
	}

	setJobCount() {
		this.jobService.getRunningList()
			.then(res => {
				this.globalService.jobsCount = res.data.count;
				this.globalService.jobList = res.data.jobs;
				this.globalService.emitJobsCount();
				this.globalService.emitJobList();
			})
			.catch(() => {
				this.globalService.jobsCount = 0;
				this.globalService.jobList = null;
				this.globalService.emitJobsCount();
				this.globalService.emitJobList();
			});
	}

}