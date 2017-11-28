"use strict";
var clases;
(function (clases) {
    var Animal = /** @class */ (function () {
        function Animal(nombre, edad, patas) {
            this.nombre = nombre;
            this.edad = edad;
            this.patas = patas;
        }
        return Animal;
    }());
    clases.Animal = Animal;
})(clases || (clases = {}));
