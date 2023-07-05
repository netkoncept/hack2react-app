import { Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {IconService} from "../../shared/services/icon.service";
import {MenuModel} from "~/shared/models/menu.model";
import {MenuService} from "~/shared/services/menu.service";
import {Application} from "@nativescript/core";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
    menuData;

    private subscription: Subscription = new Subscription();

    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public iconService: IconService,
        private menuService: MenuService,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        }
    }

    ngOnInit() {
        this.menuData = this.menuService.getMenu();
    }

    goToPage(menu: Partial<MenuModel>) {
        const {link, id} = menu;
        const sideDrawer = <any>Application.getRootView();
        sideDrawer.closeDrawer();
        this.menuService.goToPage({link, id});
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
