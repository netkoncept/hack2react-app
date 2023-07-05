import {Component, OnInit} from '@angular/core'
import {DrawerTransitionBase, SlideInOnTopTransition} from "nativescript-ui-sidedrawer";
import {filter, Subscription} from "rxjs";
import {MenuService} from "~/shared/services/menu.service";
import {MenuModel} from "~/shared/models/menu.model";
import {HelperService} from "~/shared/services/helper.service";
import {Application, isAndroid} from '@nativescript/core';
import {IconService} from "~/shared/services/icon.service";
import {NavigationEnd, Router} from "@angular/router";
import {ConfigurationService} from "~/shared/services/configuration.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    menuData: Array<MenuModel>;
    activeMenuItem: Number;
    menuPaddingTop: number = 10;
    private subscription: Subscription = new Subscription();
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private helperService: HelperService,
        private menuService: MenuService,
        public iconService: IconService,
        private router: Router,
        private configurationService: ConfigurationService,
    ) {
    }

    ngOnInit() {
        if (isAndroid) {
            if (this.helperService.getStatusBarHeight() > 100) {
                this.menuPaddingTop = 50;
            } else {
                this.menuPaddingTop = 20;
            }
        }

        this.helperService.setAppearance();

        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.menuData = this.menuService.getMenu();

        this.subscription.add(
            this.menuService.activatedMenuItem.subscribe((data) => {
                    this.activeMenuItem = data;
                },
                (error) => {
                    console.log('Activated menu item error: ', error);
                }),
        );

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                let url = event.urlAfterRedirects;

                //usuwa queryParams
                url = url.split('?')[0];

                //wyciąga id
                let urlArray = url.split('/');
                if (urlArray.length > 2) {
                    this.activeMenuItem = parseInt(urlArray[2]);
                } else {
                    this.activeMenuItem = 0;
                }
            });
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    public goToPage(menu: Partial<MenuModel>) {
        const {link, id} = menu;
        const sideDrawer = <any>Application.getRootView();
        sideDrawer.closeDrawer();

        this.menuService.goToPage({link, id});
    }
}
