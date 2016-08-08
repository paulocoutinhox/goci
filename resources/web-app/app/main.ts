import {bootstrap} from "@angular/platform-browser-dynamic";
//import {enableProdMode} from '@angular/core';

import {AppMainComponent} from "./app-main/app-main.component";
import {appRouterProviders} from "./app-routes/app.routes";
import {HTTP_PROVIDERS} from "@angular/http";
import {GlobalService} from "./services/GlobalService";
import {JobService} from "./services/JobService";

//enableProdMode();
bootstrap(AppMainComponent, [
	appRouterProviders,
	HTTP_PROVIDERS,
	GlobalService,
	JobService
]);