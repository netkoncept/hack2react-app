import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoaderService {
    activeRequests: BehaviorSubject<number>;
    isLoading: Observable<boolean>;
    interval = null

    constructor() {
        this.activeRequests = new BehaviorSubject(0);
        this.isLoading = this.activeRequests.pipe(
            map(requests => requests > 0)
        );
    }

    public onRequestStart(manualStop: boolean = false) {
        setTimeout(() => this.activeRequests.next(this.activeRequests.value + 1), 10);
        this.emergencyShutDownLoader(manualStop);
    }

    public onRequestEnd(manualStop: boolean = false) {
        setTimeout(() => this.activeRequests.next(this.activeRequests.value - 1), 10);
        if (manualStop) {
            this.activeRequests.next(0);
        }
    }

    public emergencyShutDownLoader(manualStop) {
        if (manualStop) {
            this.activeRequests.next(0);
        } else {
            let timer:number = 10;

            if(this.interval !== null) {
                clearInterval(this.interval);
            }
            this.interval = setInterval(() => {
                timer = timer - 1;
                if(timer === 0) {
                    this.activeRequests.next(0);
                    clearInterval(this.interval);
                }
            }, 1000)
        }

    }
}
