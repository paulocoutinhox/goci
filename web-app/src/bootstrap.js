"use strict";
var platform_browser_1 = require('@angular/platform-browser');
var app_module_ngfactory_1 = require("../ngfactory/src/app/modules/app.module.ngfactory");
var core_1 = require("@angular/core");
if (process.env.ENV === 'production') {
    core_1.enableProdMode();
}
platform_browser_1.platformBrowser().bootstrapModuleFactory(app_module_ngfactory_1.AppModuleNgFactory);
//# sourceMappingURL=bootstrap.js.map