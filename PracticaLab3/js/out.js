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
    var Animal = /** @class */ (function () {
        function Animal(nombre, edad, patas) {
            this.nombre = nombre;
            this.edad = edad;
            this.patas = patas;
        }
        Animal.prototype.toJSON = function () {
            var json = "{\"Nombre\":\"" + this.nombre + "\",\"Edad\":\"" + this.edad + "\",\"patas\":\"" + this.patas + "\"";
            return json;
        };
        return Animal;
    }());
    clases.Animal = Animal;
})(clases || (clases = {}));
$(function () {
    localStorage.clear();
    $('#btnAgregar').click(function () {
        agregarMascota();
    });
});
function agregarMascota() {
    //Obtengo todos los campos de formulario
    var id = Number($("#txtId").val());
    var nombre = String($("#txtNombre").val());
    var edad = Number($("#txtEdad").val());
    var tipo = Number(($("#ddlTipo").val()));
    var patas = Number($("ddlCantPatas").val());
    //Seteo el nuevo objeto
    var nuevaMascota = new clases.Mascota(id, tipo, nombre, edad, patas);
    //Obtengo el local storage controlando que no sea Null
    var mascotaString = localStorage.getItem("Mascotas");
    //Controlo que no sea vacio para convertir a JSON
    var MascotasJSON = mascotaString == null ? [] : JSON.parse(mascotaString);
    console.log(nuevaMascota.toJSON());
    //lo convierto a Json y lo pongo dentro del array
    MascotasJSON.push(JSON.parse(nuevaMascota.toJSON()));
    localStorage.setItem("Mascotas", JSON.stringify(MascotasJSON));
    alert("Mascota guardada correctamente");
    mostrarMascotas();
    limpiarCampos();
}
function limpiarCampos() {
    $("#txtId").val('');
    $("#txtNombre").val('');
    $("#txtEdad").val('');
    $("#ddlTipo").val(0);
    $("#ddlcantpatas").val(0);
    $("#txtId").focus();
}
function mostrarMascotas() {
    alert("Estoy en mostrar tabla");
    var mascotasString = localStorage.getItem("Mascotas");
    var MascotasJSON = mascotasString == null ? [] : JSON.parse(mascotasString);
    console.log(MascotasJSON);
    var tabla = " <table class=\"table\">\n                                    <thead>\n                                    <tr>\n                                        <th>Id</th>\n                                        <th>Nombre</th>\n                                        <th>Edad</th>                                       \n                                        <th>patas</th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr>";
    for (var i = 0; i = MascotasJSON.length; i++) {
        tabla +=
            "<td>" + MascotasJSON[i].id + "</td>\n                <td>" + MascotasJSON[i].nombre + "</td>\n                <td>" + MascotasJSON[i].edad + "</td>\n                <td>" + MascotasJSON[i].patas + "</td>";
    }
    tabla += "</tr></tbody></table>";
    $("#myTable").html(tabla);
}
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
            var json = cad + (",\"id\":\"" + this.id + "\",\"Edad\":\"" + this.edad + "\"}");
            return json;
        };
        return Mascota;
    }(clases.Animal));
    clases.Mascota = Mascota;
})(clases || (clases = {}));
