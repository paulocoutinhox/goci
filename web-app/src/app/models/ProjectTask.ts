import {ProjectTaskStep} from "./ProjectTaskStep";
import {ProjectTaskStepOption} from "./ProjectTaskStepOption";

export class ProjectTask {

	id: string;
	name: string;
	description: string;
	steps: Array<ProjectTaskStep>;
	options: Array<ProjectTaskStepOption>;

}