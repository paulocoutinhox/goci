import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {TaskService} from "../services/TaskService";
import {JobService} from "../services/JobService";
import {Utils} from "../models/Utils";
import {GlobalService} from "../services/GlobalService";
import {TaskViewResult} from "../models/TaskViewResult";
import {ProjectTaskOption} from "../models/ProjectTaskOption";
import {Job} from "../models/Job";
import {Project} from "../models/Project";
import {ProjectTask} from "../models/ProjectTask";
import {JobOutputGroup} from "../models/JobOutputGroup";

@Component({
	selector: 'task-view',
	templateUrl: 'task-view.component.html'
})

export class TaskViewComponent implements OnInit {

	private projectId: string;
	private taskId: string;
	private project: Project;
	private task: ProjectTask;
	private lastJob: Job;

	private showData: boolean;
	private showEmptyData: boolean;
	private showError: boolean;
	private showLoading: boolean;

	private showLastJobData: boolean;
	private showLastJobEmptyData: boolean;
	private showLastJobError: boolean;
	private showLastJobLoading: boolean;

	private showTaskOptionsForm: boolean;

	private runTaskOptions: ProjectTaskOption[];
	private runProjectId: string;
	private runProjectName: string;
	private runTaskId: string;
	private runTaskName: string;
	private runTaskDescription: string;

	private jobOutputGroupList: JobOutputGroup[];
	private lastJobId: string;

	constructor(private globalService: GlobalService, private taskService: TaskService, private jobService: JobService, private router: Router, private route: ActivatedRoute) {

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

		if (this.globalService.loadingDelayTime > 0) {
			this.showLoading = true;
		}

		Observable.empty().delay(this.globalService.loadingDelayTime).subscribe(null, null, () => {
			this.getData();
		});
	}

	getData() {
		this.taskService.view(this.projectId, this.taskId)
			.then((result: TaskViewResult) => {
				if (result) {
					this.project = result.project
					this.task = result.task;

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
		this.hideAllForLastJob();
		this.showLastJobError = true;
		this.lastJob = null;
	}

	view(projectId: string, taskId: string) {
		this.router.navigate(['/task/view', projectId, taskId]);
	}

	showTaskOptions(projectId: string, projectName: string, taskId: string, taskName: string, taskDescription: string) {
		this.showTaskOptionsForm = false;
		this.runProjectId = projectId;
		this.runProjectName = projectName;
		this.runTaskId = taskId;
		this.runTaskName = taskName;
		this.runTaskDescription = taskDescription;
		this.runTaskOptions = null;

		this.taskService.options(projectId, taskId)
			.then((options: ProjectTaskOption[]) => {
				if (options != null) {
					this.hideAll();
					this.runTaskOptions = options;
					this.showTaskOptionsForm = true;
				} else {
					toastr.error('Error when get task options, try again');
				}
			})
			.catch(error => {
				toastr.error(error);
			});
	}

	taskRunWithSuccess($event: any) {
		this.hideAll();
		this.showData = true;
	}

	taskRunWithError($event: any) {

	}

	taskRunCancel($event: any) {
		this.hideAll();
		this.showData = true;
	}

	getLastJobData() {
		this.jobService.last(this.projectId, this.taskId)
			.then((job: Job) => {
					if (job) {
						this.lastJob = job;

						if (this.lastJob.id != this.lastJobId) {
							this.lastJobId = this.lastJob.id;
							this.jobOutputGroupList = [];
						}

						let newOutputGroupList: JobOutputGroup[] = this.lastJob.outputGroup;
						let activeTabId = "console";

						// add new tabs
						if (newOutputGroupList) {
							for (let newOutputGroupKey in newOutputGroupList) {
								let newOutputGroup = newOutputGroupList[newOutputGroupKey];
								let hasOutputGroup = false;

								for (let outputGroupKey in this.jobOutputGroupList) {
									let outputGroup = this.jobOutputGroupList[outputGroupKey];

									if (outputGroup.name == newOutputGroup.name) {
										hasOutputGroup = true;

										if (outputGroup.updatedAt != newOutputGroup.updatedAt) {
											outputGroup.updatedAt = newOutputGroup.updatedAt;
											outputGroup.output = newOutputGroup.output;
										}
									}
								}

								if (!hasOutputGroup) {
									let jobOutputGroup = new JobOutputGroup();

									jobOutputGroup.id = Utils.slugify(newOutputGroup.name);
									jobOutputGroup.name = newOutputGroup.name;
									jobOutputGroup.output = newOutputGroup.output;
									jobOutputGroup.updatedAt = newOutputGroup.updatedAt;

									this.jobOutputGroupList.push(jobOutputGroup);
								}
							}
						}

						// select tab
						for (let outputGroupKey in this.jobOutputGroupList) {
							let outputGroup = this.jobOutputGroupList[outputGroupKey];

							if (outputGroup.id == activeTabId) {
								outputGroup.active = true;
							} else {
								outputGroup.active = false;
							}
						}

						this.hideAllForLastJob();

						if (this.lastJob != null) {
							this.showLastJobData = true;
						} else {
							this.showLastJobEmptyData = true;
						}
					} else {
						this.onErrorForLastJob();
					}
				}
			)
			.catch(() => {
				this.onErrorForLastJob();
			});
	}

}
