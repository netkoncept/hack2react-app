import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {FormattedString} from "@nativescript/core/ui/text-base/formatted-string";
import {Span} from "@nativescript/core/ui/text-base/span";
import {FontWeight} from '@nativescript/core/ui/styling/font';
import {Color, isAndroid, Device, Application, Utils, ApplicationSettings, isIOS} from "@nativescript/core";
import {RouterExtensions} from "@nativescript/angular";

export interface InfoHandler {
    show?: boolean,
    color?: string,
    text?: string
    delay?: number
}

@Injectable({
    providedIn: 'root'
})

export class HelperService {
    appMode: boolean = false;
    modeIconColor: string = '#000';

    private chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    constructor(
    ) {}


    setAppearance() {
        this.appMode = (Application.systemAppearance() === 'dark');
        this.modeIconColor = this.appMode ? '#fff' : '#000';
    }

  getStatusBarHeight() {
    let androidStatusBarHeight = 0;
    if (isAndroid) {
      const resourceId = Utils.ad.getApplicationContext().getResources().getIdentifier('status_bar_height', 'dimen', 'android');
      if (resourceId > 0) {
        androidStatusBarHeight = Utils.ad.getApplicationContext().getResources().getDimensionPixelSize(resourceId);
      }
    }

    return androidStatusBarHeight;
  }

    encodeBase64(input) {
        let str = String(input);
        for (
            var block, charCode, idx = 0, map = this.chars, output = '';
            str.charAt(idx | 0) || (map = '=', idx % 1);
            output += map.charAt(63 & block >> 8 - idx % 1 * 8)
        ) {
            charCode = str.charCodeAt(idx += 3 / 4);
            if (charCode > 0xFF) {
                console.log("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            }
            block = block << 8 | charCode;
        }
        return output;
    }

    decodeBase64(input) {
        let str = String(input).replace(/=+$/, '');

        if (str.length % 4 === 1) {
            console.log("'atob' failed: The string to be decoded is not correctly encoded.");
        }

        for (
            var bc = 0, bs, buffer, idx = 0, output = '';
            buffer = str.charAt(idx++);
            ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
            buffer = this.chars.indexOf(buffer);
        }
        return output;
    }

}
