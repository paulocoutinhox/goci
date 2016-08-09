import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../services/ProjectService";
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";

@Component({
	selector: 'project-view',
	templateUrl: 'app/project-view/project-view.component.html',
	styleUrls: ['app/project-view/project-view.component.css'],
	providers: [
		ProjectService
	]
})

export class ProjectViewComponent implements OnInit {

	private projectId: String;
	private project: any;

	private showData: boolean;
	private showEmptyData: boolean;
	private showError: boolean;
	private showLoading: boolean;

	constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute) {

	}

	ngOnInit(): any {
		this.route.params.subscribe(params => {
			this.projectId = params['project'];
		});

		this.load();
	}

	load() {
		this.hideAll();
		this.showLoading = true;

		Observable.empty().delay(1000).subscribe(null, null, () => {
			this.getData();
		});

		toastr.success('Are you the 6 fingered man?', 'aaa', {'hideDuration':  99999999});
	}

	getData() {
		this.projectService.view(this.projectId)
			.then(response => {
				if (response != null && response.success == true) {
					this.project = response.data.project;

					this.hideAll();

					if (this.project != null) {
						this.showData = true;
					} else {
						this.showEmptyData = true;
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
		this.router.navigate(['/project/list']);
	}

	hideAll() {
		this.showData = false;
		this.showEmptyData = false;
		this.showLoading = false;
		this.showError = false;
	}

	onError() {
		this.hideAll();
		this.showError = true;
		this.project = null;
	}

	view(projectId, taskId) {
		this.router.navigate(['/task/view', projectId, taskId]);
	}

}