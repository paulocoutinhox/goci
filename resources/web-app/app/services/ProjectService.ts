import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ProjectService {

	constructor(private http: Http) {

	}

	list() {
		return this.http.get('/api/project/list')
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	view(projectId:String) {
		return this.http.get('/api/project/view?project=' + projectId)
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

}