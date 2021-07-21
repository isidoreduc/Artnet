import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  serverErrors: string;
  date = environment.date;
  registerForm: FormGroup;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  initializeFormGroup = () => {
    this.registerForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("",
        [Validators.required,
          Validators.pattern("^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\\.[a-zA-Z]{2,7})$")],
        [this.checkEmailAvailable()] // our async validator
      ),
      password: new FormControl("", [Validators.required,
      Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{6,})")])
    });
  };

  onSubmit = () => this.accountService.register(this.registerForm.value)
    .subscribe(() =>
      this.router.navigateByUrl("/shop"),
      err => {
        console.log(err);
        this.serverErrors = err.errors;
      }
    );

  checkEmailAvailable = (): AsyncValidatorFn => {
    return control => {
      return timer(500).pipe(switchMap(() => {
        if (!control.value) return null;
        return this.accountService.emailExistsCheck(control.value).pipe(
          map(result => result ? { emailExists: true } : null));
      }));
    };
  };

}
