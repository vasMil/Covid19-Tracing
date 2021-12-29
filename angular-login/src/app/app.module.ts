import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginCardModule } from './login-card/login-card.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
