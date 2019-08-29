// import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
// import { ActivatedRoute, Router } from "@angular/router";
// // import { ScriptLoaderService } from "../_services/script-loader.service";
// // import { AuthenticationService } from "./_services/authentication.service";
// import { AlertService } from "./_services/alert.service";
// import { UserService } from "./_services/user.service";
// import { AlertComponent } from "./_directives/alert.component";
// // import { LoginCustom } from "./_helpers/login-custom";
// // import { Helpers } from "../helpers";

// @Component({
//     selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
//     templateUrl: './templates/reset.component.html',
//     encapsulation: ViewEncapsulation.None
// })

// export class ResetComponent implements OnInit {
//     @ViewChild('resetForm') resetForm: any;
//     @ViewChild('alertReset', { read: ViewContainerRef }) alertReset: ViewContainerRef;
//     private signature: string;
//     private email: string;
//     loading = false;
//     enabled: boolean = false;
//     constructor(private _router: Router,
//         // private _script: ScriptLoaderService,
//         private _userService: UserService,
//         private _route: ActivatedRoute,
//         // private _authService: AuthenticationService,
//         private _alertService: AlertService,
//         private cfr: ComponentFactoryResolver) {
//     }

//     ngOnInit() {
//         this._route.queryParams.subscribe(params => {
//             this.signature = params['signature'];
//             this.email = params['email']; console.log(this.signature, this.email);
//             if (this.signature && this.email) this.enableReset(this.signature, this.email);
//             else {
//                 this.showAlert('alertReset');
//                 this._alertService.error('No Token Found.');
//                 this.enabled = false;
//             }

//         });
//     }
//     reset() {
//         console.log(this.resetForm.value);
//         this.loading = true;
//         //console.log('newpassword', this.resetForm.value['password']);
//         if (this.resetForm.valid && this.signature && this.email) {
//             const data = { newPassword: this.resetForm.value['password'], signature: this.signature, email: this.email }
//             this._userService.ResetPassword(data).subscribe(
//                 res => {
//                     console.log(res);
//                     this.showAlert('alertReset');
//                     this._alertService.success('Your password has been reset successfully. Please login. ', true);
//                     this.loading = false;
//                     this._router.navigateByUrl('/login');
//                 }, err => {
//                     console.log(err);
//                     const errorMsg = err['error'] ? err['error']['cause'] : null;
//                     this.showAlert('alertReset');
//                     this._alertService.error(errorMsg || 'Reset Failed');
//                     this.loading = false;
//                 }
//             );
//         }
//     }
//     enableReset(signature: string, email: string) {
//         this._userService.EnableReset(signature, email).subscribe(
//             res => {
//                 if (res && res['status']) {
//                     this.showAlert('alertReset');
//                     this._alertService.success('Please Reset your password. ', true);
//                     this.enabled = true;
//                 }
//             }, err => {
//                 console.log(err);
//                 const errorMsg = err['error'] ? err['error']['cause'] : null;
//                 this.showAlert('alertReset');
//                 this._alertService.error(errorMsg || 'Reset token expired');
//                 this.enabled = false;
//             }
//         );
//     }

//     showAlert(target) {
//         this[target].clear();
//         let factory = this.cfr.resolveComponentFactory(AlertComponent);
//         let ref = this[target].createComponent(factory);
//         ref.changeDetectorRef.detectChanges();
//     }
// }
