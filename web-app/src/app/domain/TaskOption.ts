export class TaskOption {

	public id: String;
	public type: String;
	public description: String;
	public value: String;
	public values: any;

	constructor(options: {} = {}) {
		this.id = options["id"] || '';
		this.type = options["type"] || '';
		this.description = options["description"] || '';
		this.value = options["value"] || '';
		this.values = options["values"] || '';
	}

}