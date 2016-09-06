import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {ProjectTaskOption} from "../models/ProjectTaskOption";
import "rxjs/add/operator/toPromise";
import {WebResponse} from "../models/WebResponse";
import {ProjectTask} from "../models/ProjectTask";
import {Project} from "../models/Project";

@Injectable()
export class TaskService {

	constructor(private http: Http) {

	}

	options(projectId: string, taskId: string): Promise<WebResponse> {
		return this.http.get('/api/task/options?project=' + projectId + '&task=' + taskId)
			.toPromise()
			.then((response: Response) => {
				let wr = response.json() as WebResponse;
				wr.data['options'] = wr.data['options'] as ProjectTaskOption[];
				return wr;
			})
			.catch(this.handleError);
	}

	view(projectId: string, taskId: string): Promise<WebResponse> {
		return this.http.get('/api/task/view?project=' + projectId + '&task=' + taskId)
			.toPromise()
			.then((response: Response) => {
				let wr = response.json() as WebResponse;
				wr.data['project'] = wr.data['project'] as Project;
				wr.data['task'] = wr.data['task'] as ProjectTask;
				return wr;
			})
			.catch(this.handleError);
	}

	run(formData: string): Promise<WebResponse> {
		let headers: Headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});

		return this.http.post('/api/task/run', formData, {headers: headers})
			.toPromise()
			.then((response: Response) => {
				return response.json() as WebResponse;
			})
			.catch(this.handleError);
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

}