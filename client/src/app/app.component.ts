import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="root">
      <div class="nav-bar">
        <nav-toolbar></nav-toolbar>
      </div>
      <div class="root-body">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
