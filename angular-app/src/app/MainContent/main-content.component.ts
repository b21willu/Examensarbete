import { Component } from '@angular/core';
import { Header } from '../Header/header.component'
import { Navigation } from '../Navigation/navigation.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [  
    Header,
    Navigation
  ],
  template: `
    <main>
      <app-navigation></app-navigation>
      <app-header></app-header>
    </main>
  `,
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent {}