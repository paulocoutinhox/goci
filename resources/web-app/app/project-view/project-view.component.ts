import {Component, OnInit, Input} from "@angular/core";
import {ProjectService} from "../services/ProjectService";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {TaskService} from "../services/TaskService";
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup} from "@angular/forms";
import {TaskOption} from "../domain/TaskOption";

@Component({
	selector: 'project-view',
	templateUrl: 'app/project-view/project-view.component.html',
	styleUrls: ['app/project-view/project-view.component.css'],
	providers: [
		ProjectService,
		TaskService
	],
	directives: [
		REACTIVE_FORM_DIRECTIVES
	]
})

export class ProjectViewComponent implements OnInit {

	private projectId: String;
	private project: any;

	private showData: boolean;
	private showEmptyData: boolean;
	private showError: boolean;
	private showLoading: boolean;

	private form: FormGroup = new FormGroup({});

	@Input()
	private taskOptions: Array<TaskOption>;

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
	}

	onError() {
		this.hideAll();
		this.showError = true;
		this.project = null;
	}

	view(projectId, taskId) {
		this.router.navigate(['/task/view', projectId, taskId]);
	}

	showTaskOptions(projectId, taskId) {
		toastr.success("Job to be queued:<br />" + projectId + " | " + taskId);

		this.form = null;
		this.taskOptions = [];

		this.taskService.options(projectId, taskId)
			.then(response => {
				if (response != null && response.success == true) {
					let options = response.data.options;

					let controlList: any = {};

					if (options != null) {
						options.forEach(option => {
							controlList[option["id"]] = new FormControl(option["value"]);

							this.taskOptions.push(new TaskOption({
								id: option['id'],
								type: option['type'],
								description: option['description'],
								value: option['value'],
								values: option['values']
							}));
						});
					}

					console.log(this.taskOptions);

					this.form = new FormGroup(controlList);
				} else {
					console.log('Error on get task options');
				}
			})
			.catch(() => {
				console.log('Error on get task options');
			});
	}

	run(projectId, taskId) {
		console.log(JSON.stringify(this.form.value));
	}

}