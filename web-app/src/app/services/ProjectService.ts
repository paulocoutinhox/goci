import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Project} from "../models/Project";
import {WebResponse} from "../models/WebResponse";

@Injectable()
export class ProjectService {

	constructor(private http: Http) {

	}

	list(): Promise<WebResponse> {
		return this.http.get('/api/project/list')
			.toPromise()
			.then((response: Response) => {
				let wr = response.json() as WebResponse;
				wr.data['list'] = wr.data['list'] as Project[];
				return wr;
			})
			.catch(this.handleError);
	}

	view(projectId: String): Promise<WebResponse> {
		return this.http.get('/api/project/view?project=' + projectId)
			.toPromise()
			.then((response: Response) => {
				let wr = response.json() as WebResponse;
				wr.data['project'] = wr.data['project'] as Project;
				return wr;
			})
			.catch(this.handleError);
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

}