import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WalkthroughModule } from 'angular-walkthrough';
import { Content, Slide } from '../../interfaces/content';
import { Subscription } from 'rxjs';
import { LangService } from '../../services/lang.service';
import { Router } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-swiper-page',
  standalone: true,
  imports: [TranslateModule, WalkthroughModule],
  templateUrl: './swiper-page.component.html',
  styleUrls: ['./swiper-page.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperPageComponent implements OnInit {
  slides: Slide[] = [];
  private langChangeSub: Subscription | null = null;

  constructor(
    private langService: LangService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.loadTranslations();

    this.langChangeSub = this.translateService.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  goSlide() {
    this.router.navigate(['/']);
  }

  loadTranslations() {
    this.langService.getTranslation(this.langService.getLang()).subscribe((content: Content) => {
      this.slides = content.slides;
    });
  }

  trackByFn(index: number, item: Slide) {
    return index;
  }
}
