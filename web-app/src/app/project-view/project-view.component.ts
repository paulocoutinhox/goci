import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../services/ProjectService";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {TaskService} from "../services/TaskService";
import {GlobalService} from "../services/GlobalService";

@Component({
	selector: 'project-view',
	templateUrl: 'project-view.component.html'
})

export class ProjectViewComponent implements OnInit {

	private projectId: string;
	private project: any;

	private showData: boolean;
	private showEmptyData: boolean;
	private showError: boolean;
	private showLoading: boolean;

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
			.then(response => {
				if (response != null && response.success == true) {
					this.project = response.data.project;

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
