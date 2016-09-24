"use strict";
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
            .then(function (response) {
            var wr = response.json();
            wr.data['options'] = wr.data['options'];
            return wr;
        })
            .catch(this.handleError);
    };
    TaskService.prototype.view = function (projectId, taskId) {
        return this.http.get('/api/task/view?project=' + projectId + '&task=' + taskId)
            .toPromise()
            .then(function (response) {
            var wr = response.json();
            wr.data['project'] = wr.data['project'];
            wr.data['task'] = wr.data['task'];
            return wr;
        })
            .catch(this.handleError);
    };
    TaskService.prototype.run = function (formData) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this.http.post('/api/task/run', formData, { headers: headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    TaskService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    TaskService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    TaskService.ctorParameters = [
        { type: http_1.Http, },
    ];
    return TaskService;
}());
exports.TaskService = TaskService;
//# sourceMappingURL=TaskService.js.map