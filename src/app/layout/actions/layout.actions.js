"use strict";
exports.__esModule = true;
var LayoutActionTypes;
(function (LayoutActionTypes) {
    LayoutActionTypes["OpenSidenav"] = "[Layout] Open Sidenav";
    LayoutActionTypes["CloseSidenav"] = "[Layout] Close Sidenav";
    LayoutActionTypes["OpenSFA"] = "[Layout] Open SFA";
    LayoutActionTypes["CloseSFA"] = "[Layout] Close SFA";
})(LayoutActionTypes = exports.LayoutActionTypes || (exports.LayoutActionTypes = {}));
var OpenSidenav = /** @class */ (function () {
    function OpenSidenav() {
        this.type = LayoutActionTypes.OpenSidenav;
    }
    return OpenSidenav;
}());
exports.OpenSidenav = OpenSidenav;
var CloseSidenav = /** @class */ (function () {
    function CloseSidenav() {
        this.type = LayoutActionTypes.CloseSidenav;
    }
    return CloseSidenav;
}());
exports.CloseSidenav = CloseSidenav;
var OpenSFA = /** @class */ (function () {
    function OpenSFA() {
        this.type = LayoutActionTypes.OpenSFA;
    }
    return OpenSFA;
}());
exports.OpenSFA = OpenSFA;
var CloseSFA = /** @class */ (function () {
    function CloseSFA() {
        this.type = LayoutActionTypes.CloseSFA;
    }
    return CloseSFA;
}());
exports.CloseSFA = CloseSFA;
