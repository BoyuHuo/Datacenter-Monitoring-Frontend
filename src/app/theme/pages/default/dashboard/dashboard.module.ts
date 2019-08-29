import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareModule } from '../../../../share/share.module';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": DashboardComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, LayoutModule, RouterModule.forChild(routes), NgxPaginationModule, ShareModule
    ], exports: [
        RouterModule
    ], declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {



}
