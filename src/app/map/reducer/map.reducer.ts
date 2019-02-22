import { Projection } from '../../models/projection.model';
import { ProjectionActionsUnion, ProjectionActionTypes } from '../actions/projection.actions';

export interface ProjectionState {
    projection: Projection;
}

const initialState: ProjectionState = {
    projection: null
};

export function reducer(state: ProjectionState = initialState, action: ProjectionActionsUnion): ProjectionState {
    switch (action.type) {
        case ProjectionActionTypes.ProjectionLoaded:
            return state = { projection: action.payload.projection };
        default: return state;
    }
}

export const getProjection = (state: ProjectionState) => state.projection;
