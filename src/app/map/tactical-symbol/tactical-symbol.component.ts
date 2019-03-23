import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InputHandlerService } from '../services/input-handler.service';
import { Symbol } from 'milsymbol';

import { Store } from '@ngrx/store';
import * as SymbolActions from '../actions/symbol.actions';
import * as fromRoot from '../../reducers/index';
import { Category } from 'src/app/models/enum/category';
import { OpCapability } from 'src/app/models/enum/op-capapability';
import { UnitType } from 'src/app/models/enum/unit-type';

@Component({
  selector: 'app-tactical-symbol',
  templateUrl: './tactical-symbol.component.html',
  styleUrls: ['./tactical-symbol.component.css']
})
export class TacticalSymbolComponent implements OnInit {

  @Output() symbolChanged = new EventEmitter<any>();

  symbols = [
    'SFGPUCDS---F',
    'SFGPUCDS---E',
    'SFGPUCDG---E',
    'SFGPUCDM---E'
  ];
  currentSymbol: string;
  symbolIcons = [];
  displayedSymbol;
  storage = new Array();

  constructor(private inputHandlerService: InputHandlerService, private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.currentSymbol = this.symbols[0];
    this.symbols.forEach(symbol => {
      this.symbolIcons.push(
        {
          id: symbol,
          icon: new Symbol(symbol, { size: 25 }).asSVG()
        }
      );
    });

    this.inputHandlerService.inputEvent.subscribe(point => {
      console.log('Point catched is: %s - Symbol (%s)', JSON.stringify(point), this.currentSymbol);
      const symbol = {
        id: Math.floor(Math.random() * 1000),
        placemark: null,
        position: point,
        icon: this.currentSymbol,
        category: Category.F,
        opCapability: OpCapability.C,
        type: UnitType.S
      };
      this.storage.push(symbol);
      console.log('Dispatching event: Add Symbol');
      this.store.dispatch(new SymbolActions.SymbolCreated(symbol));
    });

    this.inputHandlerService.contextEvent.subscribe(elem => {
      const source = this.getSymbol(elem.userObject.refId);
      if (source) {
        console.log('[SHOW-CONTEXT] => %s', JSON.stringify(source.id));
        this.store.dispatch(new SymbolActions.SymbolEdit(source));
      } else {
        console.log('[SHOW-CONTEXT] => no object found');
      }
    });
  }

  getSymbol(id: number) {
    return this.storage.find(symbol => symbol.id === id);
  }

  /**
   * Save the last MilSymbol selected
   * @param symbolId The MilSymbol ID
   */
  selectSymbol(symbolId) {
    this.currentSymbol = symbolId;
  }

  /**
   * Invokes the Input Handler Service
   * in order catch the point on map.
   * @param symbolId The MilSymbol ID
   */
  addSymbol(symbolId) {
    this.currentSymbol = symbolId;
    console.log('Start catching point');
    this.inputHandlerService.startCatchInput();
  }

}
