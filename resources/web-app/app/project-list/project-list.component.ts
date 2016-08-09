import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../services/ProjectService";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";

@Component({
	selector: 'project-list',
	templateUrl: 'app/project-list/project-list.component.html',
	styleUrls: ['app/project-list/project-list.component.css'],
	providers: [
		ProjectService
	]
})

export class ProjectListComponent implements OnInit {

	private list: Array<any>;

	private showList: boolean;
	private showEmptyList: boolean;
	private showError: boolean;
	private showLoading: boolean;

	constructor(private projectService: ProjectService, private router: Router) {

	}

	ngOnInit(): any {
		this.load();
	}

	load() {
		this.hideAll();
		this.showLoading = true;

		Observable.empty().delay(1000).subscribe(null, null, () => {
			this.getData();
		});
	}

	getData() {
		this.projectService.getProjectList()
			.then(response => {
				if (response != null && response.success == true) {
					this.list = response.data.list;

					this.hideAll();

					if (this.list.length > 0) {
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
		this.list = [];
	}

	view(projectId) {
		this.router.navigate(['/project/view', projectId]);
	}

}