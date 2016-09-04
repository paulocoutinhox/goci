import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class TaskService {

	constructor(private http: Http) {

	}

	options(projectId: string, taskId: string) {
		return this.http.get('/api/task/options?project=' + projectId + '&task=' + taskId)
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	view(projectId: string, taskId: string) {
		return this.http.get('/api/task/view?project=' + projectId + '&task=' + taskId)
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	run(projectId: string, taskId: string, options: any) {
		let headers:Headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});

		return this.http.post('/api/task/run', options, {headers: headers})
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

}