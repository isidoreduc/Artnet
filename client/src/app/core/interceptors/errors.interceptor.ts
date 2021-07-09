import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      
        if (err?.status === 404) {
            this.router.navigateByUrl('/not-found');
        }
        if (err?.status === 500) {
          const navigationExtras : NavigationExtras = {state: {error: err?.error}};
          this.router.navigateByUrl('/server-error', navigationExtras);
        }
        if (err?.status === 400) {
          if (err?.error.errors) 
            throw err?.error
          else 
            this.toastr.error(err?.error.errorMessage, `${err.error.statusCode} Error`);
        }
        if (err?.status === 401) {
          this.toastr.error(err?.error.errorMessage, `${err.error.statusCode} Error`);
        }
    
      return throwError(err);
    }
    ));
  }
}
