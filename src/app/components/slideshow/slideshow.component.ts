import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { Content, Slide } from '../../interfaces/content';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  slides: Slide[] = [];

  constructor(private langService: LangService) { }

  ngOnInit() {
    this.langService.getTranslation(this.langService.getLang()).subscribe((content: Content) => {
      this.slides = content.slides;
    }, error => {
      console.error('Error loading translations:', error);
    });
  }

  ngAfterViewInit() {
    new Swiper('.swiper-container', {
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

  trackByFn(index: number, item: Slide) {
    return index; // or any unique identifier
  }
}
