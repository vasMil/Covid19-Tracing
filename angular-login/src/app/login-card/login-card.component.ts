import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  onLogin(): void {
    if(!this.loginForm.valid) {
      return;
    }
    if(this.rememberMe?.value) {
      // Save user id in local storage - maybe encrypted?
    }
    else {
      // Save user id in session stortage - maybe encrypted?
    }
  }

}
