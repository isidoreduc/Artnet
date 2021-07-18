import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private userSource = new BehaviorSubject<IUser>(null);
  user$ = this.userSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login = (values: any) => {
    return this.http.post(this.baseUrl + "account/login", values).pipe(map((user: IUser) => {
      if (user) {
        localStorage.setItem("token", user.token);
        this.userSource.next(user);
      }
    }));
  };


  register = (values: any) => {
    return this.http.post(this.baseUrl + "account/register", values).pipe(map((user: IUser) => {
      if (user) {
        localStorage.setItem("token", user.token);
        this.userSource.next(user);
      }
    }));
  };


  logout = () => {
    localStorage.removeItem("token");
    this.userSource.next(null);
    this.router.navigateByUrl("/");
  };


  emailExistsCheck = (email: string) => this.http.get(this.baseUrl + "account/emailexists?email=" + email);
}
