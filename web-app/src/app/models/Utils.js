"use strict";
var Utils = (function () {
    function Utils() {
    }
    Utils.formValuesEncoded = function (formValues) {
        var formData = '';
        if (formValues != null) {
            for (var formKey in formValues) {
                var formValue = formValues[formKey];
                if (formData == '') {
                    formData += formKey + "=" + formValue;
                }
                else {
                    formData += "&" + formKey + "=" + formValue;
                }
            }
        }
        return formData;
    };
    Utils.slugify = function (text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    };
    Utils.getFirstErrorMessage = function (wr) {
        if (wr != null && wr.data != null && wr.data['errors'] != null && wr.data['errors'].length > 0) {
            return wr.data['errors'][0][1];
        }
        return null;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map