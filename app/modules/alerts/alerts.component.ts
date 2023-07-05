import {
    AfterViewInit,
    Component,
    ElementRef,
    NgZone,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MenuModel} from "../../shared/models/menu.model";
import {from, Subscription} from "rxjs";
import {MenuService} from "../../shared/services/menu.service";
import {ActivatedRoute} from "@angular/router";
import {IconService} from "../../shared/services/icon.service";
import {HelperService} from "../../shared/services/helper.service";
import {AlertsService} from "./services/alerts.service";
import {MapboxMarker, MapboxView, MapboxViewApi} from "@nativescript-community/ui-mapbox";
import {ConfigurationService} from "../../shared/services/configuration.service";
import {LoaderService} from "../../shared/services/loader.service";
import {AbsoluteLayout, Application, Dialogs, Enums} from "@nativescript/core";
import * as geolocation from "@nativescript/geolocation";
import * as perms from "nativescript-perms";
import {AlertModel} from "./models/alert.model";

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AlertsComponent implements OnInit, AfterViewInit, OnDestroy {

    menuItem: MenuModel;
    mapboxApiKey: string;
    modalType: string = '';
    alertData: any;
    absoluteHeight: number = 0;
    showAlert: number;
    private menuData: Array<MenuModel>;
    private subscription: Subscription = new Subscription();
    private mapAbsoluteLayout: AbsoluteLayout;
    private userMarker: MapboxMarker;
    private map: MapboxViewApi;
    private mapConfig;

    @ViewChild('mapAbsoluteLayout', {static: false}) public mapAbsoluteLayoutRef: ElementRef;
    @ViewChild('mapContainer', {static: false}) public mapContainerRef: ElementRef;

    constructor(
        public iconService: IconService,
        public helperService: HelperService,
        public alertsService: AlertsService,
        private menuService: MenuService,
        private configurationService: ConfigurationService,
        private loaderService: LoaderService,
        private activatedRoute: ActivatedRoute,
        private ngZone: NgZone,
    ) {
    }

    ngOnInit() {
        this.menuData = this.menuService.getMenu();
        this.mapboxApiKey = this.configurationService.getConfigItem('mapbox_api_key');

        this.subscription.add(
            this.activatedRoute.params.subscribe((params) => {
                this.menuItem = this.menuData.filter(item => item.id == params['menuId'])[0];
                if (params['alertId']) {
                    this.showAlert = params['alertId'];
                }
            })
        );

        if (this.map) {
            this.map.onResume().then();
        }
    }

    ngAfterViewInit() {
        this.mapAbsoluteLayout = this.mapAbsoluteLayoutRef.nativeElement;
        setTimeout(() => {
            this.absoluteHeight = this.mapAbsoluteLayout.getActualSize().height;
        }, 100)

        this.initMap();

        Application.on('orientationChanged', () =>{
            setTimeout(() => {
                this.alertsService.mapContainerHeightSubject.next(this.mapContainerRef.nativeElement.getActualSize().height);
            }, 100)
        });
    }

    private initMap() {
        const mapContainer = this.mapContainerRef.nativeElement;
        this.mapConfig = {
            accessToken: this.mapboxApiKey,
            container: mapContainer,
            center: {
                lat: 52.308688,
                lng: 19.182128
            },
            zoomLevel: 6,
            delay: 500,
            showUserLocation: false,
            hideCompass: true,
            disableZoom: false,
            disableRotation: true,
            disableScroll: false,
            disableTilt: false,
        }
        const mapMapbox: MapboxView = new MapboxView();
        mapMapbox.setConfig(this.mapConfig);
        mapMapbox.on('mapReady', (args) => {
            this.onMapReady(args);
        })

        mapContainer.content = mapMapbox;
    }

    private onMapReady(args): void {
        this.map = args.map;
        this.addAlertsMarkers();
        if (typeof this.showAlert === 'undefined') {
            this.getLocalization();
        }
        this.alertsService.mapContainerHeightSubject.next(this.mapContainerRef.nativeElement.getActualSize().height);
    }

    private addAlertsMarkers() {
        this.subscription.add(
            this.alertsService.getAlerts().subscribe((alerts) => {
                alerts.forEach((alert:AlertModel, index) => {
                    this.addMarker(alert);

                    if (index == alerts.length - 1 && this.showAlert) {
                        let alertData = alerts.filter(alert => alert.id == this.showAlert)[0];
                        this.alertData = alertData;
                        this.modalType = 'alert';
                        this.alertsService.showModalSubject.next(true);
                        this.map.setCenter({
                            lat: alertData.coords[0].lat,
                            lng: alertData.coords[0].lng,
                            animated: false
                        })
                    }
                });
            })
        )
    }

    private addMarker(alertData): void {
        let newMarker = <MapboxMarker>{
            id: alertData.id,
            lat: alertData.coords[0].lat,
            lng: alertData.coords[0].lng,
            onTap: () => {
                this.ngZone.run(() => {
                    this.alertData = alertData;
                    this.modalType = 'alert';
                    this.alertsService.showModalSubject.next(true);
                })
            }
        };

        this.map.addMarkers([newMarker]).then();
    }

    public getLocalization(centerOnUser: boolean = false) {
        this.loaderService.onRequestStart();

        const locationPromise = geolocation.getCurrentLocation({
            desiredAccuracy: Enums.Accuracy.high,
            maximumAge: 5000,
            timeout: 20000
        });
        const $location = from(locationPromise);

        this.subscription.add($location.subscribe({
            next: (cord) => {
                this.loaderService.onRequestEnd();
                this.map.showUserLocationMarker(this.mapConfig);

                if (centerOnUser) {
                    this.map.setCenter({
                        lat: cord.latitude,
                        lng: cord.longitude,
                        animated: false
                    })
                } else {
                    this.userMarker = <MapboxMarker>{
                        id: 'user',
                        lat: cord.latitude,
                        lng: cord.longitude,
                    };
                }
            },
            error: () => {
                this.loaderService.onRequestEnd();

                perms.check('location', {type: 'always'}).then(response => {
                    if (response[0] == "denied" || response[0] == 'undetermined') {
                        Dialogs.confirm({
                            title: "Uwaga!",
                            message: "Nie zezwolono aplikacji na dostęp do Lokalizacji, odblokuj uprawnienia w Ustawieniach swojego systemu.",
                            cancelButtonText: "Anuluj"
                        });
                    }
                })
            }}));
    }

    ngOnDestroy(): void {

    }
}
