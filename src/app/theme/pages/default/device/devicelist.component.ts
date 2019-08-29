import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { IpmiService } from '../../../../auth/_services';
import { environment } from "../../../../../environments/environment";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
    templateUrl: "./devicelist.component.html",
})
export class DeviceList implements OnInit {
    @ViewChild('deviceForm') deviceForm: any;
    @ViewChild('csvForm') csvForm: any;
    deviceList: object[] = [];
    // pageInfo: object;
    isShowDetails: boolean = false;
    isUpload: boolean = false;
    currentDevice: object;
    token = localStorage.token;
    actionList: object[] = [];
    file: any;
    private pageSize: number = 5;
    private currentPage: number = 1;
    private listSize: number = 5;
    private totalDevices: number = 0;


    constructor(private __ipmiService: IpmiService,
        private router: Router) {
    }

    ngOnInit() {
        this.getDevices(1);
    }

    getDevices(pageNumber: number) {
        this.__ipmiService.GetIpimsList(this.token, pageNumber, this.pageSize).subscribe(
            res => {
                console.log('res device', res);
                this.deviceList = res['data'];
                console.log('list', this.deviceList);
                this.totalDevices = res['page_info']['total_record_count'];
                console.log('total', this.totalDevices);
                this.deviceList.map((v, i) => {
                    this.currentDevice = this.deviceList[i]
                })
            },
            err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/');
                }
            }
        )
    }

    submitDevice() {
        console.log('data', this.deviceForm.value);
        this.deviceForm.value.server_id = this.currentDevice['server_id'];
        this.__ipmiService.CreateIpim(this.token, this.deviceForm.value).subscribe(
            res => {
                console.log('res create', res);
                this.isShowDetails = false;
            },
            err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/');
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
                this.getDevices(1);
            },
            err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/');
                }
            }
        )
    }

    addList(index) {
        let ele = {
            sn: this.deviceList[index]['ipmi_sn']
        }
        this.actionList.push(ele);
        console.log('list', this.actionList);
    }

    removeList(index) {
        this.actionList = this.actionList.filter(
            value => {
                return value['sn'] !== this.deviceList[index]['ipmi_sn'];
            })
        console.log('list', this.actionList);
    }

    handleFileInput(files: FileList) {
        console.log('files', files[0]);
        this.file = files[0]
    }

    submitCSV() {
        const form = new FormData();
        form.append('file', this.file);
        this.__ipmiService.CreateIpimByCsv(this.token, form).subscribe(
            res => {
                console.log('res file', res);
                this.isShowDetails = false;
                this.getDevices(1);
            },
            err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/');
                }
            }
        )
    }

}
