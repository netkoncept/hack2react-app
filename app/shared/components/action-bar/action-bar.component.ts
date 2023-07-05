import {
    AfterViewInit,
    Component,
    Input,
    OnDestroy,
    OnInit
} from "@angular/core";
import {Application, isAndroid} from "@nativescript/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {RouterExtensions} from "@nativescript/angular";
import {MenuModel} from "../../models/menu.model";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import {IconService} from "../../services/icon.service";
import {HelperService} from "../../services/helper.service";
import {MenuService} from "../../services/menu.service";


@Component({
    selector: 'app-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss']
})

export class ActionBarComponent implements OnInit, OnDestroy, AfterViewInit {
    public subscription: Subscription = new Subscription();
    public menuId: number;
    public menuData: Array<MenuModel>;
    public actionBarPaddingTop: number = 10;

    @Input() title: string;


    constructor(
        public helperService: HelperService,
        public iconService: IconService,
        private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private menuService: MenuService
    ) {
    }

    ngOnInit() {
        if(isAndroid) {
            if (this.helperService.getStatusBarHeight() > 100) {
                this.actionBarPaddingTop = 60;
            } else {
                this.actionBarPaddingTop = 30;
            }
        }

        this.menuData = this.menuService.getMenu();

        this.subscription.add(
            this.activatedRoute.params.subscribe((params) => {
                this.menuId = params['menuId'];
            })
        );
    }

    ngAfterViewInit() {

    }

    goBack(): void {
        this.routerExtensions.back();
    }

    showMenu(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
