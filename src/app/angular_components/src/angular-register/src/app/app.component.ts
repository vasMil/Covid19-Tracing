import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-register';

  onSuccessfulRegister(success: boolean): void {
    if (success) {
      console.log("User registered successfully!");
    }
    else {
      console.log("User failed to register!");
    }
  }
}
