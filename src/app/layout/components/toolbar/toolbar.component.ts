import { Component, Output, EventEmitter } from '@angular/core';
import { IpcService } from 'src/app/services/ipc.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Output() openMenu = new EventEmitter();
  @Output() toggleSFA = new EventEmitter();

  constructor(private readonly ipc: IpcService) {

  }

  toggleLink() {
    console.log('NG-IPC: (LINK) Starting Link');
    this.ipc.send('link', true);
  }
}


