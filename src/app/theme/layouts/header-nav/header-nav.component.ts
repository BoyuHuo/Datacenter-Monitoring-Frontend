import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { Customer } from '../../../_models/customer.model';
// import { UserService } from '../../../auth/_services';
import { Router } from '@angular/router';
import { CustomerService } from '../../../_services/customer.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../_services/data.service';

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
export class NgbdModalHeader {
    constructor(public modal: NgbActiveModal) { }
}

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {

    userInfo: Customer = new Customer(0, '', '', '', '');
    isStart: Boolean = false;

    constructor(private router: Router,
        private customerService: CustomerService,
        private dataService: DataService,
        private modalService: NgbModal, ) {

    }
    ngOnInit() {
        this.customerService.customer$.subscribe(res => { //console.log(res)
            if (res) this.userInfo = res;
        });
        this.dataService.isStart$.subscribe(
            res => {
                // console.log('Start', res);
                this.isStart = res;
            });
    }
    ngAfterViewInit() {
        mLayout.initHeader();
    }

    openModal(name: string) {
        // console.log('start', this.isStart);
        if (this.isStart) {
            console.log('run');
            this.modalService.open(NgbdModalHeader).result.then((result) => {
                // console.log('result', result);
                this.dataService.setMission(false);
                localStorage.removeItem('task');
                this.router.navigateByUrl("/" + name);
            }, (reason) => {

            });
        }
        else {
            this.router.navigateByUrl("/" + name);
        }

    }

}
