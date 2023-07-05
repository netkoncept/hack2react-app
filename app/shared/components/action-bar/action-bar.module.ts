import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from '@nativescript/angular';
import {ActionBarComponent} from "./action-bar.component";
import {CommonModule} from "@angular/common";
import {NativeScriptSvgModule} from "@sergeymell/nativescript-svg/angular";
@NgModule({
    declarations: [
        ActionBarComponent
    ],
    imports: [
        NativeScriptCommonModule,
        CommonModule,
        NativeScriptSvgModule,
    ],
    exports: [
        ActionBarComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ActionBarModule {
}
