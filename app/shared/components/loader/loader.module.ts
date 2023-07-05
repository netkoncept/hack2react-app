import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { LoaderComponent } from './loader.component';



@NgModule({
    declarations: [LoaderComponent],
    imports: [
        NativeScriptCommonModule
    ],
    exports: [
        LoaderComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class LoaderModule { }
