"use strict";
var core_1 = require("@angular/core");
var GlobalService_1 = require("../services/GlobalService");
var AppHeaderComponent = (function () {
    function AppHeaderComponent(globalService) {
        var _this = this;
        this.globalService = globalService;
        this.jobs = 0;
        globalService.jobsCountEmitter.subscribe(function (count) {
            _this.jobs = count;
        });
    }
    AppHeaderComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-header',
                    templateUrl: 'app-header.component.html',
                    styleUrls: ['app-header.component.css']
                },] },
    ];
    /** @nocollapse */
    AppHeaderComponent.ctorParameters = [
        { type: GlobalService_1.GlobalService, },
    ];
    return AppHeaderComponent;
}());
exports.AppHeaderComponent = AppHeaderComponent;
//# sourceMappingURL=app-header.component.js.map