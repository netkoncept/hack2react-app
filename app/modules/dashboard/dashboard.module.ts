import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from '@nativescript/angular';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard.component";
import {NativeScriptSvgModule} from "@sergeymell/nativescript-svg/angular";

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptSvgModule,
        DashboardRoutingModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class DashboardModule {
}
