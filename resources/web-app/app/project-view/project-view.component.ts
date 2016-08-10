import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../services/ProjectService";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {TaskService} from "../services/TaskService";
import {TaskOptionsComponent} from "../task-options/task-options.component";

@Component({
	selector: 'project-view',
	templateUrl: 'app/project-view/project-view.component.html',
	styleUrls: ['app/project-view/project-view.component.css'],
	directives: [
		TaskOptionsComponent
	]
})

export class ProjectViewComponent implements OnInit {

	private projectId: String;
	private project: any;

	private showData: boolean;
	private showEmptyData: boolean;
	private showError: boolean;
	private showLoading: boolean;

	private runTaskOptions: any;
	private runProjectId: String;
	private runTaskId: String;
	private runTaskName: String;
	private runTaskDescription: String;
	private showTaskOptionsForm: boolean;

	constructor(private projectService: ProjectService, private taskService: TaskService, private router: Router, private route: ActivatedRoute) {

	}

	ngOnInit(): any {
		this.route.params.subscribe(params => {
			this.projectId = params['project'];
		});

		this.load();
	}

	load() {
		this.hideAll();
		this.showLoading = true;

		Observable.empty().delay(1000).subscribe(null, null, () => {
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

}