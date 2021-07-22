import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
// changed BehaviorSubject to ReplaySubject, so that the Checkout guard waits until ReplaySubject has a user to emit; BehaviorSubject always emits a default value which is null at start
  private userSource = new ReplaySubject<IUser>(1);
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


  loadCurrentUser = (token: string) => {
    if(!token) {
      this.userSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl + "account", { headers }).pipe(
      map((user: IUser) => {
        localStorage.setItem("token", user.token);
        this.userSource.next(user);
    }));
  };


  // loadUserValue = () => this.userSource.value;

  emailExistsCheck = (email: string) => this.http.get(this.baseUrl + "account/emailexists?email=" + email);
}
