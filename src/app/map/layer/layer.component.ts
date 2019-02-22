import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Layer } from '../../models/layer.model';
import { LayerService } from '../services/layer.service';


@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css']
})
export class LayerComponent implements OnInit {

  @Output() layersChanged = new EventEmitter<any>();

  layers: Layer[];
  layersModel = {};

  constructor(private layerService: LayerService) { }

  ngOnInit() {
    console.log('[LayerComponent] => ngOnInit()');
    this.layerService.getLayers()
      .then(layers => {
        this.layers = layers;
        this.layers.forEach(layer => {
          this.layersModel[layer.id] = layer.enabled;
          layer.source.enabled = layer.enabled;
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
        });
        console.log('Layer controller successfully initialized => ' + JSON.stringify(this.layersModel));
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Update the layer state for the selected layer.
  onLayerClick(layerID) {
    this.layerService.toggleLayerEnabled(layerID);
  }
}
