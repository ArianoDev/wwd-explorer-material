import { Projection } from '../../models/projection.model';
import { ProjectionActionsUnion, ProjectionActionTypes } from '../actions/projection.actions';
import { TacticalSymbol } from 'src/app/models/tactica-symbol.model';
import { SymbolActionsUnion, SymbolActionTypes } from '../actions/symbol.actions';

export interface ProjectionState {
    projection: Projection;
}

export interface SymbolState {
    symbol: TacticalSymbol;
}

const initialProjState: ProjectionState = {
    projection: null
};
const initialSymbolState: SymbolState = {
    symbol: null
};

export function projectionReducer(state: ProjectionState = initialProjState, action: ProjectionActionsUnion): ProjectionState {
    switch (action.type) {
        case ProjectionActionTypes.ProjectionLoaded:
            return state = { projection: action.payload.projection };
        default: return state;
    }
}
export function symbolReducer(state: SymbolState = initialSymbolState, action: SymbolActionsUnion): SymbolState {
    switch (action.type) {
        case SymbolActionTypes.SymbolLoaded:
            return state = { symbol: action.payload.symbol };
        default: return state;
    }
}

export const getProjection = (state: ProjectionState) => state.projection;
export const getSymbol = (state: SymbolState) => state.symbol;




