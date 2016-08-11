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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
    }
    TaskService.prototype.options = function (projectId, taskId) {
        return this.http.get('/api/task/options?project=' + projectId + '&task=' + taskId)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TaskService.prototype.view = function (projectId, taskId) {
        return this.http.get('/api/task/view?project=' + projectId + '&task=' + taskId)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TaskService.prototype.run = function (projectId, taskId, options) {
        console.log(options);
        var headers = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this.http.post('/api/task/run', options, { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TaskService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    TaskService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
//# sourceMappingURL=TaskService.js.map