import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.username, this.password)
      .then(() => {
        // Handle successful login
        console.log('Login successful');
      })
      .catch((error: any) => {
        // Handle login error
        console.error(error);
      });
  }
}
