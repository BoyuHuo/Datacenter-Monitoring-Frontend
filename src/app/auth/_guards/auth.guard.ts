import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _userService: UserService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const token = localStorage.getItem('token'); //console.log(currentUser)
        if (token) return true;
        else {
            this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        // return this._userService.verify().map(
        //     data => {
        //         if (data !== null) {
        //             return true;
        //         }
        //         // error when verify so redirect to login page with the return url
        //         this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //         return false;
        //     },
        //     error => {
        //         // error when verify so redirect to login page with the return url
        //         this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //         return false;
        //     });
    }
}
