export class Utils {

	static formValuesEncoded(formValues:any) {
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

}