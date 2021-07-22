import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  date = environment.date;
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeFormGroup();
// if user not logged in and coming from checkout, the guard will send a return url so that after login, user should be navigated to checkout, not shop as usual
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams.returnUrl || "/shop"
  }

  initializeFormGroup = () => {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required,
        Validators.pattern("^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,7})$")]),
      password: new FormControl("", [Validators.required])
    });
  };

  onSubmit = () => this.accountService.login(this.loginForm.value)
    .subscribe(() =>
      this.router.navigateByUrl(this.returnUrl),
      err => console.log(err));
}
