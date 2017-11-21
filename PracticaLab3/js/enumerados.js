"use strict";
var clases;
(function (clases) {
    var tipoMascota;
    (function (tipoMascota) {
        tipoMascota[tipoMascota["perro"] = 0] = "perro";
        tipoMascota[tipoMascota["gato"] = 1] = "gato";
        tipoMascota[tipoMascota["reptil"] = 2] = "reptil";
        tipoMascota[tipoMascota["roedor"] = 3] = "roedor";
        tipoMascota[tipoMascota["ave"] = 4] = "ave";
        tipoMascota[tipoMascota["pez"] = 5] = "pez";
    })(tipoMascota = clases.tipoMascota || (clases.tipoMascota = {}));
})(clases || (clases = {}));
