"use strict";
var core_1 = require('@angular/core');
var TimestampFormat = (function () {
    function TimestampFormat() {
    }
    TimestampFormat.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (value) {
            var date = value instanceof Date ? value : new Date(value * 1000);
            var formatted = this.strPad("00", "" + (date.getMonth() + 1), true) + '/' + this.strPad("00", "" + date.getDate(), true) + '/' + date.getFullYear() + ' - ' + this.strPad("00", "" + date.getHours(), true) + ':' + this.strPad("00", "" + date.getMinutes(), true) + ':' + this.strPad("00", "" + date.getSeconds(), true);
            return formatted;
        }
    };
    TimestampFormat.prototype.strPad = function (pad, str, padLeft) {
        if (typeof str === 'undefined') {
            return pad;
        }
        if (padLeft) {
            return (pad + str).slice(-pad.length);
        }
        else {
            return (str + pad).substring(0, pad.length);
        }
    };
    TimestampFormat.decorators = [
        { type: core_1.Pipe, args: [{
                    name: 'timestampFormat'
                },] },
    ];
    /** @nocollapse */
    TimestampFormat.ctorParameters = [];
    return TimestampFormat;
}());
exports.TimestampFormat = TimestampFormat;
//# sourceMappingURL=timestampFormat.js.map