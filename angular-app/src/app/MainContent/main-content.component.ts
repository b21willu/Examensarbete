import { Component } from '@angular/core';
import { Header } from '../Header/header.component'
import { Navigation } from '../Navigation/navigation.component'
import { Footer } from '../Footer/footer.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [  
    Header,
    Navigation,
    Footer
  ],
  template: `
    <main>
      <app-navigation></app-navigation>
      <app-header></app-header>
      <app-footer></app-footer>
    </main>
  `,
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent {}