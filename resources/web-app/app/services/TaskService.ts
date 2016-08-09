import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class TaskService {

	constructor(private http: Http) {

	}

	options(projectId:String, taskId:String) {
		return this.http.get('/api/task/options?project=' + projectId + '&task=' + taskId)
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

}