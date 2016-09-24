"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var ProjectService = (function () {
    function ProjectService(http) {
        this.http = http;
    }
    ProjectService.prototype.list = function () {
        return this.http.get('/api/project/list')
            .toPromise()
            .then(function (response) {
            var wr = response.json();
            wr.data['list'] = wr.data['list'];
            return wr;
        })
            .catch(this.handleError);
    };
    ProjectService.prototype.view = function (projectId) {
        return this.http.get('/api/project/view?project=' + projectId)
            .toPromise()
            .then(function (response) {
            var wr = response.json();
            wr.data['project'] = wr.data['project'];
            return wr;
        })
            .catch(this.handleError);
    };
    ProjectService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    ProjectService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ProjectService.ctorParameters = [
        { type: http_1.Http, },
    ];
    return ProjectService;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=ProjectService.js.map