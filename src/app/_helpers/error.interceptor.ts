import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_service/authentication.service';
declare var toastbox: any;
declare var $: any;
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    toastSuccess:string = 'toast-18';
    constructor(private authenticationService: AuthenticationService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            // let gerror = JSON.stringify(err);
            // new toastbox(this.toastSuccess, 2000);
            //     $('#success_tosterMsg').text(" error intercepter : "+gerror)
            //         setTimeout(() => {
            //         $('#'+this.toastSuccess).removeClass('show');
            //     }, 20000);
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload();
                // new toastbox(this.toastSuccess, 2000);
                // $('#success_tosterMsg').text(" error intercepter of 401:"+err)
                //     setTimeout(() => {
                //     $('#'+this.toastSuccess).removeClass('show');
                // }, 20000);
            }  
            if (err.status === 404) {
                const error = err.error.errors || err.statusText;
                return throwError(error);
            }    
            if (err.status === 422) {
                const error = err.error.errors || err.statusText;
                return throwError(error);
            }           
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}