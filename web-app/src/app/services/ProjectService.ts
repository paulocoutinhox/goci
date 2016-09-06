import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Project} from "../models/Project";

@Injectable()
export class ProjectService {

	constructor(private http: Http) {

	}

	list(): Promise<Project[]> {
		return this.http.get('/api/project/list')
			.toPromise()
			.then(response => response.json().data.list as Project[])
			.catch(this.handleError);
	}

	view(projectId:String): Promise<Project> {
		return this.http.get('/api/project/view?project=' + projectId)
			.toPromise()
			.then(response => response.json().data.project as Project)
			.catch(this.handleError);
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

}