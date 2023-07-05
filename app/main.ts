import {NativeScriptNgZone, platformNativeScript, runNativeScriptAngularApp} from '@nativescript/angular';

import {AppModule} from './app.module';
import {firebase} from "@nativescript/firebase-core";
import {init} from "@nativescript/background-http";
import {ApplicationSettings, isIOS} from "@nativescript/core";

init();
firebase()
    .initializeApp()
    .then((done) => {
        console.log('Firebase MAIN initializeApp: ', `DONE`);
    });

const messaging = firebase().messaging();

messaging
    .requestPermission()
    .then((requestPermission) => {
        console.log('Firebase MAIN requestPermission: ', 'DONE')
        messaging.showNotificationsWhenInForeground = true;
        messaging.registerDeviceForRemoteMessages().catch((e) => {
            console.log('Firebase MAIN registerDeviceForRemoteMessages', 'DONE');
        }).then(() => {
            messaging.subscribeToTopic("all")
                .then(() => {
                    console.log('Firebase MAIN subscribeToTopic: ', 'DONE');
                    if (isIOS) {
                        messaging.getToken()
                            .then((token: string) => {
                                ApplicationSettings.setString('pushToken', token);
                                console.log('Firebase MAIN getToken: ', token);
                            })
                            .catch((e) => {
                                console.log('Firebase MAIN getToken: ', e);
                            });
                    }
                });
        });
    })
    .catch((e) => {
        console.log('Firebase requestPermission ERROR: ', e)
    });

runNativeScriptAngularApp({
    appModuleBootstrap: () =>
        platformNativeScript().bootstrapModule(AppModule, {
            ngZone: new NativeScriptNgZone(), // <-- new option
        }),
});

