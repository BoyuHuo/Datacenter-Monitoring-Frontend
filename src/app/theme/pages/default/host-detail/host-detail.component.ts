import { Component, OnInit } from '@angular/core';
import { IpmiService } from '../../../../auth/_services';
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
    templateUrl: "./host-detail.component.html",
})
export class HostDetail implements OnInit {
    token = localStorage.token;
    containerList: object[] = [];
    walletAddress: string = '';
    // serverIp: string = '';
    private pageSize: number = 5;
    private currentPage: number = 1;
    private listSize: number = 5;
    private totalContainer: number = 0;
    private serverId: string;
    graphUrl: string = '';
    start: string = 'Start Mining';
    stop: string = 'Stop Mining';

    constructor(private __ipmiService: IpmiService,
        private router: Router,
        private _route: ActivatedRoute,
        private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.serverId = this._route.snapshot.paramMap.get('id');
        // this.getDevices(1);
        this.getContainersInfo();
        // console.log('0xe132257C9Ac498719c56328631F20e9fbdF02D7A'.length)
    }

    getContainersInfo() {
        this.__ipmiService.GetContainersInfo(this.token, this.serverId).subscribe(
            res => {
                console.log('container', res);
                if (res && res['status'] === "success" && res['data']) {
                    this.containerList = res['data'];
                    this.graphUrl = environment.grafanaServerDetailUrl + "/server-detail?orgId=1&from=now-15m&to=now&var-ip=" + this.containerList[0]['server_ip'] + ':8080';
                    // console.log(this.graphUrl)
                }
            }
        )
    }

    mining(action) {
        let data = {
            operation: action,
            server_id: this.serverId,
            wallet: this.walletAddress
        }
        console.log('data', data);
        this.__ipmiService.Mining(this.token, data).subscribe(
            res => {
                console.log('mining', res);
                if (res) {
                    if (res['status'] === "success") {
                        // this.getContainersInfo();
                        if (action === 'start') {
                            this.start = res['data'];
                        }
                        else if (action === 'stop') {
                            this.stop = res['data'];
                        }
                    } else {
                        if (action === 'start') {
                            this.start = res['message'];
                        }
                        else if (action === 'stop') {
                            this.stop = res['message'];
                        }
                    }
                    this.walletAddress = '';
                    setTimeout(() => {
                        this.start = 'Start Mining';
                        this.stop = 'Stop Mining'
                    }, 5000);
                }

            }
        )
    }
}
