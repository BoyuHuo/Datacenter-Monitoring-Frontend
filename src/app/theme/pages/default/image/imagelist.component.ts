import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewChecked } from '@angular/core';
import { UserService, IpmiService } from '../../../../auth/_services';
import { environment } from "../../../../../environments/environment";
import { ActivatedRoute, Router } from "@angular/router";
import { ProgressHttp } from "angular-progress-http";
import { RequestOptions, Headers } from '@angular/http';

@Component({
    selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
    templateUrl: "./imagelist.component.html",
})



export class ImageList implements OnInit {
    @ViewChild('searchForm') searchForm: any;
    @ViewChild('editUserForm') editUserForm: any;
    @ViewChild('btnResult') btnResult: ElementRef;
    @ViewChild('btnDetails') btnDetails: ElementRef;
    @ViewChild('imageForm') imageForm: any;
    @ViewChild('uploadForm') uploadForm: any;
    @ViewChild('csvForm') csvForm: any;

    // file: object = {
    //     name: '',
    //     valid: false,
    //     touched: false,
    //     content: null,
    //     percentage: 0,
    //     loaded: 0,
    //     total: 0
    // };

    users: object[];
    currentUser: object;
    isShowDetails: boolean = false;
    userName: string;
    isFirstOpen: boolean = true;
    searchDefault: string = 'userName';
    orderDefault: string = 'create';
    isSelect: boolean = false;

    imageList: object[] = [];
    // page_number: number;
    // page_size: number;
    isClicked: boolean = false;
    isOverSize: boolean = false;
    currentImage: object;

    taskProgress: number = 40;
    private image: object = {};
    private currentImagePage: number;
    private pageSize: number = 5;
    private currentPage: number = 1;
    private listSize: number = 5;
    private totalImages: number = 0;
    file: any;
    ostype: any;
    version: any;
    name: any;
    imageType: any;
    imageMode: any;
    platform: any;
    remark: any;

    // imageId: any;
    // private token = localStorage.getItem('token');
    token = localStorage.token;

    constructor(private userService: UserService,
        private httpProgress: ProgressHttp, private renderer: Renderer2,
        private __ipmiService: IpmiService,
        private _route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        // console.log('load image', this.token);
        this.getImages(1);
    }

    getImages(pageNumber: number) {
        this.__ipmiService.GetImagesList(this.token, pageNumber, this.pageSize).subscribe(
            res => {
                console.log('res image', res);
                if (res && res['status'] == 'success' && res['data'])
                    this.imageList = res['data'];
                console.log('imageList', this.imageList);
                this.totalImages = res['page_info']['total_record_count'];
                console.log('total', this.totalImages);
                this.imageList.map((v, i) => {
                    this.currentImage = this.imageList[i];
                })
            },
            err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/');
                }
            }
        )
    }

    createImage() {
        console.log('data', this.imageForm.value, this.imageForm.value.password);
        let password = this.imageForm.value;
        console.log('tt', this.token, password);
        this.__ipmiService.CreateImage(this.token, password).subscribe(
            res => {
                console.log('add password', res);
                this.getImages(1);
                this.imageForm.resetForm();
            },
            err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/');
                }
            }
        )
    }

    handleFileInput(files: FileList) {
        console.log('files', files[0]);
        this.file = files[0];
        this.currentImage['image_size'] = this.file['size'] + ' Kb';
        console.log('size', this.currentImage['image_size']);
    }

    submitImage() {
        const form = new FormData();
        // console.log('type', typeof(this.currentImage['ID']));
        let id = this.currentImage['ID'].toString();

        form.append('ostype', this.currentImage['os_type']);     //console.log('os', this.currentImage['os_type']);
        form.append('version', this.currentImage['version']);
        form.append('imageType', this.currentImage['image_type']);
        form.append('imageMode', this.currentImage['image_mode']);
        form.append('imageSize', this.currentImage['image_size']);
        form.append('platform', this.currentImage['platform']);
        form.append('remark', this.currentImage['remark']);
        form.append('file', this.file);
        form.append('imageId', this.currentImage['ID']);
        console.log('data', form);
        this.__ipmiService.EditImage(this.token, form).subscribe(
            res => {
                console.log('res upload', res);
                this.isShowDetails = false;
                this.getImages(1);
            },
            err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/');
                }
            }
        )
    }

    deleteImage(e) {
        let id = e;
        this.__ipmiService.DeleteImage(this.token, id).subscribe(
            res => {
                console.log('de', res);
                this.getImages(1);
            },
            err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/');
                }
            }
        );
    }

    // private updateImage(state: object) {
    //     Object.assign(this.image, state);
    //     // console.log('task', this.task);
    //     localStorage.setItem('image', JSON.stringify(this.image));
    // }
}
