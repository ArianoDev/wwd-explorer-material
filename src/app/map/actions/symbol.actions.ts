import { Action } from '@ngrx/store';
import { TacticalSymbol } from '../../models/tactica-symbol.model';

export enum SymbolActionTypes {
    SymbolLoaded = '[Symbol] Symbol Created'
}

export class SymbolCreated implements Action {
    readonly type = SymbolActionTypes.SymbolLoaded;

    constructor(public payload: { symbol: TacticalSymbol }) {}
}

export type SymbolActionsUnion = SymbolCreated;
