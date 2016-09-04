import {Injectable, EventEmitter} from "@angular/core";

@Injectable()
export class GlobalService {

	public jobsCount: number = 0;
	public jobList: any;
	public jobsCountEmitter = new EventEmitter<number>();
	public jobListEmitter = new EventEmitter<any>();

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