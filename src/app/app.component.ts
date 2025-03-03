import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlideshowComponent } from './components/slideshow/slideshow.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SlideshowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'milestone_1';
}
