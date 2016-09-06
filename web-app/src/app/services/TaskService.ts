import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {ProjectTaskOption} from "../models/ProjectTaskOption";
import {TaskViewResult} from "../models/TaskViewResult";
import "rxjs/add/operator/toPromise";

@Injectable()
export class TaskService {

	constructor(private http: Http) {

	}

	options(projectId: string, taskId: string): Promise<ProjectTaskOption[]> {
		return this.http.get('/api/task/options?project=' + projectId + '&task=' + taskId)
			.toPromise()
			.then(response => response.json().data.options as ProjectTaskOption[])
			.catch(this.handleError);
	}

	view(projectId: string, taskId: string): Promise<TaskViewResult> {
		return this.http.get('/api/task/view?project=' + projectId + '&task=' + taskId)
			.toPromise()
			.then(response => response.json().data as TaskViewResult)
			.catch(this.handleError);
	}

	run(formData: string) {
		let headers: Headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});

		return this.http.post('/api/task/run', formData, {headers: headers})
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

}