import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { UserService } from '../../../../auth/_services';
import { environment } from "../../../../../environments/environment";
import { ActivatedRoute, Router } from "@angular/router";
import { IpmiService } from '../../../../auth/_services';

@Component({
    selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
    templateUrl: "./clusterlist.component.html",
})

export class ClusterList implements OnInit {
    token = localStorage.getItem('token');
    clusterList: object[] = [];
    currentGroup: object = {
        id: null,
        name: ''
    };
    order = {
        name: true,
        active: true,
        total: true,
        create_at: true
    }
    currentField: string = 'id';
    currentOrder: boolean = true;
    private pageSize: number = 5;
    private currentPage: number = 1;
    private listSize: number = 5;
    private totalClusters: number;

    constructor(private _route: ActivatedRoute,
        private __ipmiService: IpmiService) {
    }

    ngOnInit() {
        // console.log('load cluster');
        this.getGroups(this.currentPage);
    }

    getGroups(pageNumber: number) {
        this.__ipmiService.GetGroupList(this.token, pageNumber, this.pageSize, this.currentField, this.currentOrder).subscribe(
            res => {
                console.log('group list', res);
                if (res && res['status'] === "success" && res['data']) {
                    this.clusterList = res['data'];
                    this.totalClusters = res['page_info']['total_record_count'];
                }
            }
        )
    }

    createGroup() {
        // console.log('data', this.currentGroup);
        let data = {
            name: this.currentGroup['name']
        }
        this.__ipmiService.CreateGroup(this.token, data).subscribe(
            res => {
                // console.log('create', res);
                if (res && res['status'] === "success" && res['data']) {
                    this.currentGroup = {
                        id: null,
                        name: ''
                    };
                    this.getGroups(this.currentPage);
                }
            }
        )
    }

    editGroup() {
        console.log('current', this.currentGroup);
        this.__ipmiService.CreateGroup(this.token, this.currentGroup).subscribe(
            res => {
                console.log('edit group', res);
                if (res && res['status'] === "success" && res['data']) {
                    this.currentGroup = {
                        id: null,
                        name: ''
                    };
                    this.getGroups(this.currentPage);
                }
            }
        )
    }

    deleteGroup(groupId) {
        this.__ipmiService.DeleteGroup(this.token, groupId).subscribe(
            res => {

            }
        )
    }

    reverse(field: string) {
        console.log('order', this.order[field]);
        this.currentField = field;
        this.currentOrder = this.order[field];
        for (let key in this.order) {
            if (key !== field) {
                this.order[key] = true;
            }
        }
        this.getGroups(this.currentPage);
    }

}
