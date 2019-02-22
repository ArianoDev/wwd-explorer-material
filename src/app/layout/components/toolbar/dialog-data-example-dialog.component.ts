import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from './toolbar.component';

@Component({
    selector: 'app-dialog-data-example-dialog',
    template: `
    <div class="modal-content">
      <h1 mat-dialog-title>Favorite Animal</h1>
      <div mat-dialog-content>
        My favorite animal is:
        <ul>
          <li>
            <span *ngIf="data.animal === 'panda'">&#10003;</span> Panda
          </li>
          <li>
            <span *ngIf="data.animal === 'unicorn'">&#10003;</span> Unicorn
          </li>
          <li>
            <span *ngIf="data.animal === 'lion'">&#10003;</span> Lion
          </li>
        </ul>
      </div>
    </div>`,
})
export class DialogDataExampleDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
