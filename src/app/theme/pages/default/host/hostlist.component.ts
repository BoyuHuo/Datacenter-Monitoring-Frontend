import { Component, OnInit } from '@angular/core';

@Component({
    selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
    templateUrl: "./hostlist.component.html",
})



export class HostList implements OnInit {
    setting: object = {
        where: 1,
        title: "Server List",
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

    currentHost: object = {
        id: null,
        name: ''
    }

    constructor() {
    }

    ngOnInit() {

    }

}
