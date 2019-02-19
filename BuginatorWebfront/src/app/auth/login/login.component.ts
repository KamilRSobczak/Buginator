import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'buginator-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private loginError: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get logForm() {
    return this.loginForm.controls;
  }

  isLoginError(): boolean {
    return this.loginError;
  }

  onLoginSubmit() {
    this.loginError = false;
    console.log('login submit');
    console.log(this.loginForm);
    this.authService.oauth2Login(this.loginForm.value)
      .then(res => console.log(res),
        error => {
          this.loginError = true;
        });
  }
}
