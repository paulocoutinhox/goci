import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {GlobalService} from "../services/GlobalService";
import {Job} from "../models/Job";

@Component({
	selector: 'job-list',
	templateUrl: 'job-list.component.html',
	styleUrls: ['job-list.component.css']
})

export class JobListComponent implements OnInit {

	showData: boolean;
	showEmptyData: boolean;
	showError: boolean;
	showLoading: boolean;

	jobList: Array<any>;

	chartData: any;
	chartDataDatasets: any[];
	chartDataLabels: string[] = [];
	chartDataOptions: any = {};
	chartDataColors: string[] = [];

	constructor(private globalService: GlobalService, private router: Router) {
		this.hideAll();
		this.showLoading = true;
	}

	ngOnInit(): any {
		this.globalService.jobListEmitter.subscribe((jobList: Job[]) => {
			this.jobList = jobList;

			if (this.jobList == null) {
				this.hideAll();
				this.showError = true;
			} else if (this.jobList.length == 0) {
				this.hideAll();
				this.showEmptyData = true;
			} else {
				// job list data
				this.hideAll();
				this.showData = true;

				// chart data
				var chartLabels: string[] = [];
				var chartColors: string[] = [];
				var chartDataset: number[] = [];
				var chartOptions: any = {
					animation: false
				};

				var chartDataForOnQueue = 0;
				var chartDataForRunning = 0;
				var chartDataForError = 0;
				var chartDataForSuccess = 0;

				for (let jobIndex in this.jobList) {
					let job = this.jobList[jobIndex];
					let jobStatus = job["status"];

					switch (jobStatus) {
						case 'onqueue':
							chartDataForOnQueue += 1;
							break;

						case 'running':
							chartDataForRunning += 1;
							break;

						case 'error':
							chartDataForError += 1;
							break;

						case 'success':
							chartDataForSuccess += 1;
							break;
					}
				}

				if (chartDataForOnQueue > 0) {
					chartLabels.push("On Queue");
					chartColors.push("#08b4fa");
					chartDataset.push(chartDataForOnQueue);
				}

				if (chartDataForSuccess > 0) {
					chartLabels.push("Success");
					chartColors.push("#39c558");
					chartDataset.push(chartDataForSuccess);
				}

				if (chartDataForError > 0) {
					chartLabels.push("Error");
					chartColors.push("#ff3e43");
					chartDataset.push(chartDataForError);
				}

				if (chartDataForRunning > 0) {
					chartLabels.push("Running");
					chartColors.push("#ffbe41");
					chartDataset.push(chartDataForRunning);
				}

				this.chartData = {
					type: 'doughnut',
					animation: {
						animateScale: false,
						animateRotate: false
					},
					labels: chartLabels,
					datasets: [
						{
							data: chartDataset,
							backgroundColor: chartColors,
							hoverBackgroundColor: chartColors
						}
					],
					graphOptions: {
						animation: false
					}
				};

				this.chartDataDatasets = [{
					data: chartDataset,
					backgroundColor: chartColors,
					hoverBackgroundColor: chartColors
				}];

				this.chartDataLabels = chartLabels;
				this.chartDataOptions = chartOptions;
				this.chartDataColors = chartColors;
			}
		});
	}

	hideAll() {
		this.showData = false;
		this.showEmptyData = false;
		this.showLoading = false;
		this.showError = false;
	}

	view(projectId: string, taskId: string) {
		this.router.navigate(['/task/view', projectId, taskId]);
	}

	back() {
		this.router.navigate(['/project/list']);
	}

}
