import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../services/ProjectService";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {TaskService} from "../services/TaskService";
import {GlobalService} from "../services/GlobalService";
import {Project} from "../models/Project";
import {Job} from "../models/Job";
import {ProjectTask} from "../models/ProjectTask";
import {ProjectTaskOption} from "../models/ProjectTaskOption";

@Component({
	selector: 'project-view',
	templateUrl: 'project-view.component.html'
})

export class ProjectViewComponent implements OnInit {

	private projectId: string;
	private project: Project;

	private showData: boolean;
	private showEmptyData: boolean;
	private showError: boolean;
	private showLoading: boolean;

	private jobList: Job[];

	private runTaskOptions: any;
	private runProjectId: string;
	private runProjectName: string;
	private runTaskId: string;
	private runTaskName: string;
	private runTaskDescription: string;
	private showTaskOptionsForm: boolean;

	constructor(private globalService: GlobalService, private projectService: ProjectService, private taskService: TaskService, private router: Router, private route: ActivatedRoute) {

	}

	ngOnInit(): any {
		this.route.params.subscribe(params => {
			this.projectId = params['project'];
		});

		this.globalService.jobListEmitter.subscribe((jobList: Job[]) => {
			this.jobList = jobList;
		});

		this.load();
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
		this.projectService.view(this.projectId)
			.then((project: Project) => {
				if (project) {
					this.project = project;

					this.hideAll();

					if (this.project != null) {
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
		this.router.navigate(['/project/list']);
	}

	hideAll() {
		this.showData = false;
		this.showEmptyData = false;
		this.showLoading = false;
		this.showError = false;
		this.showTaskOptionsForm = false;
	}

	onError() {
		this.hideAll();
		this.showError = true;
		this.project = null;
	}

	showTaskOptions(task: ProjectTask) {
		this.showTaskOptionsForm = false;
		this.runProjectId = this.project.id;
		this.runProjectName = this.project.name;
		this.runTaskId = task.id;
		this.runTaskName = task.name;
		this.runTaskDescription = task.description;
		this.runTaskOptions = null;

		this.taskService.options(this.project.id, task.id)
			.then((options: ProjectTaskOption[]) => {
				this.runTaskOptions = options;
				this.showTaskOptionsForm = true;
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

}
