import { Injectable } from '@angular/core';
import * as WorldWind from '@nasaworldwind/worldwind';
import { Symbol, SymbolOptions } from 'milsymbol';
import { TacticalSymbol } from 'src/app/models/tactica-symbol.model';
import { UnitType } from 'src/app/models/enum/unit-type';



@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  private AIRTRACK_ICON = 'SPAPMFF-----';
  private SYM_OPT: SymbolOptions = {size: 25};

  getPlacemark(id: number, icon: string, position: any): Promise<WorldWind.Placemark[]> {
    const attributes = new WorldWind.PlacemarkAttributes(null);

    attributes.imageSource = new WorldWind.ImageSource(new Symbol(icon, this.SYM_OPT).asCanvas());
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

  getSymbolIcon(symbol: TacticalSymbol): string {
    let icon = 'S' + symbol.category + 'G' + symbol.opCapability;
    if (symbol.type === UnitType.S) {
      icon += 'UCDS---F';
    } else if (symbol.type === UnitType.E) {
      icon += 'UCDS---E';
    } else if (symbol.type === UnitType.G) {
      icon += 'UCDG---E';
    } else {
      icon += 'UCDM---E';
    }
    return icon;
  }

  getAirTrack(track: any) {
    const attributes = new WorldWind.PlacemarkAttributes(null);
    attributes.imageSource = new WorldWind.ImageSource(new Symbol(this.AIRTRACK_ICON,  this.SYM_OPT).asCanvas());
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
    const placemark = new WorldWind.Placemark(new WorldWind.Position(track.latitude, track.longitude, track.altitude), true, null);
    // placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
    placemark.attributes = attributes;
    placemark.highlightAttributes = highlightAttributes;
    placemark.refId = track.id;
    placemark.showContextMenu = () => { console.log('AIRTRACK - QUI CI POSSO FARE QUALCOSA!!'); };

    return placemark;
    // return Promise.resolve(placemark);
  }

  getAirTracks(tracks: any) {
    const airtracks = [];
    tracks.filter(track => track !== undefined).map(track => this.getAirTrack(track)).forEach(track => airtracks.push(track));
    return Promise.resolve(airtracks);
    

  }
}
