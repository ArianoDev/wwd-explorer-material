import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
    <app-dashboard>
      <router-outlet></router-outlet>
    </app-dashboard>
  `
})
export class AppComponent {

  opened: boolean;

  constructor() { }

}
