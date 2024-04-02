import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './Header/header.component';
import { Navigation } from './Navigation/navigation.component';
import { Footer } from './Footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    Header,
    Navigation,
    Footer,
    RouterOutlet
  ],
  template: `
    <app-navigation></app-navigation>
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
}