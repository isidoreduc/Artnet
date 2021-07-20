import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  date = environment.date;
  registerForm: FormGroup;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  initializeFormGroup = () => {
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required,
        Validators.pattern("^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\\.[a-zA-Z]{2,7})$")]),
      password: new FormControl("", [Validators.required, Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{6,})")])
    });
  };

  onSubmit = () => this.accountService.register(this.registerForm.value).subscribe(() =>
    this.router.navigateByUrl("/account/login"), err => console.log(err)
  );

}
