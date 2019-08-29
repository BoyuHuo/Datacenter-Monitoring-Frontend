import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PrometheusService } from '../../auth/_services';
import { IpmiService } from '../../auth/_services';
import { ActivatedRoute, Router } from "@angular/router";
import { TimeoutError } from 'rxjs';
import { OuterSubscriber } from 'rxjs/OuterSubscriber';

@Component({
    selector: 'host-table',
    templateUrl: './host-table.component.html',
    // styleUrls: ['./setpagination.component.scss']
})
export class HostTableComponent implements OnInit {
    @Input() setting: object;
    // @Input() 
    @Input() action: string;
    @Input() groupId: number;
    @Input() powerStatus: string = '';
    @Input() except: string = '';
    @Input() refresh: boolean;
    @Output() returnList = new EventEmitter<object[]>();
    actionList: object[] = [];
    serversList: object[] = [];
    hardwareDetail: object;
    currentHost = {

    }
    order = {
        server_host: true,
        ip: true,
        ssh_port: true,
        group_name: true,
        power_status: true
    }
    // actionList: object[] = [];
    allChecked: boolean = false;
    token = localStorage.token;
    current = {
        field: 'id',
        order: true,
        reverse: '',
        powerStatus: this.except,
        page: 1
    }
    private pageSize: number = 5;
    private currentPage: number = 1;
    private listSize: number = 5;
    private totalServers: number = 0;

    constructor(private __prometheusService: PrometheusService,
        private __ipmiService: IpmiService,
        private _route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        console.log('id in table', this.groupId);
        this.getServersList(this.current.page);
    }

    ngOnChanges() {
        this.powerSelect(this.powerStatus);
        this.current.powerStatus = this.except;
        // this.getServersList(this.currentPage);
        console.log('table setting change', this.current.powerStatus);
    }

    getServersList(pageNumber: number) {
        // console.log('server list', pageNumber, this.pageSize, this.groupId, field, order, reverse, powerStatus)
        this.__ipmiService.GetServers(this.token, pageNumber, this.pageSize, this.groupId, this.current.field, this.current.order, this.current.reverse, this.current.powerStatus).subscribe(
            res => {
                console.log('host list', res);
                if (res && res['status'] === "success" && res['data']) {
                    this.serversList = res['data'];
                    this.totalServers = res['page_info']['total_record_count'];
                }
            }
        )
    }

    power(type) {
        this.actionList.forEach(element => {
            element['value'] = type;
        });
        console.log(this.actionList);
        this.__ipmiService.SetPower(this.token, this.actionList).subscribe(
            res => {
                console.log('res power', res);
                this.getServersList(this.current.page);
            },
            err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/');
                }
            }
        )
    }

    editServer() {
        console.log('current', this.currentHost);
        this.__ipmiService.CreateServer(this.token, this.currentHost, ).subscribe(
            res => {
                console.log('edit server', res);
                this.getServersList(this.current.page);
                this.currentHost = {};
            }
        )
    }

    addList(server) {
        if (server !== -1) {
            this.actionList.push(server);
        }
        else {
            this.actionList = this.serversList;
        }
        this.returnList.emit(this.actionList);
        console.log('list', this.actionList);
    }

    removeList(server) {
        if (server !== -1) {
            this.actionList = this.actionList.filter(
                value => {
                    console.log('value', value);
                    return server.id !== value['id'];
                })
        } else {
            this.actionList = [];
        }
        console.log('list', this.actionList);
        this.returnList.emit(this.actionList);
    }

    reverse(field: string) {
        // console.log('order', this.order[field]);
        this.current.field = field;
        this.current.order = this.order[field];
        for (let key in this.order) {
            if (key !== field) {
                this.order[key] = true;
            }
        }
        this.getServersList(this.current.page);
    }

    powerSelect(powerStatus) {
        this.current.powerStatus = powerStatus;
        this.getServersList(this.current.page);
    }
}
