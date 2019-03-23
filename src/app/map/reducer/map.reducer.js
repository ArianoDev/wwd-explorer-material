"use strict";
exports.__esModule = true;
var projection_actions_1 = require("../actions/projection.actions");
var symbol_actions_1 = require("../actions/symbol.actions");
var initialProjState = {
    projection: null
};
var initialSymbolState = {
    loaded: null,
    editing: null
};
function projectionReducer(state, action) {
    if (state === void 0) { state = initialProjState; }
    switch (action.type) {
        case projection_actions_1.ProjectionActionTypes.ProjectionLoaded:
            return state = { projection: action.payload.projection };
        default: return state;
    }
}
exports.projectionReducer = projectionReducer;
function symbolReducer(state, action) {
    if (state === void 0) { state = initialSymbolState; }
    switch (action.type) {
        case symbol_actions_1.SymbolActionTypes.SymbolLoaded:
            return state = { loaded: action.payload, editing: state.editing };
        case symbol_actions_1.SymbolActionTypes.EditingSymbol:
            return state = { loaded: state.loaded, editing: action.payload };
        default: return state;
    }
}
exports.symbolReducer = symbolReducer;
exports.getProjection = function (state) { return state.projection; };
exports.getSymbolLoaded = function (state) { return state.loaded; };
exports.getSymbolEditing = function (state) { return state.editing; };
