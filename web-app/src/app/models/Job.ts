import {ProjectTask} from "./ProjectTask";
import {JobOutputGroup} from "./JobOutputGroup";

export class Job {

	id: string;
	taskId: string;
	projectId: string;
	projectName: string;
	outputGroup: JobOutputGroup[];
	duration: number;
	progress: number;
	status: string;
	createdAt: number;
	startedAt: number;
	finishedAt: number;
	task: ProjectTask;

}