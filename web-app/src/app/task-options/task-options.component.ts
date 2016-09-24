import {Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit} from "@angular/core";
import {TaskService} from "../services/TaskService";
import {FormControl, FormGroup} from "@angular/forms";
import {Utils} from "../models/Utils";
import {ProjectTaskOption} from "../models/ProjectTaskOption";
import {WebResponse} from "../models/WebResponse";

@Component({
	selector: 'task-options',
	templateUrl: 'task-options.component.html'
})

export class TaskOptionsComponent implements OnInit, AfterViewInit {

	@Input()
	projectId: string;

	@Input()
	projectName: string;

	@Input()
	taskId: string;

	@Input()
	taskName: string;

	@Input()
	taskDescription: string;

	@Input()
	options: any;

	form: FormGroup = new FormGroup({});

	@Output()
	taskRunWithSuccess = new EventEmitter();

	@Output()
	taskRunWithError = new EventEmitter();

	@Output()
	taskRunCancel = new EventEmitter();

	@Input()
	taskOptions: ProjectTaskOption[];

	showEmptyMessage: boolean;

	@ViewChild('btRun')
	btRun: any;

	constructor(private taskService: TaskService) {

	}

	ngOnInit(): any {
		this.load();
	}

	ngAfterViewInit() {
		this.btRun.nativeElement.focus();
	}

	load() {
		let controlList: any = {};
		this.taskOptions = [];

		if (this.options != null) {
			this.options.forEach((option: any) => {
				controlList[option["id"]] = new FormControl(option["value"]);

				this.taskOptions.push(new ProjectTaskOption({
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

		this.taskService.run(formData)
			.then((wr: WebResponse) => {
				if (wr.success) {
					toastr.success("Your task was added to queue with success!");
					this.taskRunWithSuccess.emit();
				} else {
					toastr.error(Utils.getFirstErrorMessage(wr));
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
