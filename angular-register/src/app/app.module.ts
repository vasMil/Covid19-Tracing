import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterCardComponent } from './register-card/register-card.component';
import { RegisterCardModule } from './register-card/register-card.module'
import { AuthService } from './shared/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RegisterCardModule,
    HttpClientModule
  ],
  entryComponents: [
    RegisterCardComponent
  ],
  providers: [
    AuthService
  ]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap(): void {
    const register_card = createCustomElement(RegisterCardComponent, {injector: this.injector});
    customElements.define('register-card', register_card);
  }
}
