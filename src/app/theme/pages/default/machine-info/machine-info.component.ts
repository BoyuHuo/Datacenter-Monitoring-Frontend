import { Component, OnInit } from '@angular/core';
import { IpmiService } from '../../../../auth/_services';

@Component({
    selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
    templateUrl: "./machine-info.component.html",
})

export class MachineInfo implements OnInit {
    token = localStorage.getItem('token');
    machineInfo: object = {};
    constructor(
        private __ipmiService: IpmiService) {
    }

    ngOnInit() {
        this.__ipmiService.GetMachineInfo(this.token).subscribe(
            res => {
                if (res && res['status'] === "success" && res['data']) {
                    this.machineInfo = res['data'];
                    console.log('info', this.machineInfo)
                }
            }
        )

    }

}
