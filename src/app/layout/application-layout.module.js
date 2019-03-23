"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var app_component_1 = require("./containers/app.component");
// import { NotFoundPageComponent } from './containers/not-found-page.component';
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var toolbar_component_1 = require("./components/toolbar/toolbar.component");
var material_module_1 = require("../material/material.module");
var nav_item_component_1 = require("./components/sidenav/nav-item.component");
var map_module_1 = require("../map/map.module");
var tactical_symbol_detail_component_1 = require("./components/tactical-symbol-detail/tactical-symbol-detail.component");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var threat_list_component_1 = require("./components/threat-list/threat-list.component");
var engagement_list_component_1 = require("./components/engagement-list/engagement-list.component");
exports.COMPONENTS = [
    app_component_1.AppComponent,
    // NotFoundPageComponent,
    toolbar_component_1.ToolbarComponent,
    nav_item_component_1.NavItemComponent,
    dashboard_component_1.DashboardComponent,
    tactical_symbol_detail_component_1.TacticalSymbolDetailComponent,
    threat_list_component_1.ThreatListComponent,
    engagement_list_component_1.EngagementListComponent
];
var ApplicationLayoutModule = /** @class */ (function () {
    function ApplicationLayoutModule() {
    }
    ApplicationLayoutModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                material_module_1.MaterialModule,
                map_module_1.MapModule,
                forms_1.FormsModule,
                material_1.MatTabsModule
            ],
            declarations: exports.COMPONENTS,
            exports: exports.COMPONENTS,
            entryComponents: [tactical_symbol_detail_component_1.TacticalSymbolDetailComponent]
        })
    ], ApplicationLayoutModule);
    return ApplicationLayoutModule;
}());
exports.ApplicationLayoutModule = ApplicationLayoutModule;
