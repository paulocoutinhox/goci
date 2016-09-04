import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {TaskService} from "../services/TaskService";
import {FormControl, FormGroup} from "@angular/forms";
import {TaskOption} from "../domain/TaskOption";
import {Utils} from "../domain/Utils";

@Component({
	selector: 'task-options',
	templateUrl: 'task-options.component.html'
})

export class TaskOptionsComponent implements OnInit {

	@Input()
	private projectId: string;

	@Input()
	private projectName: string;

	@Input()
	private taskId: string;

	@Input()
	private taskName: string;

	@Input()
	private taskDescription: string;

	@Input()
	private options: any;

	private form: FormGroup = new FormGroup({});

	@Output()
	private taskRunWithSuccess = new EventEmitter();

	@Output()
	private taskRunWithError = new EventEmitter();

	@Output()
	private taskRunCancel = new EventEmitter();

	@Input()
	private taskOptions: Array<TaskOption>;

	private showEmptyMessage: boolean;

	constructor(private taskService: TaskService) {

	}

	ngOnInit(): any {
		this.load();
	}

	load() {
		let controlList: any = {};
		this.taskOptions = [];

		if (this.options != null) {
			this.options.forEach((option: any) => {
				controlList[option["id"]] = new FormControl(option["value"]);

				this.taskOptions.push(new TaskOption({
					id: option['id'],
					type: option['type'],
					description: option['description'],
					value: option['value'],
					values: option['values']
				}));
			});
		} else {
			this.showEmptyMessage = true;
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

	cancel() {
		this.taskRunCancel.emit();
	}

}
