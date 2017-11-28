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
$(function () {
});
//Agrego una mascota al localStorage
function agregarPersona() {
    //Obtengo todos los campos de formulario
    var legajo = Number($("#txtLegajo").val());
    var nombre = String($("#txtNombre").val());
    var apellido = String($("#txtApellido").val());
    var edad = Number($("#txtEdad").val());
    var horario = Number(($("#ddlHorario").val()));
    //Pregunto por el campo hidden
    var index = String($("#indexModificar").val());
    //Seteo el nuevo objeto
    //let newEmpleado = new clases.empleado(nombre, apellido, edad, horario, legajo);
    //console.log(newEmpleado.toJSON());
    /*let ListEmpleados: clases.Empleado[] = clases.Empleado.traerEmpleados();

    //sino es NULL quiere decir que estoy modificando esa posicion de memoria.
    if (index !== "") {
        let indice: any = clases.Empleado.obtenerIndex(Number(index));
        ListEmpleados.splice(indice, 1);
    }

    //lo convierto a Json y lo pongo dentro del array
    console.log(newEmpleado.toJSON());

    ListEmpleados.push(JSON.parse(newEmpleado.toJSON()));

    localStorage.setItem("Empleados", JSON.stringify(ListEmpleados));

    alert("Empleado guardado correctamente");

    //Refresco la Tabla
    mostrarEmpleados();

    //Limpio los campos
    //limpiarCampos();*/
}
var clases;
(function (clases) {
    var empleado = /** @class */ (function (_super) {
        __extends(empleado, _super);
        function empleado() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return empleado;
    }(clases.persona));
    clases.empleado = empleado;
})(clases || (clases = {}));
var clases;
(function (clases) {
    var enumHorario;
    (function (enumHorario) {
        enumHorario[enumHorario["Manana"] = 1] = "Manana";
        enumHorario[enumHorario["Tarde"] = 2] = "Tarde";
        enumHorario[enumHorario["Noche"] = 3] = "Noche";
    })(enumHorario = clases.enumHorario || (clases.enumHorario = {}));
})(clases || (clases = {}));
var clases;
(function (clases) {
    var humano = /** @class */ (function () {
        function humano(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        humano.prototype.toJSON = function () {
            var json = "{\"nombre\":\"" + this.nombre + "\",\"apellido\":\"" + this.apellido + "\",\"edad\":\"" + this.edad + "\"";
            return json;
        };
        return humano;
    }());
    clases.humano = humano;
})(clases || (clases = {}));
