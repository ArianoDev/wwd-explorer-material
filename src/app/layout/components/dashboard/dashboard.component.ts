import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as LayoutActions from '../../actions/layout.actions';
import * as fromRoot from '../../../reducers/index';
import { TacticalSymbolDetailComponent } from '../tactical-symbol-detail/tactical-symbol-detail.component';
import { Overlay } from '@angular/cdk/overlay';
import { THREAT_LIST } from 'src/app/models/mock-data';
import { ThreatListElement } from 'src/app/models/threat-list-element';


@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showSidenav = false;

  constructor(public dialog: MatDialog, private overlay: Overlay, private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.store.pipe(select(fromRoot.getShowSidenav)).subscribe(value => {
      this.showSidenav = value;
    });

    this.store.pipe(select(fromRoot.getEditingSymbol)).subscribe(symbol => {
      this.openDialog(symbol);
    });

  }

  openSidenav() {
    console.log('Dispatching event: OpenSidenav');
    // this.store.dispatch(new LayoutActions.OpenSidenav());
  }

  /**
   * All state updates are handled through dispatched actions in 'container'
   * components. This provides a clear, reproducible history of state
   * updates and user interaction through the life of our
   * application.
   */
  closeSidenav() {
    console.log('Dispatching event: CloseSidenav');
    this.store.dispatch(new LayoutActions.CloseSidenav());
  }

  openDialog(symbol: any) {
    if (symbol) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.hasBackdrop = false;
      dialogConfig.position = {
        top: '70px',
        right: '8px'
      };
      dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
      dialogConfig.data = symbol;
      this.dialog.open(TacticalSymbolDetailComponent, dialogConfig);
    }
  }
}
