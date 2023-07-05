import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {NativeScriptRouterModule} from '@nativescript/angular';
import {AlertsComponent} from "./alerts.component";

const routes: Routes = [
    {path: ':menuId', component: AlertsComponent},
    {path: ':menuId/:alertId', component: AlertsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AlertsRoutingModule {
}
