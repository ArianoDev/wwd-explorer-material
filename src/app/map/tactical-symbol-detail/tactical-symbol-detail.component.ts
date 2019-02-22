import { Component, OnInit, Input } from '@angular/core';
import { TacticalSymbol } from '../../models/tactica-symbol.model';

@Component({
  selector: 'app-tactical-symbol-detail',
  templateUrl: './tactical-symbol-detail.component.html',
  styleUrls: ['./tactical-symbol-detail.component.less']
})
export class TacticalSymbolDetailComponent implements OnInit {

  @Input() symbol: TacticalSymbol;

  constructor() { }

  ngOnInit() {
  }

}
