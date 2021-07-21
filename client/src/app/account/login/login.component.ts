import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.initializeFormGroup();
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
      this.router.navigateByUrl("/shop"),
      err => console.log(err));
}
