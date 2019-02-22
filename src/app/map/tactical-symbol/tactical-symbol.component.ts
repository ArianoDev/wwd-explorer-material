import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InputHandlerService } from '../services/input-handler.service';
import { Symbol } from 'milsymbol';
import { TacticalSymbol } from '../../models/tactica-symbol.model';
import * as WorldWind from '@nasaworldwind/worldwind';

@Component({
  selector: 'app-tactical-symbol',
  templateUrl: './tactical-symbol.component.html',
  styleUrls: ['./tactical-symbol.component.css']
})
export class TacticalSymbolComponent implements OnInit {

  @Output() symbolChanged = new EventEmitter<any>();

  symbols = [
    'SFG*UCDSS-*****',
    'SNG*UCDSS-*****',
    'SHG*UCDSS-*****',
    'SUG*UCDSV-*****',
    'SFG*UCDSV-*****',
    'SNG*UCDSV-*****',
    'SHG*UCDSV-*****',
    'SUG*UCDM--*****',
    'SFG*UCDM--*****',
    'SNG*UCDM--*****',
    'SHG*UCDM--*****',
    'SUG*UCDML-*****',
    'SFG*UCDML-*****',
    'SNG*UCDML-*****',
    'SHG*UCDML-*****',
    'SUG*UCDMLA*****',
    'SFG*UCDMLA*****',
    'SNG*UCDMLA*****',
    'SHG*UCDMLA*****'
  ];
  currentSymbol: string;
  symbolIcons = [];
  displayedSymbol;
  storage = new Array();

  constructor(private inputHandlerService: InputHandlerService) {
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
      this.symbolChanged.emit(this.createSymbol(point));
    });

    this.inputHandlerService.contextEvent.subscribe(elem => this.showContext(elem));
  }

  /**
   * Creates a new MilSymbol into the position passed as input
   * @param myPoint the {latitude, longitude} object used to set the Symbol position
   */
  private createSymbol(myPoint: any): TacticalSymbol {
    const attributes = new WorldWind.PlacemarkAttributes(null);
    attributes.imageSource = new WorldWind.ImageSource(new Symbol(this.currentSymbol).asCanvas());
    // Set up the common placemark attributes.
    attributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.3, WorldWind.OFFSET_FRACTION, 0.0);
    attributes.imageColor = WorldWind.Color.WHITE;
    attributes.labelAttributes.offset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 1.0);
    attributes.labelAttributes.color = WorldWind.Color.YELLOW;
    attributes.drawLeaderLine = true;
    attributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;

    // Create the highlight attributes for this placemark.
    const highlightAttributes = new WorldWind.PlacemarkAttributes(attributes);
    highlightAttributes.imageScale = 1.2;

    // Create Placemark object
    const myPlacemark = new WorldWind.Placemark(new WorldWind.Position(myPoint.latitude, myPoint.longitude, 1000 * 100), true, null);
    myPlacemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
    myPlacemark.attributes = attributes;
    myPlacemark.highlightAttributes = highlightAttributes;
    myPlacemark.refId = this.currentSymbol;

    // Create tacticalSymbol
    const sym: TacticalSymbol = {
      id: this.currentSymbol,
      placemark: myPlacemark,
      point: myPoint,
      isMovable: false
    };
    this.storage.push(sym);

    return sym;
  }

  getSymbol(id: string) {
    return this.storage.find(sym => sym.id === id);
  }

  showContext(elem: any): void {
    const source = this.getSymbol(elem.userObject.refId);
    if (source) {
      // open model
      console.log('[SHOW-CONTEXT] => %s', JSON.stringify(source.id));
      this.displayedSymbol = source;
    } else {
      console.log('[SHOW-CONTEXT] => no object found');
    }
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
   */
  addSymbol() {
    console.log('Start catching point');
    this.inputHandlerService.startCatchInput();
  }
}
