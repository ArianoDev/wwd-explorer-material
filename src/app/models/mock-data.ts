import * as WorldWind from '@nasaworldwind/worldwind';
import { Layer } from './layer.model';
import { Projection } from './projection.model';
import { ThreatListElement } from './threat-list-element';


/**
 * TODO: Retrieve all these from server
 */
export const LAYERS: Layer[] = [
    { source: new WorldWind.AtmosphereLayer(), id: 'ATMOSPHERE', enabled: true },
    { source: new WorldWind.StarFieldLayer(), id: 'STARS FIELD', enabled: true },
    { source: new WorldWind.BMNGLayer(), id: 'BMNG', enabled: true },
    { source: new WorldWind.BMNGLandsatLayer(), id: 'LANDSAT', enabled: false },
    { source: new WorldWind.BingAerialLayer(null), id: 'BING', enabled: false },
    { source: new WorldWind.BingAerialWithLabelsLayer(null), id: 'BINGWITHLABEL', enabled: false },
    { source: new WorldWind.BingRoadsLayer(null), id: 'BINGROADS', enabled: false },
    { source: new WorldWind.OpenStreetMapImageLayer(null), id: 'OSM', enabled: false },
    // { source: new WorldWind.CoordinatesDisplayLayer(null), id: 'COORDINATE', enabled: true },
    // { source: new WorldWind.ViewControlsLayer(null), id: 'VIEW CONTROL', enabled: true },
    // { source: new WorldWind.CompassLayer(), id: 'COMPASS', enabled: true },
    // {
    //     source: new WorldWind.RenderableLayer('3DModels'), id: '3DMODEL', enabled: true, collada: {
    //         loader: new WorldWind.ColladaLoader(new WorldWind.Position(45, -100, 10000)),
    //         init: { dirPath: './assets/3d_models/' },
    //         load: { name: 'Ruins_dae.dae', callback: (scene) => { scene.scale = 4000; } }
    //     }
    // },
    { source: new WorldWind.RenderableLayer('Symbols'), id: 'SYMBOLS', enabled: true }
];

export const PROJECTION: Projection[] = [
    { id: '3D', is2D: false, source: { displayName: '3D' } },
    { id: 'Mercartor', is2D: true, source: new WorldWind.ProjectionMercator() },
    { id: 'Equirectangular', is2D: true, source: new WorldWind.ProjectionEquirectangular() },
    { id: 'Mercator', is2D: true, source: new WorldWind.ProjectionMercator() },
    { id: 'North Polar', is2D: true, source: new WorldWind.ProjectionPolarEquidistant('North') },
    { id: 'South Polar', is2D: true, source: new WorldWind.ProjectionPolarEquidistant('South') },
    { id: 'North UPS', is2D: true, source: new WorldWind.ProjectionUPS('North') },
    { id: 'South UPS', is2D: true, source: new WorldWind.ProjectionUPS('South') },
    { id: 'North Gnomonic', is2D: true, source: new WorldWind.ProjectionGnomonic('North') },
    { id: 'South Gnomonic', is2D: true, source: new WorldWind.ProjectionGnomonic('South') },
];

export const THREAT_LIST: ThreatListElement[] = [
    { target: '1', speed: 100, class: 2 },
    { target: '2', speed: 400, class: 1 },
    { target: '3', speed: 694, class: 5 },
    { target: '4', speed: 901, class: 4 }
];

