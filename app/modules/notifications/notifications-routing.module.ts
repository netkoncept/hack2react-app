import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {NativeScriptRouterModule} from '@nativescript/angular';
import {NotificationsComponent} from "./notifications.component";

const routes: Routes = [
    {path: ':menuId', component: NotificationsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class NotificationsRoutingModule {
}
