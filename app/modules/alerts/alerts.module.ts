import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from '@nativescript/angular';
import {AlertsRoutingModule} from "./alerts-routing.module";
import {AlertsComponent} from "./alerts.component";
import {ActionBarModule} from "../../shared/components/action-bar/action-bar.module";
import {NativeScriptSvgModule} from "@sergeymell/nativescript-svg/angular";
import {AlertModalModule} from "./components/alert-modal/alert-modal.module";

@NgModule({
    declarations: [AlertsComponent],
    imports: [
        NativeScriptCommonModule,
        AlertsRoutingModule,
        ActionBarModule,
        NativeScriptSvgModule,
        AlertModalModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AlertsModule {
}
