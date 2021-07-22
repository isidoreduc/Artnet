import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
// guard is part of Routing which subscribes automatically to an observable,
// so no need to subscribe, just pipe
    return this.accountService.user$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/account/login'],
            { queryParams: { returnUrl: state.url } } );
          return false;
        }
      }));
  }

}
