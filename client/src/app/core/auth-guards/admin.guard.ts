import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  adminMail = environment.adminEmail;
  constructor(private router: Router, private accountService: AccountService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.accountService.user$.pipe(
        map(user => {
          if (user && user.email === this.adminMail) {
            return true;
          } else {
            this.router.navigateByUrl('/not-found');
            return false;
          }
        }));
  }

}
