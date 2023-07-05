import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {RouterExtensions} from "@nativescript/angular";
import {MenuModel} from "~/shared/models/menu.model";

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  activatedMenuItem = new Subject<any>();

  menuData: MenuModel[];

  constructor(
    private routerExtensions: RouterExtensions,
  ) {

  }

  getMenu() {
    this.menuData = [
      {
        "id": 1,
        "name": "Powiadomienia",
        "icon": "notifications",
        "link": "notifications",
      },
      {
        "id": 2,
        "name": "Alerty",
        "icon": "warning",
        "link": "alerts",
      },
      {
        "id": 3,
        "name": "Lista lokalizacji",
        "icon": "list",
        "link": "localisations",
      },
      {
        "id": 4,
        "name": "Konfiguracja",
        "icon": "settings",
        "link": "configuration",
      },
    ]
    return this.menuData;
  }

  goToPage(linkData: any) {
    if (typeof linkData.id !== 'undefined' && linkData.id !== null) {
        //view in menu
        this.routerExtensions.navigate([linkData.link, linkData.id]);
    } else {
      this.routerExtensions.navigate([linkData.link]);
    }
  }
}
