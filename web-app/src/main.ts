import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {AppModuleNgFactory} from "../ngfactory/src/app/modules/app.module.ngfactory";

if (process.env.ENV === 'production') {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);