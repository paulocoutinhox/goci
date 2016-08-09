"use strict";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var forms_1 = require('@angular/forms');
//import {enableProdMode} from '@angular/core';
var app_main_component_1 = require("./app-main/app-main.component");
var app_routes_1 = require("./app-routes/app.routes");
var http_1 = require("@angular/http");
var GlobalService_1 = require("./services/GlobalService");
var JobService_1 = require("./services/JobService");
//enableProdMode();
platform_browser_dynamic_1.bootstrap(app_main_component_1.AppMainComponent, [
    app_routes_1.appRouterProviders,
    http_1.HTTP_PROVIDERS,
    GlobalService_1.GlobalService,
    JobService_1.JobService,
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms()
]);
//# sourceMappingURL=main.js.map