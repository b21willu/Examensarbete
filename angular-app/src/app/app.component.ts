import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContentComponent } from './MainContent/main-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MainContentComponent
  ],
  template: `
  <main>
    <app-home></app-home>
  </main>
`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
}
