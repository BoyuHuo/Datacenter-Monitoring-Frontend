import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-confirm-modal',
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
  `,
    styles: []
})

export class ConfirmModal implements OnInit {

    constructor(public modal: NgbActiveModal) { }

    ngOnInit() {

    }

}
