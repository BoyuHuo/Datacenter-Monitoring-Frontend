import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MachineInfo } from './machine-info.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../../../../share/share.module';
// import { AddressPipe } from '../../../../../_directives/address.pipe';



const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": MachineInfo
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, LayoutModule, RouterModule.forChild(routes), NgxPaginationModule, FormsModule, ShareModule
    ], exports: [
        RouterModule
    ], declarations: [
        MachineInfo,
    ]
})
export class MachineInfoModule {

}
