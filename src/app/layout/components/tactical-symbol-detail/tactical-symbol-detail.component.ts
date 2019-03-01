import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TacticalSymbol } from 'src/app/models/tactica-symbol.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import * as SymbolActions from '../../../map/actions/symbol.actions';


@Component({
  selector: 'app-tactical-symbol-detail',
  templateUrl: './tactical-symbol-detail.component.html',
  styleUrls: ['./tactical-symbol-detail.component.less']
})
export class TacticalSymbolDetailComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>, @Inject(MAT_DIALOG_DATA) public symbol: TacticalSymbol) { }

  ngOnInit() {
  }

  handleClose() {
    this.store.dispatch(new SymbolActions.SymbolEdit(null));
  }
}
