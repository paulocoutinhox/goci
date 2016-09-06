import {Injectable, EventEmitter} from "@angular/core";
import {Job} from "../models/Job";

@Injectable()
export class GlobalService {

	public jobsCount: number = 0;
	public jobList: Job[];
	public jobsCountEmitter = new EventEmitter<number>();
	public jobListEmitter = new EventEmitter<Job[]>();

	public loadingDelayTime: number = 0;

	constructor() {

	}

	emitJobsCount() {
		this.jobsCountEmitter.emit(this.jobsCount);
	}

	emitJobList() {
		this.jobListEmitter.emit(this.jobList);
	}

}