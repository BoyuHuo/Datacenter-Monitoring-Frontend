import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusPipe } from '../_directives/status.pipe';
import { navLinkDirective } from '../_directives/nav-click.directive';
import { SetPaginationComponent } from './pagination/setpagination.component';
import { HostListComponent } from './host-list/host-list.component';
import { HostTableComponent } from './host-table/host-table.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SafeURLPipe } from '../_directives/safeURL.pipe';
import { FileSizePipe } from '../_directives/file-size.pip'
import { PercentagePipe } from '../_directives/percentage.pipe';

@NgModule({
    imports: [
        CommonModule, FormsModule, RouterModule
    ],
    exports: [
        StatusPipe, navLinkDirective, SetPaginationComponent, HostListComponent, HostTableComponent, SafeURLPipe, FileSizePipe, PercentagePipe
    ],
    declarations: [
        StatusPipe, navLinkDirective, SetPaginationComponent, HostListComponent, HostTableComponent, SafeURLPipe, FileSizePipe, PercentagePipe
    ]
})
export class ShareModule { }
