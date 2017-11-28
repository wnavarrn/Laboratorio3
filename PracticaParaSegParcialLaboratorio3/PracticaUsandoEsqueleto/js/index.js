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
    /*limpiarCampos();*/
    //limpiarLocalstorage();
    //Cargo el combobox de tipos de mascotas
    /*cargarSelects();*/
    //Muestro la tabla de las empleados
    mostrarEmpleados();
    //evento change del select de tipo de mascota
    /*$("#ddlTipo").change(function () {

        var optionSelected = $(this).find("option:selected");
        let valueSelected = optionSelected.val();

        setCantPatas(valueSelected)
     
    });*/
    //Funcion que seteo la cantidad de patas segun el tipo de mascota
    /*function setCantPatas(tipo:any)
    {
        tipo > 0 && tipo <= 4 ? $("#txtPatas").val("4") : $("#txtPatas").val("2");
    }*/
    //evento change del select de filtro de persona
    /*$("#ddlFilterTipo").change(function() {
    
            var optionSelected = $(this).find("option:selected");
            
            let valueSelected = optionSelected.val();
    
            filtrar(valueSelected);
    
        });*/
    /* var $chk = $("#grpChkBox input:checkbox"); // cache the selector
     var $tbl = $("#TblMascotas");
  
     $chk.prop('checked', true); // check all checkboxes when page loads
  
     $chk.click(function () {
         var colToHide = $tbl.find("." + $(this).attr("name"));
         $(colToHide).toggle();
     });*/
});
function cargarSelects() {
    for (var i = 0; i < 3; i++) {
        $('#ddlHorario').append($('<option>', {
            value: i,
            text: clases.enumHorario[i]
        }));
        /* $('#ddlFilterTipo').append($('<option>', {
             value: i,
             text: clases.tipoMascota[i]
         }));*/
    }
}
//Limpio el Localstorage
function limpiarLocalstorage() {
    localStorage.clear();
}
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
    var newEmpleado = new clases.Empleado(nombre, apellido, edad, horario, legajo);
    var ListEmpleados = clases.Empleado.traerEmpleados();
    //sino es NULL quiere decir que estoy modificando esa posicion de memoria.  
    if (index !== "") {
        var indice = clases.Empleado.obtenerIndex(Number(index));
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
    //limpiarCampos();
}
/*function limpiarCampos(): void {

    $("#txtId").val('');
    $("#txtNombre").val('');
    $("#txtEdad").val('');
    $("#ddlTipo").val(0);
    $("#txtPatas").val('');

    $("#txtId").focus();

    $("#indexModificar").val("");
}*/
//Muestro la tabla de Mascotas
function mostrarEmpleados() {
    var ListEmpleados = clases.Empleado.traerEmpleados();
    clases.Empleado.armarTablaEmpleados(ListEmpleados);
}
function filtrar(tipo) {
    var empleadosFiltrados;
    /*let mascotasString: string | null = localStorage.getItem("Mascotas");

    let MascotasJSON: clases.Mascota[] = mascotasString == null ? [] : JSON.parse(mascotasString);*/
    var ListEmpleados = clases.Empleado.traerEmpleados();
    /*empleadosFiltrados = ListEmpleados.filter(function (empleado: clases.Empleado) {
        return clases.tipoMascota[empleado.] === clases.tipoMascota[tipo];
    });*/
    /*clases.Empleado.armarTablaEmpleados(empleadosFiltrados);*/
    //De paso calculo el promedio
    //$("#txtPromEdad").val(calcularPromedio(tipo));
}
//Funcion que calcula los promedios
/*function calcularPromedio(tipo: any):string
{
    //let mascotasFiltradas: Array<clases.Mascota>;
    let AcumEdad :number;

    let cantidad:number;

    let mascotasString: string | null = localStorage.getItem("Mascotas");

    let MascotasJSON: clases.Mascota[] = mascotasString == null ? [] : JSON.parse(mascotasString);

    //Acumulo las edades de las mascotas filtradas
    AcumEdad = MascotasJSON.filter(function (mascota: clases.Mascota) {
        return clases.tipoMascota[mascota.tipo] === clases.tipoMascota[tipo];
    })
    .reduce(function(actual, siguiente)
     {
        return Number(actual) + Number(siguiente.edad);
    },0);

    //Cuento la cantidad de mascotas
    cantidad = MascotasJSON.filter(function (mascota: clases.Mascota) {
        return clases.tipoMascota[mascota.tipo] === clases.tipoMascota[tipo];
    })
        .reduce(function (actual: number, siguiente: clases.Mascota) {
            return actual + 1;
        }, 0);

    return (AcumEdad/cantidad).toFixed(2);
}*/
//Funcion que se ejecuta al tocar el boton "Modificar"
function Traer(legajo) {
    //BuscarMascota(id);
}
//Busco la mascota por su ID y la cargo en sus respectivos textboxs
/*function BuscarMascota(id:number)
{

    $("#indexModificar").val(id.toString());
    
    let mascotasFiltradas: Array<clases.Mascota>;

    let mascotasString: string | null = localStorage.getItem("Mascotas");
    
    let MascotasJSON: clases.Mascota[] = mascotasString == null ? [] : JSON.parse(mascotasString);

    mascotasFiltradas = MascotasJSON.filter(function (mascota: clases.Mascota) {
        return Number(mascota.id) === Number(id);
    })
    .map(function(mascota){
        let m = new clases.Mascota(mascota.id,mascota.tipo,mascota.nombre,mascota.edad,mascota.patas);
        return m;
        
    });

    if (mascotasFiltradas.length < 2){
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

}*/
function Eliminar(id) {
    clases.Empleado.eliminarEmpleado(id);
}
var clases;
(function (clases) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, edad, horario, legajo) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.horario = horario;
            _this.legajo = legajo;
            return _this;
        }
        Empleado.prototype.empleadoToJSON = function () {
            var json = _super.prototype.toJSON.call(this) + "horario:" + this.legajo + ",legajo:" + this.legajo + "}";
            return json;
        };
        //Traigo todas las mascotas del localstorage
        Empleado.traerEmpleados = function () {
            //Obtengo el local storage controlando que no sea Null
            var empleadosString = localStorage.getItem("Empleados");
            //Controlo que no sea vacio para convertir a JSON
            var EmpleadosJSON = empleadosString == null ? [] : JSON.parse(empleadosString);
            return EmpleadosJSON;
        };
        //Obtengo el indice del array de empleados
        Empleado.obtenerIndex = function (legajo) {
            var ListEmpleados = clases.Empleado.traerEmpleados();
            for (var index = 0; index < ListEmpleados.length; index++) {
                if (ListEmpleados[index].legajo == legajo) {
                    return Number(index);
                }
            }
        };
        Empleado.eliminarEmpleado = function (legajo) {
            //Traigo los empleados del localStorage - a traves de la funcion "traerMascotas()"
            var ListEmpleados = clases.Empleado.traerEmpleados();
            var indice = clases.Empleado.obtenerIndex(Number(legajo));
            ListEmpleados.splice(indice, 1);
            //Tengo que actualizar el localstorage
            limpiarLocalstorage();
            //Agrego la nueva lista al localstorage
            localStorage.setItem("Empleados", JSON.stringify(ListEmpleados));
            //mensaje que elimino la mascota
            alert("Empleado Eliminado correctamente");
            //Armo la tabla actualizada
            clases.Empleado.armarTablaEmpleados(ListEmpleados);
        };
        //Funcion que me arma la tabla de Mascotas con el Array que le paso por parametro
        Empleado.armarTablaEmpleados = function (EmpleadoJSON) {
            //Limpio el dvi de la tabla
            $("#myTable").html("");
            var tabla = " <table id=\"TblEmpleados\" class=\"table\">\n                                    <thead>\n                                    <tr>\n                                        <th class=\"id\">LEGAJO</th>\n                                        <th class=\"nombre\">NOMBRE</th>\n                                        <th class=\"edad\">APELLIDO</th>                                       \n                                        <th class=\"patas\">EDAD</th>\n                                        <th>TIPO</th>\n                                        <th>ACCI\u00D3N</th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>";
            for (var i = 0; i < EmpleadoJSON.length; i++) {
                tabla +=
                    " <tr><td class=\"id\">" + EmpleadoJSON[i].legajo + "</td>\n                <td class=\"nombre\">" + EmpleadoJSON[i].nombre + "</td>\n                <td class=\"edad\">" + EmpleadoJSON[i].apellido + "</td>\n                <td class=\"patas\">" + EmpleadoJSON[i].edad + "</td>\n                <td><input id='btnModificar' class='btn btn-primary' type='button' value='Modificar' onclick='Traer(\" " + EmpleadoJSON[i].legajo + " \");'/>\n                <input id='btnEliminar' class='btn btn-danger' type='button' value='Eliminar' onclick='Eliminar(\" " + EmpleadoJSON[i].legajo + " \");'/></td>\n                </tr>";
            }
            tabla += "</tbody></table>";
            $("#myTable").html(tabla);
        };
        return Empleado;
    }(clases.Persona));
    clases.Empleado = Empleado;
})(clases || (clases = {}));
var clases;
(function (clases) {
    var enumHorario;
    (function (enumHorario) {
        enumHorario[enumHorario["Ma\u00F1ana"] = 1] = "Ma\u00F1ana";
        enumHorario[enumHorario["Tarde"] = 2] = "Tarde";
        enumHorario[enumHorario["Noche"] = 3] = "Noche";
    })(enumHorario = clases.enumHorario || (clases.enumHorario = {}));
})(clases || (clases = {}));
var clases;
(function (clases) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Persona.prototype.toJSON = function () {
            var json = "{\"nombre\":\"" + this.nombre + "\",\"apellido\":\"" + this.apellido + "\",\"edad\":\"" + this.edad + "\"";
            return json;
        };
        return Persona;
    }());
    clases.Persona = Persona;
})(clases || (clases = {}));
