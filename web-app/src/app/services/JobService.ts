import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Job} from "../models/Job";
import {WebResponse} from "../models/WebResponse";

@Injectable()
export class JobService {

	constructor(private http: Http) {

	}

	getRunningList(): Promise<WebResponse> {
		return this.http.get('/api/job/runningList')
			.toPromise()
			.then((response: Response) => {
				let wr = response.json() as WebResponse;
				wr.data['jobs'] = wr.data['jobs'] as Job[];
				wr.data['count'] = wr.data['count'] as number;
				return wr;
			})
			.catch(this.handleError);
	}

	last(projectId: string, taskId: string): Promise<WebResponse> {
		return this.http.get('/api/job/last?project=' + projectId + '&task=' + taskId)
			.toPromise()
			.then((response: Response) => {
				let wr = response.json() as WebResponse;
				wr.data['job'] = wr.data['job'] as Job;
				return wr;
			})
			.catch(this.handleError);
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

}