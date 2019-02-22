import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProjectionService } from '../services/projection.service';
import { Projection } from '../../models/projection.model';

import * as ProjectionActions from '../actions/projection.actions';
import * as fromRoot from '../../reducers/index';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.css']
})
export class ProjectionComponent implements OnInit {
  projections: Projection[];
  toppings = new FormControl();
  current: Projection;

  constructor(private projService: ProjectionService, private store: Store<fromRoot.State>) {
    this.current = null;
  }

  ngOnInit() {
    console.log('[ProjectionComponent] => ngOnInit()');
    this.projService.getProjections()
      .then(projections => this.projections = projections)
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        console.log('Projection controller successfully initialized');
        this.current = this.projections[0];
        this.updateProjection(this.projections[0]);
      });
  }

  updateProjection(projection) {
    if (this.current !== projection) {
      this.current = projection;
      console.log('Dispatching event: Projection Loaded');
      this.store.dispatch(new ProjectionActions.ProjectionLoaded({ projection: this.current }));
    }
  }

}
