import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { DataService } from '../../../_services/data.service';
import { Subscription } from "rxjs/Subscription";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ngbd-modal-confirm',
    template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Task cancel</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <h3>Your Task has not been submitted</h3>
        <p>If you leave now we will clear your task cache. Your current task will be deleted. </p>
        <p>Are you sure to leave now?</p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-theme" (click)="modal.close('Ok click')" data-dismiss="modal">
		    Confirm
		</button>
		<button type="button" class="btn btn-secondary" (click)="modal.dismiss('cancel click')">
			Close
		</button>
    </div>
    `
})
export class NgbdModalSide {
    constructor(public modal: NgbActiveModal) { }
}

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {
    subscription: Subscription;
    isLedger: Boolean = false;
    isStart: Boolean = false;

    constructor(private dataService: DataService,
        private modalService: NgbModal,
        private router: Router
    ) {

    }
    ngOnInit() {
        this.dataService.isLedger$.subscribe(res => this.isLedger = res);
        this.dataService.isStart$.subscribe(
            res => {
                // console.log('Start', res);
                this.isStart = res;
            });
    }
    ngAfterViewInit() {

        mLayout.initAside();
        let menu = mLayout.getAsideMenu(); let item = $(menu).find('a[href="' + window.location.pathname + '"]').parent('.m-menu__item'); (<any>$(menu).data('menu')).setActiveItem(item);
    }


    openModal(name: string) {
        // console.log('start', this.isStart);
        if (this.isStart) {
            // console.log('run');
            this.modalService.open(NgbdModalSide).result.then((result) => {
                // console.log('result', result);
                localStorage.removeItem('task');
                this.dataService.setMission(false);
                if (name == "profile") {
                    this.router.navigateByUrl(name);
                }
                else {
                    this.router.navigateByUrl("dev/" + name);
                }
            }, (reason) => {
            });
        }
        else if (this.isLedger) {
            if (name == 'history') {
                name = 'tasks';
            }
            this.router.navigateByUrl("ledger/" + name);
        }
        else {
            if (name == "profile") {
                this.router.navigateByUrl(name);
            }
            else {
                this.router.navigateByUrl("dev/" + name);
            }
        }

    }
}
