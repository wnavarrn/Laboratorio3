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
    limpiarCampos();
    //limpiarLocalstorage();
    //Cargo el combobox de tipos de mascotas
    cargarSelects();
    //Muestro la tabla de las mascotas
    mostrarMascotas();
    //evento change del select de tipo de mascota
    $("#ddlTipo").change(function () {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        setCantPatas(valueSelected);
    });
    //Funcion que seteo la cantidad de patas segun el tipo de mascota
    function setCantPatas(tipo) {
        tipo > 0 && tipo <= 4 ? $("#txtPatas").val("4") : $("#txtPatas").val("2");
    }
    //evento change del select de filtro de persona
    $("#ddlFilterTipo").change(function () {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        filtrar(valueSelected);
    });
    var $chk = $("#grpChkBox input:checkbox"); // cache the selector
    var $tbl = $("#TblMascotas");
    $chk.prop('checked', true); // check all checkboxes when page loads
    $chk.click(function () {
        var colToHide = $tbl.find("." + $(this).attr("name"));
        $(colToHide).toggle();
    });
});
function cargarSelects() {
    for (var i = 0; i < 6; i++) {
        $('#ddlTipo').append($('<option>', {
            value: i,
            text: clases.tipoMascota[i]
        }));
        $('#ddlFilterTipo').append($('<option>', {
            value: i,
            text: clases.tipoMascota[i]
        }));
    }
}
//Limpio el Localstorage
function limpiarLocalstorage() {
    localStorage.clear();
}
//Agrego una mascota al localStorage
function agregarMascota() {
    //Obtengo todos los campos de formulario
    var id = Number($("#txtId").val());
    var nombre = String($("#txtNombre").val());
    var edad = Number($("#txtEdad").val());
    var tipo = Number(($("#ddlTipo").val()));
    var patas = Number($("#txtPatas").val());
    //Pregunto por el campo hidden
    var index = String($("#indexModificar").val());
    //Seteo el nuevo objeto
    var nuevaMascota = new clases.Mascota(id, tipo, nombre, edad, patas);
    var ListMascotas = traerMascotas();
    //sino es NULL quiere decir que estoy modificando esa posicion de memoria.  
    if (index !== "") {
        var indice = obtenerIndex(Number(index));
        ListMascotas.splice(indice, 1);
    }
    //lo convierto a Json y lo pongo dentro del array
    console.log(nuevaMascota.toJSON());
    ListMascotas.push(JSON.parse(nuevaMascota.toJSON()));
    localStorage.setItem("Mascotas", JSON.stringify(ListMascotas));
    alert("Mascota guardada correctamente");
    //Refresco la Tabla
    mostrarMascotas();
    //Limpio los campos
    limpiarCampos();
}
function limpiarCampos() {
    $("#txtId").val('');
    $("#txtNombre").val('');
    $("#txtEdad").val('');
    $("#ddlTipo").val(0);
    $("#txtPatas").val('');
    $("#txtId").focus();
    $("#indexModificar").val("");
}
//Muestro la tabla de Mascotas
function mostrarMascotas() {
    /*let mascotasString: string | null = localStorage.getItem("Mascotas");

    let MascotasJSON: clases.Mascota[] = mascotasString == null ? [] : JSON.parse(mascotasString);*/
    var ListMascotas = traerMascotas();
    armarTablaMascotas(ListMascotas);
}
//Funcion que me arma la tabla de Mascotas con el Array que le paso por parametro
function armarTablaMascotas(MascotasJSON) {
    //Limpio el dvi de la tabla
    $("#myTable").html("");
    var tabla = " <table id=\"TblMascotas\" class=\"table\">\n                                    <thead>\n                                    <tr>\n                                        <th class=\"id\">ID</th>\n                                        <th class=\"nombre\">NOMBRE</th>\n                                        <th class=\"edad\">EDAD</th>                                       \n                                        <th class=\"patas\">PATAS</th>\n                                        <th>TIPO</th>\n                                        <th>ACCI\u00D3N</th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>";
    for (var i = 0; i < MascotasJSON.length; i++) {
        tabla +=
            " <tr><td class=\"id\">" + MascotasJSON[i].id + "</td>\n            <td class=\"nombre\">" + MascotasJSON[i].nombre + "</td>\n            <td class=\"edad\">" + MascotasJSON[i].edad + "</td>\n            <td class=\"patas\">" + MascotasJSON[i].patas + "</td>\n            <td>" + clases.tipoMascota[MascotasJSON[i].tipo] + "</td>\n            <td><input id='btnModificar' class='btn btn-primary' type='button' value='Modificar' onclick='Traer(\" " + MascotasJSON[i].id + " \");'/>\n            <input id='btnEliminar' class='btn btn-danger' type='button' value='Eliminar' onclick='Eliminar(\" " + MascotasJSON[i].id + " \");'/></td>\n            </tr>";
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
    armarTablaMascotas(mascotasFiltradas);
    //De paso calculo el promedio
    $("#txtPromEdad").val(calcularPromedio(tipo));
}
//Funcion que calcula los promedios
function calcularPromedio(tipo) {
    //let mascotasFiltradas: Array<clases.Mascota>;
    var AcumEdad;
    var cantidad;
    var mascotasString = localStorage.getItem("Mascotas");
    var MascotasJSON = mascotasString == null ? [] : JSON.parse(mascotasString);
    //Acumulo las edades de las mascotas filtradas
    AcumEdad = MascotasJSON.filter(function (mascota) {
        return clases.tipoMascota[mascota.tipo] === clases.tipoMascota[tipo];
    })
        .reduce(function (actual, siguiente) {
        return Number(actual) + Number(siguiente.edad);
    }, 0);
    //Cuento la cantidad de mascotas 
    cantidad = MascotasJSON.filter(function (mascota) {
        return clases.tipoMascota[mascota.tipo] === clases.tipoMascota[tipo];
    })
        .reduce(function (actual, siguiente) {
        return actual + 1;
    }, 0);
    return (AcumEdad / cantidad).toFixed(2);
}
//Funcion que se ejecuta al tocar el boton "Modificar"
function Traer(id) {
    BuscarMascota(id);
}
//Busco la mascota por su ID y la cargo en sus respectivos textboxs
function BuscarMascota(id) {
    $("#indexModificar").val(id.toString());
    var mascotasFiltradas;
    var mascotasString = localStorage.getItem("Mascotas");
    var MascotasJSON = mascotasString == null ? [] : JSON.parse(mascotasString);
    mascotasFiltradas = MascotasJSON.filter(function (mascota) {
        return Number(mascota.id) === Number(id);
    })
        .map(function (mascota) {
        var m = new clases.Mascota(mascota.id, mascota.tipo, mascota.nombre, mascota.edad, mascota.patas);
        return m;
    });
    if (mascotasFiltradas.length < 2) {
        //Muestro los valores en los campos del form
        $("#txtId").val(mascotasFiltradas[0].id);
        $("#txtNombre").val(mascotasFiltradas[0].nombre);
        $("#txtEdad").val(mascotasFiltradas[0].edad);
        $("#ddlTipo").val(mascotasFiltradas[0].tipo);
        $("#txtPatas").val(mascotasFiltradas[0].patas);
        //Pongo el ID readonly
        //$("#id_to_update").val(mascotasFiltradas[0].id);
        $("#txtId").prop('readonly', true);
        $("#txtNombre").focus();
    }
}
function Eliminar(id) {
    /*Opcion 1*/
    eliminarMascota(id);
    //alert("Aca elimino opcion 1");
    /*Opcion 2*/
    /*alert("Aca elimino opcion 2");
    let mascotasString: string | null = localStorage.getItem("Mascotas");
    let MascotasJSON: clases.Mascota[] = mascotasString == null ? [] : JSON.parse(mascotasString);
    MascotasJSON.splice(id, 1);
    localStorage.setItem("Mascotas", JSON.stringify(MascotasJSON));


    let mascotasString2: string | null = localStorage.getItem("Mascotas");
    let MascotasJSON2: clases.Mascota[] = mascotasString2 == null ? [] : JSON.parse(mascotasString2);

    alert("Mascota Eliminada correctamente 2");

    //Armo la tabla actualizada
    armarTablaMascotas(MascotasJSON2);*/
}
function eliminarMascota(id) {
    //Traigo las mascotas del localStorage
    /*let mascotasString: string | null = localStorage.getItem("Mascotas");
    let MascotasJSON: clases.Mascota[] = mascotasString == null ? [] : JSON.parse(mascotasString);*/
    //Traigo las mascotas del localStorage - a traves de la funcion "traerMascotas()"
    var ListMascotas = traerMascotas();
    //filtro el array y actualizo el localstorage
    var mascotasActuales;
    mascotasActuales = ListMascotas.filter(function (mascota) {
        return Number(mascota.id) != Number(id);
    });
    //Tengo que actualizar el localstorage
    limpiarLocalstorage();
    //Agrego la nueva lista al localstorage
    localStorage.setItem("Mascotas", JSON.stringify(mascotasActuales));
    //mensaje que elimino la mascota
    alert("Mascota Eliminada correctamente");
    //Armo la tabla actualizada
    armarTablaMascotas(mascotasActuales);
}
/*function modificarMascota(id:number) {
    
    $("#indexModificar").val(id.toString());

    alert("y" + $("#indexModificar").val());

    Traer(id);

}*/
//Traigo todas las mascotas del localstorage
function traerMascotas() {
    //Obtengo el local storage controlando que no sea Null
    /*let mascotaString: string | null = localStorage.getItem("Mascotas");

    //Controlo que no sea vacio para convertir a JSON
    let MascotasJSON: JSON[] = mascotaString == null ? [] : JSON.parse(mascotaString);*/
    //Obtengo el local storage controlando que no sea Null
    var mascotasString = localStorage.getItem("Mascotas");
    //Controlo que no sea vacio para convertir a JSON
    var MascotasJSON = mascotasString == null ? [] : JSON.parse(mascotasString);
    return MascotasJSON;
}
function obtenerIndex(id) {
    var ListMascotas = traerMascotas();
    for (var index = 0; index < ListMascotas.length; index++) {
        if (ListMascotas[index].id == id) {
            return Number(index);
        }
    }
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
