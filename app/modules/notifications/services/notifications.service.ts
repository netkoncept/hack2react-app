import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConfigurationService} from "../../../shared/services/configuration.service";
import {map} from "rxjs";
import {NotificationsDataModel} from "../models/notifications.model";
import {AlertModel} from "../../alerts/models/alert.model";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    // Dla 0 i 1 zwraca te same wyniki, dlatego musi być 1 żeby przy doczytywaniu nie duplikować powiadomień
    public paginationPage = new BehaviorSubject<number>(1);

    constructor(
        private http: HttpClient,
        public configurationService: ConfigurationService
    ) {
    }

    getNotifications(): Observable<Array<AlertModel>> {
        return this.http.get(`${this.configurationService.getApiUrl()}/api/notifications`).pipe(
            map((data: NotificationsDataModel) => {
                return data.alerts;
            })
        );
    }
}
