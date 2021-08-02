import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // put spinner while creating order
    if(request.method === "POST" && request.url.includes("api/order")){
      return next.handle(request);
    }
    // put spinner while checking for email exists at registering
    if(!request.url.includes("emailexists"))
      this.spinnerService.busyServer();
    return next.handle(request).pipe(
      // delay(300),
      finalize(() => this.spinnerService.idleServer())
    );
  }
}
