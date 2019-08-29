import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ScriptLoaderService } from "../_services/script-loader.service";
import { AuthenticationService } from "./_services/authentication.service";
import { AlertService } from "./_services/alert.service";
import { UserService } from "./_services/user.service";
import { AlertComponent } from "./_directives/alert.component";
import { LoginCustom } from "./_helpers/login-custom";
import { Helpers } from "../helpers";
import { DataService } from "../_services/data.service";

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: './templates/login.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit {
    // @ViewChild('registerForm') registerForm: any;
    @ViewChild('loginForm') loginForm: any;
    // @ViewChild('forgotForm') forgotForm: any;
    // model: any = {};
    loading: boolean;

    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup', { read: ViewContainerRef }) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass', { read: ViewContainerRef }) alertForgotPass: ViewContainerRef;

    constructor(private _router: Router,
        private dataService: DataService,
        private _script: ScriptLoaderService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this._route.queryParams.subscribe(params => {
            // const activateCode = params['activateCode'];
            // this.isLedger = params['type'] == 'ledger';
            // this.returnUrl = params['returnUrl'] || 'profile'; //this.isLedger ? '/ledger/index' : '/dev/index';
            // this.dataService.setLedger(this.isLedger);
            // const userId = params['id']; //console.log(activateCode, userId);
            // if (activateCode && userId) this.activateAccount(activateCode, userId);
        });

        this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
            .then(() => {
                Helpers.setLoading(false);
                LoginCustom.init();
            });
    }

    signin() {
        this.loading = true;
        const json = this.loginForm.value; //console.log(json)
        this._authService.login(json)
            .subscribe(
            data => {
                // console.log(data);
                let user = data;
                if (user && user['access_token']) {
                    // console.log('token login', user['access_token']);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', user['access_token']);      //console.log(this.returnUrl);
                    this._router.navigateByUrl("dashboard");
                } else {
                    this.showAlert('alertSignin');
                    const errMsg = 'Login Failed';
                    // const errMsg = user['errorMessage']? user['errorMessage']['cause'] : 'Wrong Username or Passwor';
                    this._alertService.error(errMsg);
                    this.loading = false;
                }
            },
            error => {
                const errorMsg = error['error'] ? error['error']['cause'] : null;
                this.showAlert('alertSignin');
                this._alertService.error(errorMsg || 'Login Failed');
                this.loading = false;
            });
    }

    // signup() {
    //     this.loading = true;
    //     const json = this.registerForm.value;                       //console.log(json)
    //     this._authService.Register(json).subscribe(
    //         data => {
    //             this.showAlert('alertSignin');
    //             this._alertService.success('Thank you. Please check your email and activate your account.', true);
    //             this.loading = false;
    //             LoginCustom.displaySignInForm();
    //             // this.model = {};
    //         },
    //         error => {
    //             const errorMsg = error['error'] ? error['error']['cause'] : null;
    //             this.showAlert('alertSignup');
    //             this._alertService.error(errorMsg || 'Register Failed');
    //             this.loading = false;
    //         });
    // }

    // forgotPass() {
    //     this.loading = true;
    //     //console.log(this.forgotForm);
    //     this._userService.forgotPassword(this.forgotForm.value['email'])
    //         .subscribe(
    //         data => {
    //             console.log('data', data);
    //             this.showAlert('alertSignin');
    //             this._alertService.success('Cool! Password recovery instruction has been sent to your email.', true);
    //             this.loading = false;
    //             LoginCustom.displaySignInForm();
    //             // this.model = {};
    //         },
    //         error => {
    //             this.showAlert('alertForgotPass');
    //             this._alertService.error(error);
    //             this.loading = false;
    //         });
    // }
    // activateAccount(activateCode: string, id: string) {
    //     this._userService.ActivateAccount(activateCode, id).subscribe(
    //         res => {
    //             //console.log(res);
    //             this.showAlert('alertSignin');
    //             this._alertService.success('Your account has been successfully activated. Please Login.', true);
    //         },
    //         err => {
    //             console.log(err);
    //             this.showAlert('alertSignin');
    //             this._alertService.error('Problems have occured while your account activation.', true);
    //         }
    //     );
    // }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}
