import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {GlobalService} from "../services/GlobalService";

@Component({
	selector: 'job-list',
	templateUrl: 'app/job-list/job-list.component.html',
	styleUrls: ['app/job-list/job-list.component.css']
})

export class JobListComponent implements OnInit {

	constructor(private globalService: GlobalService, private router: Router) {

	}

	ngOnInit(): any {
		this.globalService.jobListEmitter.subscribe(value => {
			console.log(value);
		});
	}

	backToHome() {
		this.router.navigate(['/']);
	}

}