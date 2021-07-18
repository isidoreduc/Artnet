import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  date = environment.date;
  registerForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  initializeFormGroup = () => {
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.pattern("((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,})")])
    });
  };

  onSubmit = () => console.log(this.registerForm.value);

}
