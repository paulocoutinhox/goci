import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {TaskService} from "../services/TaskService";
import {FormControl, FormGroup} from "@angular/forms";
import {TaskOption} from "../domain/TaskOption";
import {Utils} from "../domain/Utils";

@Component({
	selector: 'task-options',
	templateUrl: 'app/task-options/task-options.component.html',
	styleUrls: ['app/task-options/task-options.component.css']
})

export class TaskOptionsComponent implements OnInit {

	@Input()
	private projectId: String;

	@Input()
	private taskId: String;

	@Input()
	private options: any;

	private form: FormGroup = new FormGroup({});

	@Output()
	private taskRunWithSuccess = new EventEmitter();

	@Output()
	private taskRunWithError = new EventEmitter();

	@Input()
	private taskOptions: Array<TaskOption>;

	constructor(private taskService: TaskService) {

	}

	ngOnInit(): any {
		this.load();
	}

	load() {
		let controlList: any = {};
		this.taskOptions = [];

		if (this.options != null) {
			this.options.forEach(option => {
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

		this.form = new FormGroup(controlList);
	}

	run() {
		let formValues = this.form.value;
		let formData = Utils.formValuesEncoded(formValues);
		formData += `&project=${this.projectId}&task=${this.taskId}`;

		this.taskService.run(this.projectId, this.taskId, formData)
			.then(response => {
				if (response != null && response.success == true) {
					toastr.success("Your task was added to queue with success!");
					this.taskRunWithSuccess.emit();
				} else {
					toastr.error(response.data.errors[0][1]);
					this.taskRunWithError.emit();
				}
			})
			.catch(error => {
				toastr.error(error);
				this.taskRunWithError.emit();
			});
	}

}