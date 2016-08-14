import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {GlobalService} from "../services/GlobalService";

@Component({
	selector: 'job-list',
	templateUrl: 'app/job-list/job-list.component.html',
	styleUrls: ['app/job-list/job-list.component.css']
})

export class JobListComponent implements OnInit {

	private showData: boolean;
	private showEmptyData: boolean;
	private showError: boolean;
	private showLoading: boolean;

	private jobList: Array<any>;

	constructor(private globalService: GlobalService, private router: Router) {
		this.hideAll();
		this.showLoading = true;
	}

	ngOnInit(): any {
		this.globalService.jobListEmitter.subscribe(value => {
			this.jobList = value;

			if (this.jobList == null) {
				this.hideAll();
				this.showError = true;
			} else if (this.jobList.length == 0) {
				this.hideAll();
				this.showEmptyData = true;
			} else {
				this.hideAll();
				this.showData = true;
			}
		});
	}

	hideAll() {
		this.showData = false;
		this.showEmptyData = false;
		this.showLoading = false;
		this.showError = false;
	}

	view(projectId, taskId) {
		this.router.navigate(['/task/view', projectId, taskId]);
	}

	back() {
		this.router.navigate(['/']);
	}

}