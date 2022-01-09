import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {

  loginForm!: FormGroup;
  private _remember = false;
  loginErrors = {
    loginFailed: false,
    fieldInvalid: false,
    message: ""
  };

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token') || localStorage.getItem('token')) {
      // Either something fishy is going on or you haven't yet handled an already authenticated user triyng to access the page
      // TODO: log it properly
      console.log("User has already logged in!");
      console.log("Temporary solution - logout by deleting the jwt");
      sessionStorage.clear();
      localStorage.clear();
    }
    this.loginForm = this.formBuilder.group({
      username: ['',[
        Validators.required
      ]],
      password: ['',[
        Validators.required
      ]],
      rememberMe: ['',[]]
    })
  }

  onLogin(): void {
    if(!this.loginForm.valid) {
      this.loginErrors.fieldInvalid = true;
      this.loginErrors.message = "One or more fields are invalid!"
      return;
    }
    this.auth.loginUser({
      username: this.loginForm.get('username'),
      password: this.loginForm.get('password'),
      rememberMe: this.loginForm.get('rememberMe')
    }).subscribe({
      error: () => {
        this.loginErrors.fieldInvalid = false;
        this.loginErrors.loginFailed = true;
        this.loginErrors.message = "Login Failed, try again later" 
        //TODO: log the fact that the server returned a bad response
      },
      next: (resp) => {
        if (!resp.success) {
          //TODO: log the failed attempt?
          // prompt a message to the user
          this.loginErrors.fieldInvalid = false;
          this.loginErrors.loginFailed = true;
          this.loginErrors.message = "Invalid credentials!"
        }
        else if (this.remember) {
          // Save jwt in local storage
          this.clearLoginErrors();
          localStorage.setItem('token', resp.token)
        }
        else {
          // Save jwt in session storage
          this.clearLoginErrors();
          sessionStorage.setItem('token', resp.token)
        }
      }
    })
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get remember(): boolean {
    this._remember = this.loginForm.get('rememberMe')?.value || false;
    return this._remember;
  }

  private clearLoginErrors() {
    this.loginErrors.fieldInvalid = false;
    this.loginErrors.loginFailed = false;
    this.loginErrors.message = "";
  }
}
