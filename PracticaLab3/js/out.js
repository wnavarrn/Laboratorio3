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
            var json = "{\"nombre\":\"" + this.nombre + "\",\"edad\":\"" + this.edad + "\",\"patas\":\"" + this.patas + "\"";
            return json;
        };
        return Animal;
    }());
    clases.Animal = Animal;
})(clases || (clases = {}));
$(function () {
    //localStorage.clear();
    mostrarMascotas();
    /*$('#btnAgregar').click(function () {
        agregarMascota();
    });*/
    $("#ddlFilterTipo").change(function () {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        alert("valor " + valueSelected);
        filtrar(valueSelected);
    });
    var $chk = $("#grpChkBox input:checkbox"); // cache the selector
    var $tbl = $("#someTable");
    $chk.prop('checked', true); // check all checkboxes when page loads
    $chk.click(function () {
        var colToHide = $tbl.find("." + $(this).attr("name"));
        $(colToHide).toggle();
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
    //console.log(nuevaMascota.toJSON());
    //lo convierto a Json y lo pongo dentro del array
    console.log(nuevaMascota.toJSON());
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
    //Limpio el dvi de la tabla
    $("#myTable").html("");
    var mascotasString = localStorage.getItem("Mascotas");
    var MascotasJSON = mascotasString == null ? [] : JSON.parse(mascotasString);
    var tabla = " <table id=\"someTable\" class=\"table\">\n                                    <thead>\n                                    <tr>\n                                        <th class=\"id\">Id</th>\n                                        <th class=\"name\">Nombre</th>\n                                        <th>Edad</th>                                       \n                                        <th>patas</th>\n                                        <th>TIPO</th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>";
    for (var i = 0; i < MascotasJSON.length; i++) {
        tabla +=
            " <tr><td class=\"id\">" + MascotasJSON[i].id + "</td><td class=\"name\">" + MascotasJSON[i].nombre + "</td><td>" + MascotasJSON[i].edad + "</td><td>" + MascotasJSON[i].patas + "</td><td>" + clases.tipoMascota[MascotasJSON[i].tipo] + "</td></tr>";
    }
    tabla += "</tbody></table>";
    $("#myTable").html(tabla);
}
function filtrar(tipo) {
    var mascotasFiltradas;
    var mascotasString = localStorage.getItem("Mascotas");
    var MascotasJSON = mascotasString == null ? [] : JSON.parse(mascotasString);
    mascotasFiltradas = MascotasJSON.filter(function (mascota) {
        return clases.tipoMascota[mascota.tipo] === clases.tipoMascota[tipo];
    });
    $("#myTable").html("");
    var tabla = " <table class=\"table\">\n    <thead>\n    <tr>\n    <th>Id</th>\n    <th>Nombre</th>\n    <th>Edad</th>                                       \n    <th>patas</th>\n    <th>TIPO</th>\n    </tr>\n    </thead>\n    <tbody>";
    for (var i = 0; i < mascotasFiltradas.length; i++) {
        tabla +=
            " <tr><td>" + mascotasFiltradas[i].id + "</td><td>" + mascotasFiltradas[i].nombre + "</td><td>" + mascotasFiltradas[i].edad + "</td><td>" + mascotasFiltradas[i].patas + "</td><td>" + clases.tipoMascota[mascotasFiltradas[i].tipo] + "</td></tr>";
    }
    tabla += "</tbody></table>";
    $("#myTable").html(tabla);
}
var clases;
(function (clases) {
    var tipoMascota;
    (function (tipoMascota) {
        tipoMascota[tipoMascota["perro"] = 1] = "perro";
        tipoMascota[tipoMascota["gato"] = 2] = "gato";
        tipoMascota[tipoMascota["reptil"] = 3] = "reptil";
        tipoMascota[tipoMascota["roedor"] = 4] = "roedor";
        tipoMascota[tipoMascota["ave"] = 5] = "ave";
        tipoMascota[tipoMascota["pez"] = 6] = "pez";
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
            var json = cad + (",\"id\":\"" + this.id + "\",\"tipo\":\"" + this.tipo + "\"}");
            return json;
        };
        return Mascota;
    }(clases.Animal));
    clases.Mascota = Mascota;
})(clases || (clases = {}));
