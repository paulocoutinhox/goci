import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class JobService {

	constructor(private http: Http) {

	}

	getRunningList() {
		return this.http.get('/api/job/runningList')
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

}