"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var JobService = (function () {
    function JobService(http) {
        this.http = http;
    }
    JobService.prototype.getRunningList = function () {
        return this.http.get('/api/job/runningList')
            .toPromise()
            .then(function (response) {
            var wr = response.json();
            wr.data['jobs'] = wr.data['jobs'];
            wr.data['count'] = wr.data['count'];
            return wr;
        })
            .catch(this.handleError);
    };
    JobService.prototype.last = function (projectId, taskId) {
        return this.http.get('/api/job/last?project=' + projectId + '&task=' + taskId)
            .toPromise()
            .then(function (response) {
            var wr = response.json();
            wr.data['job'] = wr.data['job'];
            return wr;
        })
            .catch(this.handleError);
    };
    JobService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    JobService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    JobService.ctorParameters = [
        { type: http_1.Http, },
    ];
    return JobService;
}());
exports.JobService = JobService;
//# sourceMappingURL=JobService.js.map