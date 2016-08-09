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
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map