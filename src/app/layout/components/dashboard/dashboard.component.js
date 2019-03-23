"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var store_1 = require("@ngrx/store");
var LayoutActions = require("../../actions/layout.actions");
var fromRoot = require("../../../reducers/index");
var tactical_symbol_detail_component_1 = require("../tactical-symbol-detail/tactical-symbol-detail.component");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dialog, overlay, store) {
        var _this = this;
        this.dialog = dialog;
        this.overlay = overlay;
        this.store = store;
        this.showSidenav = false;
        /**
         * Selectors can be applied with the `select` operator which passes the state
         * tree to the provided selector
         */
        this.store.pipe(store_1.select(fromRoot.getShowSidenav)).subscribe(function (value) {
            _this.showSidenav = value;
        });
        this.store.pipe(store_1.select(fromRoot.getEditingSymbol)).subscribe(function (symbol) {
            _this.openDialog(symbol);
        });
    }
    DashboardComponent.prototype.openSidenav = function () {
        console.log('Dispatching event: OpenSidenav');
        // this.store.dispatch(new LayoutActions.OpenSidenav());
    };
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    DashboardComponent.prototype.closeSidenav = function () {
        console.log('Dispatching event: CloseSidenav');
        this.store.dispatch(new LayoutActions.CloseSidenav());
    };
    DashboardComponent.prototype.openDialog = function (symbol) {
        if (symbol) {
            var dialogConfig = new material_1.MatDialogConfig();
            dialogConfig.hasBackdrop = false;
            dialogConfig.position = {
                top: '70px',
                right: '8px'
            };
            dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
            dialogConfig.data = symbol;
            this.dialog.open(tactical_symbol_detail_component_1.TacticalSymbolDetailComponent, dialogConfig);
        }
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
