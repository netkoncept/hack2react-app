import { Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuModel} from "~/shared/models/menu.model";
import {Subscription} from "rxjs";
import {MenuService} from "~/shared/services/menu.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-localisations',
    templateUrl: './localisations.component.html',
    styleUrls: ['./localisations.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LocalisationsComponent implements OnInit, OnDestroy {

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
