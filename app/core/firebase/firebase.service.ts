import {Injectable, NgZone} from '@angular/core';
import {ApplicationSettings, Dialogs} from '@nativescript/core';
import {firebase} from '@nativescript/firebase-core';
import '@nativescript/firebase-messaging';
import {RemoteMessage} from "@nativescript/firebase-messaging";
import {RouterExtensions} from "@nativescript/angular";
import {ConfigurationService} from "~/shared/services/configuration.service";

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    constructor(
        private routerExtensions: RouterExtensions,
        private configurationService: ConfigurationService,
        private ngZone: NgZone) {
    }

    init(): Promise<any> {

        return new Promise((resolve, reject) => {
            const messaging = firebase().messaging();
            messaging.onToken((token) => {
                ApplicationSettings.setString('pushToken', token);
                this.configurationService.getDevice().subscribe((data) => {
                })
                console.log('Firebase Service onToken: ', token);
            });

            messaging.onMessage((message) => {
                console.log('Firebase Service onMessage')
                this.showAlertDialog('Firebase onMessage', message);
            });

            messaging.onNotificationTap((message) => {
                console.log('Firebase Service onNotificationTap: ');
                this.redirectToView(message, 1000);
            });

            messaging
                .getToken()
                .then((token: string) => {
                    ApplicationSettings.setString('pushToken', token);
                    console.log('Firebase Service getToken: ', token);
                    this.configurationService.getDevice().subscribe((data) => {
                    })
                })
                .catch((e) => {
                    console.log('Firebase Service getToken ERROR: ', e);
                });
            resolve(null);
        });
    }

    /**
     *
     * @param text
     * @param message
     */
    showAlertDialog(text: string, message: RemoteMessage | any = {}): void {
        this.ngZone.run(() => {
            Dialogs.confirm({
                title: message?.data['title'],
                message: message?.data['body'],
                okButtonText: 'Zobacz',
                cancelButtonText: 'Pomiń'
            }).then(result => {
                if (result === true) {
                    this.redirectToView(message);
                }
            });
        });
    }

    /**
     *
     * @param message
     * @param timeout
     */
    redirectToView(message: RemoteMessage | any = {}, timeout: number = 0): void {
        this.ngZone.run(() => {
            setTimeout(() => {
                let linkData = message.data;
                this.goToNotification(linkData);
            }, timeout)
        })
    }

    goToNotification(linkData) {
        console.log(linkData);
        this.routerExtensions.navigate(['alerts', 2, linkData.alert_id]);
    }

}
