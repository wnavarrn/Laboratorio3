"use strict";
var clases;
(function (clases) {
    var persona = /** @class */ (function () {
        function persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        persona.prototype.toJSON = function () {
            var json = "{\"nombre\":\"" + this.nombre + "\",\"apellido\":\"" + this.apellido + "\",\"edad\":\"" + this.edad + "\"";
            return json;
        };
        return persona;
    }());
    clases.persona = persona;
})(clases || (clases = {}));
