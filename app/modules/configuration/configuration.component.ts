import { Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuModel} from "~/shared/models/menu.model";
import {Subscription} from "rxjs";
import {MenuService} from "~/shared/services/menu.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConfigurationComponent implements OnInit, OnDestroy {

    menuItem: MenuModel;
  private menuData: Array<MenuModel>;
  private subscription: Subscription = new Subscription();
  constructor(
        private menuService: MenuService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.menuData = this.menuService.getMenu();

    this.subscription.add(
      this.activatedRoute.params.subscribe((params) => {
        this.menuItem = this.menuData.filter(item => item.id == params['menuId'])[0];
      })
    );

  }

  ngOnDestroy(): void {

  }
}
