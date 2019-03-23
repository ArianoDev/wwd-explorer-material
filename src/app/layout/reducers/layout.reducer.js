"use strict";
exports.__esModule = true;
var layout_actions_1 = require("../actions/layout.actions");
var initialState = {
    showSidenav: false, showSFA: false
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case layout_actions_1.LayoutActionTypes.CloseSidenav:
            return { showSidenav: false, showSFA: state.showSFA };
        case layout_actions_1.LayoutActionTypes.OpenSidenav:
            return { showSidenav: true, showSFA: state.showSFA };
        case layout_actions_1.LayoutActionTypes.OpenSFA:
            return { showSidenav: state.showSidenav, showSFA: true };
        case layout_actions_1.LayoutActionTypes.CloseSFA:
            return { showSidenav: state.showSidenav, showSFA: false };
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.getShowSidenav = function (state) { return state.showSidenav; };
exports.getShowSFA = function (state) { return state.showSFA; };
