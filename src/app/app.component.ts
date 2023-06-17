import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  title = 'stc-peter';
  username: string = '';

  constructor(
    private authService: AuthService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.authService.username$.subscribe((username: string) => {
      this.username = username;
    });

    this.languageService.language$.subscribe((language: string) => {
      // Set the HTML direction based on the selected language
    });
  }

  logout(): void {
    this.authService.logout();
  }

  changeLanguage(): void {
    const currentLang = this.languageService.getLanguage();
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.languageService.setLanguage(newLang);
  }
}
