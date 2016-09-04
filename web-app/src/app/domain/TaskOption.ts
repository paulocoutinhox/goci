export class TaskOption {

	public id: string;
	public type: string;
	public description: string;
	public value: string;
	public values: any;

	constructor(options: {} = {}) {
		this.id = options["id"] || '';
		this.type = options["type"] || '';
		this.description = options["description"] || '';
		this.value = options["value"] || '';
		this.values = options["values"] || '';
	}

}