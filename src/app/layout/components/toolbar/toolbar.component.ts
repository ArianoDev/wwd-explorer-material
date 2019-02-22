import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogDataExampleDialogComponent } from './dialog-data-example-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Output() openMenu = new EventEmitter();
  @Output() toggleSFA = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.hasBackdrop = false;
    dialogConfig.position = {
      top: '64px',
      right: '0'
    };
    dialogConfig.data = { animal: 'panda' };
    this.dialog.open(DialogDataExampleDialogComponent, dialogConfig);
  }
}


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


