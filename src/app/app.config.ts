import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangService } from './services/lang.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: TranslateLoader,
      useClass: LangService
    },
    TranslateService,
    {
      provide: TranslateModule,
      useFactory: () => TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: LangService
        }
      })
    }
  ]
};
