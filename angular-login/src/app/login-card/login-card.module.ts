import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginCardComponent } from './login-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginCardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    LoginCardComponent
  ]
})
export class LoginCardModule { }
