import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {

  @Input() api_url = "http://localhost:8080/login"
  @Output() successEvent = new EventEmitter<string>();

  loginForm!: FormGroup;
  private _remember = false;
  loginErrors = {
    loginFailed: false,
    fieldInvalid: false,
    message: ""
  };
  passwordModel = {
    iconClass: "fas fa-eye-slash",
    type: "password"
  }
  successfulLogin = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token') || localStorage.getItem('token')) {
      // Either something fishy is going on or you haven't yet handled an already authenticated user triyng to access the page
      // TODO: log it properly
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
      api_url: this.api_url,
      username: this.username?.value,
      password: this.password?.value,
      rememberMe: this.remember
    }).subscribe({
      error: (err) => {
        console.log(err)
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
          localStorage.setItem('token', "Bearer " + resp.token);
          this.successfulLogin = true;
        }
        else {
          // Save jwt in session storage
          this.clearLoginErrors();
          sessionStorage.setItem('token', "Bearer " + resp.token);
          this.successfulLogin = true;
        }

        // Emit output event
        if (this.successfulLogin) {
          this.successEvent.emit(resp.redirectTo);
        }
        else {
          this.successEvent.emit("#");
        }
      }
    })
  }

  onPasswordShow() {
    if (this.passwordModel.type == "password") {
      this.passwordModel = {
        type: "text",
        iconClass: "fas fa-eye"
      };
    }
    else {
      this.passwordModel = {
        iconClass: "fas fa-eye-slash",
        type: "password"
      };
    }
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
