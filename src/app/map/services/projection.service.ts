import { Injectable } from '@angular/core';
import { PROJECTION } from '../../models/mock-data';
import { Projection } from '../../models/projection.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {

  getProjections(): Promise<Projection[]> {
    return Promise.resolve(PROJECTION);
  }
}
