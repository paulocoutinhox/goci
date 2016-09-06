import {ProjectTaskOptionValuesItem} from "./ProjectTaskOptionValuesItem";

export class ProjectTaskOption {

	id: string;
	type: string;
	description: string;
	value: string;
	values: [ProjectTaskOptionValuesItem];

	constructor(options: {} = {}) {
		this.id = options["id"] || '';
		this.type = options["type"] || '';
		this.description = options["description"] || '';
		this.value = options["value"] || '';
		this.values = options["values"] || '';
	}

}