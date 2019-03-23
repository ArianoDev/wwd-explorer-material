"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var NavItemComponent = /** @class */ (function () {
    function NavItemComponent() {
        this.icon = '';
        this.hint = '';
        this.routerLink = '/';
        this.navigate = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input()
    ], NavItemComponent.prototype, "icon");
    __decorate([
        core_1.Input()
    ], NavItemComponent.prototype, "hint");
    __decorate([
        core_1.Input()
    ], NavItemComponent.prototype, "routerLink");
    __decorate([
        core_1.Output()
    ], NavItemComponent.prototype, "navigate");
    NavItemComponent = __decorate([
        core_1.Component({
            selector: 'app-nav-item',
            template: "\n    <a mat-list-item [routerLink]=\"routerLink\" (click)=\"navigate.emit()\">\n      <mat-icon mat-list-icon>{{ icon }}</mat-icon>\n      <span mat-line><ng-content></ng-content></span>\n      <span mat-line class=\"secondary\">{{ hint }}</span>\n    </a>\n  ",
            styles: [
                "\n      .secondary {\n        color: rgba(0, 0, 0, 0.54);\n      }\n    ",
            ]
        })
    ], NavItemComponent);
    return NavItemComponent;
}());
exports.NavItemComponent = NavItemComponent;
