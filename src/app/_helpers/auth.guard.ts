import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_service/authentication.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("authgurde:", );
        if(this.authenticationService.currentUserValue != null){
            const currentUser = JSON.stringify(this.authenticationService.currentUserValue.status);
            if (currentUser) {
                // authorised so return true
                console.log('logged in user');
                return true;
            }
            // not logged in so redirect to login page with the return url
                this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url }});
                console.log('logged out user');
                return false;
        }else{
            // not logged in so redirect to login page with the return url
        this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url }});
        console.log('logged out user');
        return false;
        }
    }
}