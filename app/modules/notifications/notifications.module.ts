import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from '@nativescript/angular';
import {NotificationsRoutingModule} from "./notifications-routing.module";
import {NotificationsComponent} from "./notifications.component";
import {ActionBarModule} from "../../shared/components/action-bar/action-bar.module";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";

@NgModule({
    declarations: [NotificationsComponent],
    imports: [
        NativeScriptCommonModule,
        NotificationsRoutingModule,
        ActionBarModule,
        NativeScriptUIListViewModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class NotificationsModule {
}
