import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DeviceService} from "~/shared/services/device.service";
import {ConfigurationService} from "~/shared/services/configuration.service";
import {ApplicationSettings} from "@nativescript/core";

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

    constructor(
        private deviceService: DeviceService,
        private configurationService: ConfigurationService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newHeaders: HttpHeaders = req.headers;
        let uuid = this.deviceService.getDeviceUuid();
        let platform = this.deviceService.getPlatform();
        let model = this.deviceService.getModel();
        let version = this.deviceService.getDeviceVersion();
        let apiKey = this.configurationService.getConfigItem('apiKey');
        let forceLocalization = this.configurationService.getConfigItem('can_force_localization');
        let citizen = this.configurationService.getConfigItem('citizen');
        let tourist = this.configurationService.getConfigItem('tourist');
        let apiPush = ApplicationSettings.getString('pushToken');

        newHeaders = newHeaders.append('x-api-key', apiKey);
        newHeaders = newHeaders.append('x-api-device', uuid);
        newHeaders = newHeaders.append('x-api-type', platform);
        newHeaders = newHeaders.append('x-api-model', model);
        newHeaders = newHeaders.append('x-api-version', version);
        newHeaders = newHeaders.append('x-api-push', (typeof apiPush !== 'undefined') ? apiPush : '');
        newHeaders = newHeaders.append('x-api-can-force-localization', (typeof forceLocalization !== 'undefined') ? forceLocalization : '0');
        newHeaders = newHeaders.append('x-api-citizen', (typeof citizen !== 'undefined') ? citizen : '0');
        newHeaders = newHeaders.append('x-api-tourist', (typeof tourist !== 'undefined') ? tourist : '0');
        const reqWithNewHeaders = req.clone({headers: newHeaders});

        return next.handle(reqWithNewHeaders);
    }
}
