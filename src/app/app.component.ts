import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'stc-peter';
  username: string; // Define the username property

  constructor(private authService: AuthService) {
    // Retrieve the username from the AuthService
    this.username = this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
  }
}
