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

  constructor(private readonly ipc: IpcService) {
    this.ipc.on('pong', (event: Electron.IpcMessageEvent, args) => {
      console.log('NG-IPC: (PONG) - ', args);
    });
    console.log('NG-IPC: (PING)');
    this.ipc.send('ping');
  }

}
