import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from "./helpers";
import { DataService } from './_services/data.service';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    // title = 'app';
    // admin: true;
    //globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';
    globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile';

    constructor(private _router: Router, private dataService: DataService) {
    }

    ngOnInit() {
        this._router.events.subscribe((route) => {  //console.log(route)
            if (route instanceof NavigationStart) {
                Helpers.setLoading(true);
                Helpers.bodyClass(this.globalBodyClass);
            }
            if (route instanceof NavigationEnd) {
                Helpers.setLoading(false);
                const body = document.getElementsByTagName('body')[0];
                if (!route.url.startsWith('/worker')) {

                    if (route.url.startsWith('/ledger')) {
                        this.dataService.setLedger(true);
                    } else this.dataService.setLedger(false);
                    body.classList.add('m-aside-left--enabled');
                    body.classList.add('m-aside-left--skin-dark');
                    body.classList.add('m-footer--push');
                    // this.globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile';
                    //this.globalBodyClass = 'm-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';
                } else {
                    body.classList.remove('m-aside-left--enabled');
                    body.classList.remove('m-footer--push');
                }
            }
        });
    }
}
