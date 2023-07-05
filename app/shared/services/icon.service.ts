import {Injectable} from '@angular/core';
import {HelperService} from "./helper.service";

@Injectable({
    providedIn: 'root'
})
export class IconService {

    constructor(
        private helperService: HelperService,
    ) {
    }

    getBaseIcon(icon, color = '#000') {
        let iconJson = require('../../assets/json/icon.json');
        let svgIcon = '<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="' + color + '">' + iconJson[icon] + '</svg>';
        return "data:image/svg+xml;base64," + this.helperService.encodeBase64(unescape(encodeURIComponent(svgIcon)));
    }

    getSvgIcon(svgIcon) {
        return "data:image/svg+xml;base64," + this.helperService.encodeBase64(unescape(encodeURIComponent(svgIcon)));
    }
}
