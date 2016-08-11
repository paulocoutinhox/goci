import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {TaskService} from "../services/TaskService";
import {JobService} from "../services/JobService";
import {TimestampFormat} from "../pipes/timestampFormat";

@Component({
	selector: 'task-view',
	templateUrl: 'app/task-view/task-view.component.html',
	styleUrls: ['app/task-view/task-view.component.css'],
	pipes: [
		TimestampFormat
	]
})

export class TaskViewComponent implements OnInit {

	private projectId: String;
	private taskId: String;
	private project: any;
	private task: any;
	private lastJob: any;

	private showData: boolean;
	private showEmptyData: boolean;
	private showError: boolean;
	private showLoading: boolean;

	private showLastJobData: boolean;
	private showLastJobEmptyData: boolean;
	private showLastJobError: boolean;
	private showLastJobLoading: boolean;

	private showTaskOptionsForm: boolean;

	private runTaskOptions: any;
	private runProjectId: String;
	private runTaskId: String;
	private runTaskName: String;
	private runTaskDescription: String;

	constructor(private taskService: TaskService, private jobService: JobService, private router: Router, private route: ActivatedRoute) {

	}

	ngOnInit(): any {
		this.route.params.subscribe(params => {
			this.projectId = params['project'];
			this.taskId = params['task'];
		});

		this.load();

		let lastJobTimer = Observable.timer(1000, 1000);
		lastJobTimer.subscribe(() => this.getLastJobData());
	}

	load() {
		this.hideAll();
		this.showLoading = true;

		Observable.empty().delay(1000).subscribe(null, null, () => {
			this.getData();
		});
	}

	getData() {
		this.taskService.view(this.projectId, this.taskId)
			.then(response => {
				if (response != null && response.success == true) {
					this.project = response.data.project;
					this.task = response.data.task;

					this.hideAll();

					if (this.project != null && this.task != null) {
						this.showData = true;
					} else {
						this.showEmptyData = true;
					}
				} else {
					this.onError();
				}
			})
			.catch(() => {
				this.onError();
			});
	}

	back() {
		this.router.navigate(['/project/view', this.projectId]);
	}

	hideAll() {
		this.showData = false;
		this.showEmptyData = false;
		this.showLoading = false;
		this.showError = false;
		this.showTaskOptionsForm = false;
	}

	hideAllForLastJob() {
		this.showLastJobData = false;
		this.showLastJobEmptyData = false;
		this.showLastJobLoading = false;
		this.showLastJobError = false;
	}

	onError() {
		this.hideAll();
		this.showError = true;
		this.project = null;
	}

	onErrorForLastJob() {
		this.hideAll();
		this.showLastJobError = true;
		this.lastJob = null;
	}

	view(projectId, taskId) {
		this.router.navigate(['/task/view', projectId, taskId]);
	}

	showTaskOptions(projectId, taskId, taskName, taskDescription) {
		this.showTaskOptionsForm = false;
		this.runProjectId = projectId;
		this.runTaskId = taskId;
		this.runTaskName = taskName;
		this.runTaskDescription = taskDescription;
		this.runTaskOptions = null;

		this.taskService.options(projectId, taskId)
			.then(response => {
				if (response != null && response.success == true) {
					this.hideAll();
					this.runTaskOptions = response.data.options;
					this.showTaskOptionsForm = true;
				} else {
					toastr.error('Error when get task options, try again');
				}
			})
			.catch(error => {
				toastr.error(error);
			});
	}

	taskRunWithSuccess($event) {
		this.hideAll();
		this.showData = true;
	}

	taskRunWithError($event) {

	}

	taskRunCancel($event) {
		this.hideAll();
		this.showData = true;
	}

	getLastJobData() {
		this.jobService.last(this.projectId, this.taskId)
			.then(response => {
				if (response != null && response.success == true) {
					this.lastJob = response.data.job;

					this.hideAllForLastJob();

					if (this.lastJob != null) {
						this.showLastJobData = true;
					} else {
						this.showLastJobEmptyData = true;
					}
				} else {
					this.onErrorForLastJob();
				}
			})
			.catch(() => {
				this.onErrorForLastJob();
			});
	}

}