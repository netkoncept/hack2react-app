import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core'
import {NativeScriptHttpClientModule, NativeScriptModule} from '@nativescript/angular'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {DashboardModule} from "@module/dashboard/dashboard.module";
import {NativeScriptSvgModule} from "@sergeymell/nativescript-svg/angular";
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";
import {LoaderModule} from "~/shared/components/loader/loader.module";
import {FirebaseModule} from "@core/firebase/firebase.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpHeaderInterceptor} from "@core/interceptors/http-header.interceptor";
import {HttpLoaderInterceptor} from "@core/interceptors/http-loader.interceptor";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        DashboardModule,
        NativeScriptHttpClientModule,
        NativeScriptSvgModule,
        NativeScriptUISideDrawerModule,
        LoaderModule,
        FirebaseModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpHeaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoaderInterceptor,
            multi: true
        },
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
}
