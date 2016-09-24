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
	project: Project;

	@Input()
	task: ProjectTask;

	lastJob: Job;

	@Output()
	showTaskOptions = new EventEmitter<ProjectTask>();

	constructor(private globalService: GlobalService, private router: Router) {

	}

	ngOnInit(): any {
		this.globalService.jobListEmitter.subscribe((jobList: Job[]) => {
			this.lastJob = this.getLastJobByProjectAndTask(jobList, this.project.id, this.task.id);
		});
	}

	getLastJobByProjectAndTask(jobList: Job[], projectId: string, taskId: string): Job {
		if (jobList == null) {
			return null;
		}

		var lastJob: Job = null;

		for (var jobIndex in jobList) {
			var job = jobList[jobIndex];

			if (job.projectId == projectId && job.taskId == taskId) {
				lastJob = job;
			}
		}

		return lastJob;
	}

	sendShowTaskOptionsEvent() {
		this.showTaskOptions.emit(this.task);
	}

	view(taskId: string) {
		this.router.navigate(['/task/view', this.project['id'], taskId]);
	}

}
