"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var clases;
(function (clases) {
    var empleado = /** @class */ (function (_super) {
        __extends(empleado, _super);
        function empleado(nombre, apellido, edad, legajo, turno) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.legajo = legajo;
            _this.turno = turno;
            return _this;
        }
        empleado.prototype.toJSON = function () {
            var json = _super.prototype.toJSON.call(this) + (",\"legajo\":\"" + this.legajo + "\",\"turno\":\"" + this.legajo + "\"}");
            return json;
        };
        return empleado;
    }(clases.persona));
    clases.empleado = empleado;
})(clases || (clases = {}));
