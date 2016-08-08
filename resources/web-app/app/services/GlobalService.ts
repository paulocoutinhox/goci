import {Injectable, EventEmitter} from "@angular/core";

@Injectable()
export class GlobalService {

	public jobsCount: number = 0;
	public jobList: any;
	public jobsCountEmitter = new EventEmitter<number>();

	constructor() {

	}

	emitJobsCount() {
		this.jobsCountEmitter.emit(this.jobsCount);
	}

}