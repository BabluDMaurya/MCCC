import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_service/authentication.service';
declare var toastbox: any;
declare var $: any;

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    toastSuccess:string = 'toast-18';
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // new toastbox(this.toastSuccess, 2000);
        // $('#success_tosterMsg').text(" auth gurd : "+this.authenticationService.currentUserValue)
        //     setTimeout(() => {
        //     $('#'+this.toastSuccess).removeClass('show');
        // }, 20000);
        if(this.authenticationService.currentUserValue != null){
            const currentUser = JSON.stringify(this.authenticationService.currentUserValue.status);
            if (currentUser) {
                // authorised so return true
                return true;
            }
            // not logged in so redirect to login page with the return url
                this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url }});
                return false;
        }else{
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}