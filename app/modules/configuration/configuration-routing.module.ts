import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {NativeScriptRouterModule} from '@nativescript/angular';
import {ConfigurationComponent} from "./configuration.component";

const routes: Routes = [
    {path: ':menuId', component: ConfigurationComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ConfigurationRoutingModule {
}
