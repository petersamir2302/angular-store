import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  title = 'stc-peter';
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.username$.subscribe((username: string) => {
      this.username = username;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
