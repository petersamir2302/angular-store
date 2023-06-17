import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
    constructor(private languageService: LanguageService) {}
    private translations: Record<string, Record<string, string>> = {
      en: {
        'productCategories': 'Product Categories',
        'companyStore': 'Company Store',
        'greeting': 'Hi,',
        'login': 'Login',
        'username': 'Username',
        'password': 'Password',
        'productDashboard': 'Product Dashboard',
        'addProduct': 'Add Product',
        'title': 'Title',
        'description': 'Description',
        'price': 'Price',
        'actions': 'Actions',
        'cancel': 'Cancel',
        'save': 'Save'
      },
      ar: {
        'productCategories': 'فئات المنتجات',
        'companyStore': 'متجر الشركة',
        'greeting': 'مرحبًا،',
        'login': 'تسجيل الدخول',
        'username': 'اسم المستخدم',
        'password': 'كلمة المرور',
        'productDashboard': 'لوحة المنتجات',
        'addProduct': 'إضافة منتج',
        'title': 'العنوان',
        'description': 'الوصف',
        'price': 'السعر',
        'actions': 'الإجراءات',
        'cancel': 'إلغاء',
        'save': 'حفظ'
      }
    };
    

  translate(key: string): string {
    const lang = this.languageService.getLanguage();
    if (this.translations[lang] && this.translations[lang][key]) {
      return this.translations[lang][key];
    }
    return key; // Return the untranslated key if translation is not found
  }
}
