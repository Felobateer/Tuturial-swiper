import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { Content, Slide } from '../../interfaces/content';
import Swiper from 'swiper';
import { WalkthroughService, WalkthroughText, WalkthroughModule } from 'angular-walkthrough';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [TranslateModule, WalkthroughModule],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit, OnDestroy {
  slides: Slide[] = [];
  swiper: Swiper | null = null;
  walkthroughSteps: WalkthroughText[] = [];
  private langChangeSubscription: Subscription | null = null;

  constructor(
    private langService: LangService,
    private router: Router,
    private walkthrough: WalkthroughService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.loadTranslations();

    this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  ngAfterViewInit() {
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  loadTranslations() {
    this.langService.getTranslation(this.langService.getLang()).subscribe((content: Content) => {
      this.slides = content.slides;
      // this.setupWalkthrough();
    }, error => {
      console.error('Error loading translations:', error);
    });
  }

  goToSlide(slide: Slide) {
    const index = this.slides.indexOf(slide);
    this.swiper?.slideTo(index);
  }

  // setupWalkthrough() {
  //   this.walkthroughSteps = this.slides.map((slide, index) => ({
  //     target: `.swiper-button:nth-child(${index + 1})`,
  //     content: `Go to ${slide.title}`,
  //     arrow: true,
  //     position: 'top',
  //     previous: 'Previous',
  //     next: 'Next',
  //     close: 'Close'
  //   })) as WalkthroughText[];

  //   setTimeout(() => {
  //     this.walkthrough.setSteps(this.walkthroughSteps); // Correct method name
  //     this.walkthrough.open(); // Starts the walkthrough
  //   });
  // }

  trackByFn(index: number, item: Slide) {
    return index; // or any unique identifier
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
