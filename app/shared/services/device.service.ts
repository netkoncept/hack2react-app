import {Injectable} from '@angular/core';
import {Device, isIOS} from "@nativescript/core";
import {getUUID} from 'nk-owen-it-nativescript-uuid';

@Injectable({
    providedIn: 'root'
})

export class DeviceService {

    constructor() {
    }

    getModel(): string {
        if (typeof Device.model === 'undefined') {
            return 'browser';
        }
        return Device.model;
    }

    getPlatform(): string {
        if (typeof Device.os === 'undefined') {
            return 'PC';
        }

        return Device.os;
    }

    getDeviceUuid(): string {
        if (typeof Device.uuid === 'undefined') {
            return null;
        }

        if(typeof Device.os !== 'undefined' && Device.os === 'iOS') {
            const uuid = getUUID();
            return uuid;
        }

        return Device.uuid;
    }

    getDeviceVersion(): string {
        if (typeof Device.osVersion === 'undefined') {
            return null;
        }
        return Device.osVersion;
    }

    getDeviceSdkVersion(): string {
        if (typeof Device.sdkVersion === 'undefined') {
            return 'browser';
        }
        return Device.sdkVersion;
    }

    getLanguage(): string {
        if (typeof Device.language === 'undefined') {
            return 'pl';
        } else{
            const lang = Device.language.split('-')[0];
            switch(lang){
                case 'cs':
                    return 'cz';
                default:
                    return lang;
            }
        }
    }
}
