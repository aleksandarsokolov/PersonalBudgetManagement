import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{pageTitle}}</a>
    <ul class='nav navbar-nav'>
      <li><a class='nav-link' [routerLink]="['/welcome']">Home</a></li>
      <li><a class='nav-link' [routerLink]="['/products']">Product List</a></li>
    </ul>
  </nav>
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle: string = 'Personal Budget Management';
}