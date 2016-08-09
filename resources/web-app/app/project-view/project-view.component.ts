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

	private projectName: String;

	constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute) {

	}

	ngOnInit(): any {
		this.route.params.subscribe(params => {
			this.projectName = params['project'] + '!';
		})
	}

}