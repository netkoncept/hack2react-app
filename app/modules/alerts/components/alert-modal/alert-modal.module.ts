import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from '@nativescript/angular';
import {CommonModule} from "@angular/common";
import {AlertModalComponent} from "./alert-modal.component";
import {NativeScriptSvgModule} from "@sergeymell/nativescript-svg/angular";

@NgModule({
    declarations: [AlertModalComponent],
    imports: [
        NativeScriptCommonModule,
        CommonModule,
        NativeScriptSvgModule
    ],
    exports: [
        AlertModalComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AlertModalModule {
}
