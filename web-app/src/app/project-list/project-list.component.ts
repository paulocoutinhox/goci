import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../services/ProjectService";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {GlobalService} from "../services/GlobalService";
import {Project} from "../models/Project";
import {WebResponse} from "../models/WebResponse";

@Component({
	selector: 'project-list',
	templateUrl: 'project-list.component.html'
})

export class ProjectListComponent implements OnInit {

	projectList: Project[];

	showList: boolean;
	showEmptyList: boolean;
	showError: boolean;
	showLoading: boolean;

	constructor(private globalService: GlobalService, private projectService: ProjectService, private router: Router) {

	}

	ngOnInit(): any {
		this.load();
	}

	load() {
		this.hideAll();

		if (this.globalService.loadingDelayTime > 0) {
			this.showLoading = true;
		}

		Observable.empty().delay(this.globalService.loadingDelayTime).subscribe(null, null, () => {
			this.getData();
		});
	}

	getData() {
		this.projectService.list()
			.then((wr: WebResponse) => {
				var projectList: Project[] = wr.data['list'];

				if (projectList) {
					this.projectList = projectList;

					this.hideAll();

					if (this.projectList.length > 0) {
						this.showList = true;
					} else {
						this.showEmptyList = true;
					}
				} else {
					this.onError();
				}
			})
			.catch(() => {
				this.onError();
			});
	}

	back() {
		this.router.navigate(['/']);
	}

	hideAll() {
		this.showList = false;
		this.showEmptyList = false;
		this.showLoading = false;
		this.showError = false;
	}

	onError() {
		this.hideAll();
		this.showError = true;
		this.projectList = [];
	}

	view(projectId: string) {
		this.router.navigate(['/project/view', projectId]);
	}

}
