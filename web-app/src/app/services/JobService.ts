import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Job} from "../models/Job";
import {RunningListResult} from "../models/RunningListResult";

@Injectable()
export class JobService {

	constructor(private http: Http) {

	}

	getRunningList(): Promise<RunningListResult> {
		return this.http.get('/api/job/runningList')
			.toPromise()
			.then(response => response.json().data as RunningListResult)
			.catch(this.handleError);
	}

	last(projectId: string, taskId: string): Promise<Job> {
		return this.http.get('/api/job/last?project=' + projectId + '&task=' + taskId)
			.toPromise()
			.then(response => response.json().data.job as Job)
			.catch(this.handleError);
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

}