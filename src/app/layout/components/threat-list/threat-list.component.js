"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var mock_data_1 = require("src/app/models/mock-data");
var ThreatListComponent = /** @class */ (function () {
    function ThreatListComponent() {
        var _this = this;
        this.threatList = [];
        this.threatListColumns = ['target', 'speed', 'class'];
        Promise.resolve(mock_data_1.THREAT_LIST)
            .then(function (list) { return _this.threatList = list; })["catch"](function (err) { return console.log('Error catched retrieving the Threat List: %s', err); });
    }
    ThreatListComponent.prototype.ngOnInit = function () {
    };
    ThreatListComponent = __decorate([
        core_1.Component({
            selector: 'app-threat-list',
            templateUrl: './threat-list.component.html',
            styleUrls: ['../dashboard/dashboard.component.css']
        })
    ], ThreatListComponent);
    return ThreatListComponent;
}());
exports.ThreatListComponent = ThreatListComponent;
