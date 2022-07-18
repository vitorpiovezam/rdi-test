import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <a routerLink="/">
        <h1> {{ title }} Restaurant's </h1>
      </a>

      <div clas="actions">
        <a routerLink="about">About</a>
        <a routerLink="admin/login">Login</a>
      </div>
    </header>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = "Vitor's";
}
