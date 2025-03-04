import { Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { SwiperPageComponent } from './pages/swiper-page/swiper-page.component';

export const routes: Routes = [
    {path: '', component: StartPageComponent},
    {path: 'slideshow', component: SwiperPageComponent},
];
