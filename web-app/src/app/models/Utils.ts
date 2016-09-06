import {WebResponse} from "./WebResponse";
export class Utils {

	static formValuesEncoded(formValues: any): string {
		let formData = '';

		if (formValues != null) {
			for (var formKey in formValues) {
				var formValue = formValues[formKey];

				if (formData == '') {
					formData += `${formKey}=${formValue}`;
				} else {
					formData += `&${formKey}=${formValue}`;
				}
			}
		}

		return formData;
	}

	static slugify(text: string): string {
		return text.toString().toLowerCase()
			.replace(/\s+/g, '-')           // Replace spaces with -
			.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
			.replace(/\-\-+/g, '-')         // Replace multiple - with single -
			.replace(/^-+/, '')             // Trim - from start of text
			.replace(/-+$/, '');            // Trim - from end of text
	}

	static getFirstErrorMessage(wr: WebResponse): string {
		if (wr != null && wr.data != null && wr.data['errors'] != null && wr.data['errors'].length > 0) {
			return wr.data['errors'][0][1];
		}

		return null;
	}

}