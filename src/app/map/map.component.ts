import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as WorldWind from '@nasaworldwind/worldwind';
import { InputHandlerService } from './services/input-handler.service';
import { TacticalSymbol } from '../models/tactica-symbol.model';
import { LayerService } from './services/layer.service';

import * as fromRoot from '../reducers/index';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('scene') scene: ElementRef;

  wwd: WorldWind.WorldWindow;
  globe: WorldWind.Globe;
  roundGlobe: WorldWind.Globe;
  flatGlobe: WorldWind.Globe2D;
  position: string;
  pickedElem = null;

  constructor(private layerService: LayerService, private inputHandlerService: InputHandlerService, private store: Store<fromRoot.State>) {
    this.roundGlobe = new WorldWind.Globe(new WorldWind.EarthElevationModel());
    this.flatGlobe = new WorldWind.Globe2D();

    this.store.pipe(select(fromRoot.getProjection)).subscribe(projection => {
      if (projection) {
        if (!projection.is2D) {
          this.updateGlobe(this.roundGlobe);
        } else {
          this.flatGlobe.projection = projection.source;
          this.updateGlobe(this.flatGlobe);
        }
      }
    });
  }

  ngOnInit(): void {
    console.log('[AppComponent] => ngOnInit()');
    this.layerService.getLayers()
      .then(layers => {
        layers.forEach(layer => {
          if (layer.collada) {
            // Create a Collada loader and direct it to the desired directory and .dae file.
            const colladaLoader = layer.collada.loader;
            colladaLoader.init(layer.collada.init);
            colladaLoader.load(layer.collada.load.name, (scene) => {
              layer.collada.load.callback(scene);
              // Add the Collada model to the renderable layer within a callback.
              layer.source.addRenderable(scene);
            });
          }
          // add Layer to WWD
          this.wwd.addLayer(layer.source);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngAfterViewInit() {
    console.log('[AppComponent] => ngAfterViewInit()');
    // Initialize WorldWind object
    this.wwd = new WorldWind.WorldWindow('scene');

    // TODO: move these params into config file
    this.wwd.navigator.lookAtLocation.latitude = 41.899046;
    this.wwd.navigator.lookAtLocation.longitude = 12.468737;
    this.wwd.navigator.range = 14000000;

    // add default layers
    this.wwd.addLayer(new WorldWind.BMNGOneImageLayer());
    this.wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(this.wwd));
    this.wwd.addLayer(new WorldWind.ViewControlsLayer(this.wwd));

    // Listen for mouse
    // Listen for mouse down to select an item
    this.wwd.addEventListener('mousedown', event => {
      this.eventListener(event);
    });
    // Listen for mouse moves and tap gestures to move an item
    this.wwd.addEventListener('mousemove', event => {
      this.eventListener(event);
    });
    // Listen for mouse up to release an item
    this.wwd.addEventListener('mouseup', event => {
      this.eventListener(event);
    });
    // Listen for touch
    this.wwd.addEventListener('touchstart', event => {
      this.eventListener(event);
    });
    this.wwd.addEventListener('touchmove', event => {
      this.eventListener(event);
    });
    this.wwd.addEventListener('touchend', event => {
      this.eventListener(event);
    });
    // Listen for mouse clicks
    // Listen for single clicks to select an item
    this.wwd.addEventListener('click', event => {
      this.eventListener(event);
    });
    // Listen for double clicks to open an item
    this.wwd.addEventListener('dblclick', event => {
      this.eventListener(event);
    });
    // Listen for right clicks to open menu
    this.wwd.addEventListener('contextmenu', event => {
      this.eventListener(event);
    });

    this.wwd.redraw();
  }


  eventListener(event) {
    if (this.inputHandlerService) {
      const redrawRequired = this.inputHandlerService.handleEvent(event);
      // Update the window if we changed anything.
      if (redrawRequired) {
        this.wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
      }
    }
  }


  // Update the layer state for the selected layer.
  updateLayers(evt) {
    if (evt.id === 'layers-updated') {
      // redraw wwd
      this.wwd.redraw();
    }
  }

  updateGlobe(globe) {
    // update globe
    this.wwd.globe = globe;
    // trigger redraw
    this.wwd.redraw();
  }

  symbolChanged(tacticalSymbol: TacticalSymbol) {
    console.log('[AppComponent] => symbolChanged()');
    if (tacticalSymbol) {
      this.wwd.layers
        .filter(layer => layer.displayName === 'Symbols')
        .map(layer => {
          layer.addRenderable(tacticalSymbol.placemark);
        });
    }
  }

  flyTo() {
    try {
      // Obtain geographic position to redirect WorldWindow camera view.
      if (this.position) {
        // arg format is "pos=lat,lon,alt"
        const points = this.position.split(',');
        const lat = parseFloat(points[0]);
        const lon = parseFloat(points[1]);
        const alt = parseFloat(points[2]) * 1000;
        const goTo = new WorldWind.Position(lat, lon, alt);
        // Now move the view to the requested position.
        if (goTo) {
          this.wwd.goTo(goTo);
        }
      }
    } catch (err) {
      console.log('Unknow format for Position (' + this.position + '). Please enter Lat, Lon; Alt');
    }
  }

}
