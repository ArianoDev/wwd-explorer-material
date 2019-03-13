import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TacticalSymbol } from 'src/app/models/tactica-symbol.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import * as SymbolActions from '../../../map/actions/symbol.actions';
import { Category } from 'src/app/models/enum/Category';
import { OpCapability } from 'src/app/models/enum/op-capapability';
import { Symbol } from 'milsymbol';
import { Formatter } from 'src/app/map/services/formatter';


@Component({
  selector: 'app-tactical-symbol-detail',
  templateUrl: './tactical-symbol-detail.component.html',
  styleUrls: ['./tactical-symbol-detail.component.less']
})
export class TacticalSymbolDetailComponent implements OnInit {

  private categories: SelectModel[] = [];
  private capabilities: SelectModel[] = [];
  private icon;

  constructor(private store: Store<fromRoot.State>, @Inject(MAT_DIALOG_DATA) public symbol: TacticalSymbol, private formatter: Formatter) {
    console.log('[SYMBOLDETAIL] => Constructor');
    this.icon = new Symbol(symbol.icon, { size: 18 }).asSVG();
  }

  ngOnInit() {
    console.log('[SYMBOLDETAIL] => ngOnInit');
    for (const item in Category) {
      if (isNaN(Number(item))) {
        this.categories.push({ value: Category[item], viewValue: Category[item] });
      }
    }

    for (const item in OpCapability) {
      if (isNaN(Number(item))) {
        this.capabilities.push({ value: OpCapability[item], viewValue: OpCapability[item] });
      }
    }
  }

  handleClose() {
    this.store.dispatch(new SymbolActions.SymbolEdit(null));
  }
}

export interface SelectModel {
  value: string;
  viewValue: string;
}

