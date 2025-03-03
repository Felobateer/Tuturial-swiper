import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';
import { Content } from '../interfaces/content';

@Injectable({
  providedIn: 'root'
})
export class LangService implements TranslateLoader {
  private lang: string;

  constructor() {
    this.lang = 'en';
  }

  setLang(lang: string) {
    this.lang = lang;
  }

  getLang() {
    return this.lang;
  }

  getTranslation(lang: string): Observable<Content> {
    return new Observable(observer => {
      import(`../../assets/i18n/${lang}.json`).then(translation => {
        observer.next(translation.default);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}
