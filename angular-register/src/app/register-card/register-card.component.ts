import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {
  
  @Input() api_url = "http://localhost:8080/register"

  registerForm!: FormGroup;
  passwordModel = {
    iconClass: "fas fa-eye-slash",
    type: "password"
  }

  registerErrors = {
    registerFailed: false,
    usernameUsed: false,
    emailUsed: false,
    fieldInvalid: false,
    message: "Register Failed!"
  }

  registerSuccess = {
    status: false,
    message: "Register was successful!"
  }

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
    this.registerForm = this.formBuilder.group({
      username: ['',[
        Validators.required
      ]],
      password: ['',[
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$*&@])[A-Za-z0-9#$*&@]{8,}$')
      ]],
      email: ['',[
        Validators.required,
        Validators.email
      ]]
    })
  }

  onRegister(): void {
    if (!this.registerForm.valid) {
      this.clearRegisterErrors();
      this.registerErrors.fieldInvalid = true;
      this.registerErrors.message = "One or more fields are invalid!"
      return;
    }
    this.clearRegisterErrors();
    this.auth.registerUser({
      api_url: this.api_url,
      username: this.username?.value,
      password: this.password?.value,
      email: this.email?.value
    })
    .subscribe({
      error: () => {
        // TODO: log this error
        this.registerErrors.registerFailed = true;
        this.registerErrors.message = "Register Failed! Try again later";
      },
      next: (resp) => {
        if (!resp.success) {
          if (resp.usernameUsed) {
            this.clearRegisterErrors();
            this.registerErrors.usernameUsed = true;
            this.registerForm?.get('username')?.setErrors({'used': true});
          }
          if (resp.emailUsed) {
            this.clearRegisterErrors();
            this.registerErrors.emailUsed = true;
            this.registerForm?.get('email')?.setErrors({'used': true});
          }
        }
        else {
          this.registerSuccess.status = true;
        }
      }
    })
  }

  private clearRegisterErrors() {
    this.registerErrors = {
      registerFailed: false,
      usernameUsed: false,
      emailUsed: false,
      fieldInvalid: false,
      message: "Register Failed!"
    }
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
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get email() {
    return this.registerForm.get('email')
  }

}
