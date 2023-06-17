import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANG_STORAGE_KEY = 'currentLanguage';
  private languageSubject: BehaviorSubject<string>;

  constructor(@Inject(LOCALE_ID) private localeId: string, @Inject(DOCUMENT) private document: Document) {
    const savedLanguage = localStorage.getItem(this.LANG_STORAGE_KEY);
    this.languageSubject = new BehaviorSubject<string>(savedLanguage || this.localeId);
    this.setHtmlDirection(savedLanguage || this.localeId);
  }

  setLanguage(language: string): void {
    this.localeId = language;
    localStorage.setItem(this.LANG_STORAGE_KEY, language);
    this.languageSubject.next(language);
    this.setHtmlDirection(language);
  }

  getLanguage(): string {
    return localStorage.getItem(this.LANG_STORAGE_KEY) || this.localeId;
  }

  get language$() {
    return this.languageSubject.asObservable();
  }

  private setHtmlDirection(language: string): void {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    this.document.documentElement.dir = dir;
  }
}
