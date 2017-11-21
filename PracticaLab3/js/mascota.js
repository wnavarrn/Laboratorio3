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
    var Mascota = /** @class */ (function (_super) {
        __extends(Mascota, _super);
        function Mascota(id, tipo, nombre, edad, patas) {
            var _this = _super.call(this, nombre, edad, patas) || this;
            _this.id = id;
            _this.tipo = tipo;
            return _this;
        }
        Mascota.prototype.toJSON = function () {
            var cad = _super.prototype.toJSON.call(this).replace("}", "");
            var json = cad + ("\"id\"=\"" + this.nombre + "\",\"Edad\"=\"" + this.edad + "}\"");
            return json;
        };
        return Mascota;
    }(clases.Animal));
    clases.Mascota = Mascota;
})(clases || (clases = {}));
