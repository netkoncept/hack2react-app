import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";


const configJson = require('../../config/config.json');
const HttpPostHeaders = {
    headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
};

@Injectable({
    providedIn: 'root'
})

export class ConfigurationService {
    configuration: any = configJson;

    constructor(
        private http: HttpClient,
    ) {
    }

    setNotificationStatus(status: boolean) {
        const payload = new HttpParams()
            .set('notifications', status.toString());

        return this.http.post(
            this.getApiUrl() + '/rest/config',
            payload.toString(),
            HttpPostHeaders
        )
    }

    getDevice(): Observable<any> {
        return this.http.get(`${this.getApiUrl()}/api/device`).pipe(
            map((data) => {
                return data;
            })
        );
    }

    getApiUrl(): string {
        return this.getConfigItem('appUrl');
    }

    getConfigItem(name: any): any {
        if (typeof this.configuration[name] !== 'undefined') {
            return this.configuration[name]
        } else {
            return '0';
        }
    }
}
