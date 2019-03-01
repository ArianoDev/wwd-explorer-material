import { Injectable } from '@angular/core';
import * as WorldWind from '@nasaworldwind/worldwind';
import { Symbol } from 'milsymbol';



@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  getSymbol(id: number, icon: string, position: any): Promise<WorldWind.Placemark[]> {
    const attributes = new WorldWind.PlacemarkAttributes(null);
    attributes.imageSource = new WorldWind.ImageSource(new Symbol(icon).asCanvas());
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
    const placemark = new WorldWind.Placemark(new WorldWind.Position(position.latitude, position.longitude, 1000 * 100), true, null);
    placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
    placemark.attributes = attributes;
    placemark.highlightAttributes = highlightAttributes;
    placemark.refId = id;
    placemark.showContextMenu = () => { console.log('QUI CI POSSO FARE QUALCOSA!!'); };

    return Promise.resolve(placemark);
  }
}
