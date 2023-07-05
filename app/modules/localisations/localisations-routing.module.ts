import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {NativeScriptRouterModule} from '@nativescript/angular';
import {LocalisationsComponent} from "./localisations.component";

const routes: Routes = [
    {path: ':menuId', component: LocalisationsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class LocalisationsRoutingModule {
}
