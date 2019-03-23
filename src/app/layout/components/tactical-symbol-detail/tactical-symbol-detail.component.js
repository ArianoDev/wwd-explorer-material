"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var SymbolActions = require("../../../map/actions/symbol.actions");
var category_1 = require("src/app/models/enum/category");
var op_capapability_1 = require("src/app/models/enum/op-capapability");
var milsymbol_1 = require("milsymbol");
var TacticalSymbolDetailComponent = /** @class */ (function () {
    function TacticalSymbolDetailComponent(store, symbol, formatter) {
        this.store = store;
        this.symbol = symbol;
        this.formatter = formatter;
        this.categories = [];
        this.capabilities = [];
        console.log('[SYMBOLDETAIL] => Constructor');
        this.icon = new milsymbol_1.Symbol(symbol.icon, { size: 18 }).asSVG();
    }
    TacticalSymbolDetailComponent.prototype.ngOnInit = function () {
        console.log('[SYMBOLDETAIL] => ngOnInit');
        for (var item in category_1.Category) {
            if (isNaN(Number(item))) {
                this.categories.push({ value: category_1.Category[item], viewValue: category_1.Category[item] });
            }
        }
        for (var item in op_capapability_1.OpCapability) {
            if (isNaN(Number(item))) {
                this.capabilities.push({ value: op_capapability_1.OpCapability[item], viewValue: op_capapability_1.OpCapability[item] });
            }
        }
    };
    TacticalSymbolDetailComponent.prototype.handleClose = function () {
        this.store.dispatch(new SymbolActions.SymbolEdit(null));
    };
    TacticalSymbolDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-tactical-symbol-detail',
            templateUrl: './tactical-symbol-detail.component.html',
            styleUrls: ['./tactical-symbol-detail.component.less']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], TacticalSymbolDetailComponent);
    return TacticalSymbolDetailComponent;
}());
exports.TacticalSymbolDetailComponent = TacticalSymbolDetailComponent;
