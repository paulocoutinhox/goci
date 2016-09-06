import {Component, OnInit, EventEmitter, Output, Input} from "@angular/core";
import {Router} from "@angular/router";
import {GlobalService} from "../services/GlobalService";
import {Job} from "../models/Job";
import {Project} from "../models/Project";
import {ProjectTask} from "../models/ProjectTask";

@Component({
	selector: 'project-task-item',
	templateUrl: 'project-task-item.component.html'
})

export class ProjectTaskItemComponent implements OnInit {

	@Input()
	private project: Project;

	@Input()
	private task: ProjectTask;

	private lastJob: Job;

	@Output()
	private showTaskOptions = new EventEmitter<ProjectTask>();

	constructor(private globalService: GlobalService, private router: Router) {

	}

	ngOnInit(): any {
		this.globalService.jobListEmitter.subscribe((jobList: Job[]) => {
			this.lastJob = this.getLastJobByProjectAndTask(jobList, this.project.id, this.task.id);
		});
	}

	getLastJobByProjectAndTask(jobList: Array<any>, projectId: string, taskId: string) {
		if (jobList == null) {
			return null;
		}

		for (var jobIndex in jobList) {
			var job = jobList[jobIndex];

			if (job['projectId'] == projectId && job['taskId'] == taskId) {
				return job;
			}
		}

		return null;
	}

	sendShowTaskOptionsEvent() {
		this.showTaskOptions.emit(this.task);
	}

	view(taskId: string) {
		this.router.navigate(['/task/view', this.project['id'], taskId]);
	}

}
