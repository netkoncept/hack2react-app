import { Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuService} from "../../shared/services/menu.service";
import {MenuModel} from "../../shared/models/menu.model";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {NotificationsService} from "./services/notifications.service";
import {ObservableArray} from "@nativescript/core";
import {RouterExtensions} from "@nativescript/angular";
import {AlertModel} from "../alerts/models/alert.model";

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NotificationsComponent implements OnInit, OnDestroy {

    menuItem: MenuModel;
    notifications: ObservableArray<AlertModel>;
    isResults: boolean = false;
    private menuData: Array<MenuModel>;
    private subscription: Subscription = new Subscription();
    constructor(
        private menuService: MenuService,
        private activatedRoute: ActivatedRoute,
        private notificationsService: NotificationsService,
        private routerExtensions: RouterExtensions,
    ) {
    }

    ngOnInit() {
        this.menuData = this.menuService.getMenu();

        this.subscription.add(
            this.activatedRoute.params.subscribe((params) => {
                this.menuItem = this.menuData.filter(item => item.id == params['menuId'])[0];
            })
        );

        this.initNotifications()
    }

    initNotifications() {
        this.notificationsService.paginationPage.next(1);
        this.notificationsService.getNotifications().subscribe({
            next: (data) => {
                this.notifications = new ObservableArray<AlertModel>(data)
                if (this.notifications.length > 0) {
                    this.isResults = true;
                }
            },
            error: (error) => {
                console.log(error)
            }
        })
    }

    onLoadMoreItemsRequested() {
        if (this.isResults) {
            this.notificationsService.paginationPage.next(this.notificationsService.paginationPage.getValue() + 1);

            this.notificationsService.getNotifications().subscribe({
                next: (data) => {
                    data.forEach((notification) => {
                        this.notifications.push(notification);
                    });
                },
                error: (error) => {
                    console.log(error)
                }
            });
        }
    }

    goToPage(id) {
        this.routerExtensions.navigate(['alerts', 2, id]);
    }

    ngOnDestroy(): void {

    }
}
