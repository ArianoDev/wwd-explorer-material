import { Action } from '@ngrx/store';
import { Projection } from '../../models/projection.model';

export enum ProjectionActionTypes {
    ProjectionLoaded = '[Projcetion] Projection Loaded'
}

export class ProjectionLoaded implements Action {
    readonly type = ProjectionActionTypes.ProjectionLoaded;

    constructor(public payload: { projection: Projection }) {}
}

export type ProjectionActionsUnion = ProjectionLoaded;
