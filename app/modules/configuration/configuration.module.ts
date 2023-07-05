import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from '@nativescript/angular';
import {ConfigurationRoutingModule} from "./configuration-routing.module";
import {ConfigurationComponent} from "./configuration.component";
import {ActionBarModule} from "../../shared/components/action-bar/action-bar.module";

@NgModule({
    declarations: [ConfigurationComponent],
    imports: [
        NativeScriptCommonModule,
        ConfigurationRoutingModule,
        ActionBarModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ConfigurationModule {
}
