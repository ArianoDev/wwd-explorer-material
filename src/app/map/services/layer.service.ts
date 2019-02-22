import { Injectable } from '@angular/core';
import { LAYERS } from '../../models/mock-data';
import { Layer } from '../../models/layer.model';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  getLayers(): Promise<Layer[]> {
    return Promise.resolve(LAYERS);
  }

  toggleLayerEnabled(id: string) {
    LAYERS
    .filter(layer => layer.id === id)
    .map(layer => {
      layer.enabled = !layer.enabled;
      layer.source.enabled = layer.enabled;
    });
  }
}
