import * as WorldWind from '@nasaworldwind/worldwind';
import { OpCapability } from './enum/op-capapability';
import { Category } from './enum/category';
import { UnitType } from './enum/unit-type';

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
    category: Category;
    opCapability: OpCapability;
    type: UnitType;
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
