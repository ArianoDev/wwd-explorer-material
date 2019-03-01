import * as WorldWind from '@nasaworldwind/worldwind';

/**
 *
 *
 * @export
 */
export interface TacticalSymbol {
    id: number;
    placemark: WorldWind.Placemark;
    position: {
        latitude: number,
        longitude: number
    };
    icon: string;
}

// Following an extract of possible model interface

export interface Placemark {
    attributes: PlacemarkAttributes;
    highlightAttributes: PlacemarkAttributes;
}

export interface PlacemarkAttributes {
    imageSource: any;
    imageScale: number;
    imageOffset: Offset;
    imageColor: string;
    labelAttributes: LabelAttributes;
    drawLeaderLine: boolean;
    leaderColor: string;
}

export interface Offset {
    a: number;
    b: number;
    c: number;
    d: number;
}

export interface LabelAttributes {
    offset: Offset;
    color: string;
}
