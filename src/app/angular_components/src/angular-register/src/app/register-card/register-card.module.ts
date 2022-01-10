import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterCardComponent } from './register-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterCardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    RegisterCardComponent
  ]
})
export class RegisterCardModule { }
