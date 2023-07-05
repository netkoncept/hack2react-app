import {Injectable} from '@angular/core';
import {HelperService} from "../../../shared/services/helper.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConfigurationService} from "../../../shared/services/configuration.service";
import {AlertModel, AlertResponseModel} from "../models/alert.model";


@Injectable({
    providedIn: 'root'
})
export class AlertsService {

    showModalSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    showModalSubject$: Observable<boolean> = this.showModalSubject.asObservable();
    mapContainerHeightSubject: BehaviorSubject<number> = new BehaviorSubject(0);
    mapContainerHeightSubject$: Observable<number> = this.mapContainerHeightSubject.asObservable();
    alertsList: Array<AlertModel> = [];
    constructor(
        private helperService: HelperService,
        private configurationService: ConfigurationService,
        private http: HttpClient,
    ) {
    }

    getAlerts(): Observable<Array<AlertModel>> {
        return this.http.get(`${this.configurationService.getApiUrl()}/api/alerts`).pipe(
            map((data:AlertResponseModel) => {
                this.alertsList = data.alerts;
                return data.alerts;
            })
        );
    }
}
