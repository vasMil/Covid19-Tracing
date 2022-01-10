import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginCardComponent } from './login-card/login-card.component';
import { LoginCardModule } from './login-card/login-card.module';
import { AuthService } from './shared/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginCardModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  entryComponents: [
    LoginCardComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap(): void {
    const login_card = createCustomElement(LoginCardComponent, {injector: this.injector});
    customElements.define('login-card', login_card);
  }
}
