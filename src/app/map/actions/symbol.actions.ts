import { Action } from '@ngrx/store';
import { TacticalSymbol } from '../../models/tactica-symbol.model';

export enum SymbolActionTypes {
    SymbolLoaded = '[Symbol] Symbol Created',
    EditingSymbol = '[Symbol] Editing Symbol',
    SymbolChanged = '[Symbol] Symbol Changed'
}

export class SymbolCreated implements Action {
    readonly type = SymbolActionTypes.SymbolLoaded;

    constructor(public payload: TacticalSymbol) {}
}

export class SymbolEdit implements Action {
    readonly type = SymbolActionTypes.EditingSymbol;
    constructor(public payload: TacticalSymbol) {}
}

export class SymbolChanged implements Action {
    readonly type = SymbolActionTypes.SymbolChanged;
    constructor(public payload: TacticalSymbol) {}
}

export type SymbolActionsUnion = SymbolCreated | SymbolEdit | SymbolChanged;
