import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';
import { LanguageService } from './language.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Pipe({
  name: 'translate',
  pure: false // Set pure to false to enable re-evaluation on language change
})
export class TranslatePipe implements PipeTransform {
  private unsubscribe$ = new Subject<void>();

  constructor(private translationService: TranslationService, private languageService: LanguageService) {
    this.languageService.language$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      // When the language changes, notify the pipe to re-run
      this.unsubscribe$.next();
    });
  }

  transform(key: string): string {
    return this.translationService.translate(key);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
