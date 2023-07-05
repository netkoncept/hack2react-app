import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from "../../services/loader.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
    isLoading: boolean = true;
    private subscription: Subscription = new Subscription();

    constructor(
        public loaderService: LoaderService,
        private cd: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.subscription.add(
            this.loaderService.isLoading.subscribe((data) => {
                this.isLoading = data;
                this.cd.detectChanges();
            })
        )
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
