"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var TimestampFormat = (function () {
    function TimestampFormat() {
    }
    TimestampFormat.prototype.transform = function (value, args) {
        if (value) {
            var date = value instanceof Date ? value : new Date(value * 1000);
            var formatted = this.strPad("00", (date.getMonth() + 1), true) + '/' + this.strPad("00", date.getDate(), true) + '/' + date.getFullYear() + ' - ' + this.strPad("00", date.getHours(), true) + ':' + this.strPad("00", date.getMinutes(), true) + ':' + this.strPad("00", date.getSeconds(), true);
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
    TimestampFormat = __decorate([
        core_1.Pipe({
            name: 'timestampFormat'
        }), 
        __metadata('design:paramtypes', [])
    ], TimestampFormat);
    return TimestampFormat;
}());
exports.TimestampFormat = TimestampFormat;
//# sourceMappingURL=timestampFormat.js.map