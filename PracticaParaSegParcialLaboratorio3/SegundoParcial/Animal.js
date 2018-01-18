"use strict";
var clases;
(function (clases) {
    var Animal = /** @class */ (function () {
        function Animal(nom, ed, cant) {
            this.nombre = nom;
            this.edad = ed;
            this.cantidad_patas = cant;
        }
        Animal.prototype.AnimalJson = function () {
            return this.nombre + ", " + this.edad + ", " + this.cantidad_patas;
        };
        return Animal;
    }());
    clases.Animal = Animal;
})(clases || (clases = {}));
