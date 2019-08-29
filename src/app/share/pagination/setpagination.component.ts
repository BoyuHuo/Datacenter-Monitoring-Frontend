import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './setpagination.component.html',
    styleUrls: ['./setpagination.component.scss']
})
export class SetPaginationComponent implements OnChanges, OnInit {
    @Input() total: number;
    @Input() pageSize: number;
    @Input() numberSize: number;
    @Input() name: string;
    @Input() currentPage: number;
    @Output() goPage = new EventEmitter<number>();
    private totalPages: number;
    private totalPagesArr: number[] = [];
    private currentPagesArr: number[] = [];
    private middle: number;
    private para: number;

    constructor() { }

    ngOnChanges() {
        this.moveCurrent(this.currentPage);
    }

    ngOnInit() {
        this.moveCurrent(1);
        this.middle = Math.ceil(this.numberSize / 2);
        this.para = this.numberSize % 2 != 0 ? 1 : 0;

        console.log(this.total, this.pageSize, this.numberSize, this.middle, this.para, this.middle, this.currentPage, this.name)
    }

    gotoPage(n: number): void {
        this.goPage.emit(n);
        this.moveCurrent(n);
    }

    moveCurrent(page) {
        this.totalPages = Math.ceil(this.total / this.pageSize);
        this.currentPage = Number(page);
        this.totalPagesArr = [];
        this.currentPagesArr = [];
        for (let i = 1; i <= this.totalPages; i++) {
            this.totalPagesArr.push(i);
        }
        if (this.totalPages >= this.numberSize) {
            if (this.currentPage > this.middle && this.currentPage <= this.totalPages - this.middle) {
                for (let i = this.currentPage - this.middle + this.para; i < this.currentPage + this.middle; i++) {
                    this.currentPagesArr.push(i);
                }
            }
            else if (this.currentPage <= this.middle) {
                for (let i = 1; i <= this.numberSize; i++) {
                    this.currentPagesArr.push(i);
                }
            }
            else {
                for (let i = this.totalPages - this.numberSize + this.para; i <= this.totalPages; i++) {
                    this.currentPagesArr.push(i);
                }
            }
        }
        else {
            this.currentPagesArr = this.totalPagesArr;
        }
    }
}
