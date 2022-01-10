import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginCardComponent } from './login-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@NgModule({
  declarations: [
    LoginCardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    LoginCardComponent
  ]
})
export class LoginCardModule {

}
