import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  type = ['Login', 'Sign In'];
  chosenType = this.type[0];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  loginForm = this.formBuilder.group({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  signInUser() {
    const data = this.loginForm.value;
    this.loginService.userSignin(data).subscribe();
  }
  loginUser() {
    const data = this.loginForm.value;
    this.loginService.userLogin(data).subscribe();
  }
}
