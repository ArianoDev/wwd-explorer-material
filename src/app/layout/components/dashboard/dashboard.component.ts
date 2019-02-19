import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';


import * as LayoutActions from '../../actions/layout.actions';
import * as fromRoot from '../../../reducers/index';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showSidenav = false;
  showSfa$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.store.pipe(select(fromRoot.getShowSidenav)).subscribe(value => {
      this.showSidenav = value;
    });

    // this.showSfa$ = this.store.pipe(select(fromRoot.getShowSFA));
  }

  openSidenav() {
    console.log('Dispatching event: OpenSidenav');
    this.store.dispatch(new LayoutActions.OpenSidenav());
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
}
