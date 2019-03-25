import { Component } from '@angular/core';
import { IpcService } from 'src/app/services/ipc.service';


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

  constructor(private readonly ipc: IpcService) { }

}
