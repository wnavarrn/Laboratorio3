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
/// <reference path="./Persona.ts" />
var Clases;
(function (Clases) {
    var Empleado = (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, edad, legajo, horario) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.legajo = legajo;
            _this.horario = horario;
            return _this;
        }
        Empleado.prototype.ToJSON = function () {
            var dato = "\"legajo\" : \"" + this.legajo + "\" , \"horario\" : \"" + this.horario + "\"}";
            return _super.prototype.ToJSON.call(this).concat(dato);
        };
        return Empleado;
    }(Clases.Persona));
    Clases.Empleado = Empleado;
})(Clases || (Clases = {}));
