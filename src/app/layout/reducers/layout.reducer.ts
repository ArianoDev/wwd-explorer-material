import { LayoutActionTypes, LayoutActionsUnion } from '../actions/layout.actions';

export interface LayoutState {
    showSidenav: boolean;
    showSFA: boolean;
}

const initialState: LayoutState = {
    showSidenav: false, showSFA: false
};

export function reducer(state: LayoutState = initialState, action: LayoutActionsUnion): LayoutState {
    switch (action.type) {
        case LayoutActionTypes.CloseSidenav:
            return { showSidenav: false, showSFA: state.showSFA };
        case LayoutActionTypes.OpenSidenav:
            return { showSidenav: true, showSFA: state.showSFA };
        case LayoutActionTypes.OpenSFA:
            return { showSidenav: state.showSidenav, showSFA: true };
        case LayoutActionTypes.CloseSFA:
            return { showSidenav: state.showSidenav, showSFA: false };
        default:
            return state;
    }
}

export const getShowSidenav = (state: LayoutState) => state.showSidenav;

export const getShowSFA = (state: LayoutState) => state.showSFA;
