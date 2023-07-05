import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from '@nativescript/angular';
import {LocalisationsRoutingModule} from "./localisations-routing.module";
import {LocalisationsComponent} from "./localisations.component";
import {ActionBarModule} from "~/shared/components/action-bar/action-bar.module";

@NgModule({
    declarations: [LocalisationsComponent],
  imports: [
    NativeScriptCommonModule,
    LocalisationsRoutingModule,
    ActionBarModule,
  ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class LocalisationsModule {
}
