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

  constructor(private readonly _ipc: IpcService) {
    this._ipc.on('pong', (event: Electron.IpcMessageEvent) => {
      console.log('NG-IPC: (PONG) - ', event);
    });
    console.log('NG-IPC: (PING)');
    this._ipc.send('ping');
  }

}
