import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../services/ProjectService";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {GlobalService} from "../services/GlobalService";

@Component({
	selector: 'project-list',
	templateUrl: 'project-list.component.html',
	styleUrls: ['project-list.component.css']
})

export class ProjectListComponent implements OnInit {

	private list: Array<any>;

	private showList: boolean;
	private showEmptyList: boolean;
	private showError: boolean;
	private showLoading: boolean;

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

	view(projectId: string) {
		this.router.navigate(['/project/view', projectId]);
	}

}
