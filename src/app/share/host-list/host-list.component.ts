import { Component, OnInit, Input, } from '@angular/core';
import { PrometheusService } from '../../auth/_services';
import { IpmiService } from '../../auth/_services';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'host-list',
    templateUrl: './host-list.component.html',
    // styleUrls: ['./setpagination.component.scss']
})
export class HostListComponent implements OnInit {
    @Input() setting: object;
    @Input() currentHost: Object;
    @Input() groupId: number;
    token = localStorage.token;
    refresh: boolean = false;
    actionList: object[] = [];
    tableSetting: object = {
        where: 1,
        fields: {
            name: true,
            ip: true,
            port: true,
            group: false,
            powerStatus: true,
            miningStatus: true,
            containerNumber: true,
            action: true
        }
    }
    modalSetting: object = {
        fields: {
            name: true,
            ip: true,
            port: false,
            group: true,
            powerStatus: false,
            miningStatus: false,
            containerNumber: false,
            action: false
        }
    }
    open = false;
    powerStatus = '';
    constructor(private __prometheusService: PrometheusService,
        private __ipmiService: IpmiService,
        private _route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        console.log('id in list', this.groupId)
    }

    powerSelect(powerStatus: string) {
        this.powerStatus = powerStatus;
    }

    addServer() {
        console.log('current', this.currentHost);
        this.__ipmiService.CreateServer(this.token, this.currentHost).subscribe(
            res => {
                console.log('res', res);
                this.currentHost = {};
                this.refresh = !this.refresh;
            }
        )
    }

    getActionList(event) {
        console.log('action list', event);
        this.actionList = event;
    }

    addServerToGroup() {
        this.__ipmiService.AddServerToGroup(this.token, this.actionList).subscribe(
            res => {
                console.log('add server to group', res);
            }
        )
    }

    allServer() {
        this.powerStatus = '';
    }

}
