import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {View} from '@nativescript/core';
import {IconService} from "../../../../shared/services/icon.service";
import {HelperService} from "../../../../shared/services/helper.service";
import {AlertsService} from "../../services/alerts.service";
import {AlertModel} from "../../models/alert.model";

@Component({
    selector: 'app-alert-modal',
    moduleId: module.id,
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit, OnDestroy, AfterViewInit {
    modalScrollHeight: number | string = 'auto';
    private modalHeader: View;
    private modalContent: View;

    @Input() alertData: AlertModel = null;
    @Output() closeModalEvent = new EventEmitter();
    @ViewChild('alertModal', {static: false}) public alertModalRef: ElementRef;
    @ViewChild('modalHeader', {static: false}) public modalHeaderRef: ElementRef;
    @ViewChild('modalContent', {static: false}) public modalContentRef: ElementRef;
    constructor(
        public helperService: HelperService,
        public iconService: IconService,
        public alertService: AlertsService
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.modalHeader = this.modalHeaderRef.nativeElement;
        this.modalContent = this.modalContentRef.nativeElement;
        this.alertModalRef.nativeElement.animate({opacity: 1, duration: 100})

        setTimeout(() => {
            this.setModalSize();
        }, 500);
    }

    setModalSize(): void {
        const modalHeaderHeight = this.modalHeader.getActualSize().height;
        const modalContentHeight = this.modalContent.getActualSize().height;
        const maxModalHeight = this.alertService.mapContainerHeightSubject.getValue() - 30;

        if (modalContentHeight > (maxModalHeight - modalHeaderHeight)) {
            this.modalScrollHeight = maxModalHeight - modalHeaderHeight;
        } else {
            this.modalScrollHeight = 'auto';
        }
    }

    closeModal() {
        this.alertService.showModalSubject.next(false);
    }

    ngOnDestroy(): void {
    }
}
