import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-login';

  loggedIn(success: boolean) {
    if (success) {
      console.log("User logged in!");
    }
    else {
      console.log("User failed to login!");
    }
  }
}
