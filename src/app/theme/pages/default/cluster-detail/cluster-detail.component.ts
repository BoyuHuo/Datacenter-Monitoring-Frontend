import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
    templateUrl: "./cluster-detail.component.html",
})



export class ClusterDetail implements OnInit {
    setting: object = {
        where: 2,
        title: "",
        header: true,
        modal: true,
        buttons: {
            chooseOn: true,
            chooseOff: true,
            addServer: true,
            removeServer: false,
            powerOn: true,
            powerOff: true
        },
    }
    groupId: number;
    currentHost: object = {
        id: null,
        name: ''
    }

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this.groupId = Number(this._route.snapshot.paramMap.get('id'));
        console.log('id in detail', this.groupId);
    }

}
