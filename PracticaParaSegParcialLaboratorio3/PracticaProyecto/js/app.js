"use strict";
$(function () {
    //limpiarLocalStorage();
    limpiarCampos();
    cargarSelect();
    mostrarEmpleados();
    //evento change del select de filtro de persona
    $("#ddlFilterTurno").change(function () {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        filtroPorTurno(valueSelected);
    });
    var $chk = $("#grpChkBox input:checkbox"); // cache the selector
    var $tbl = $("#TblMascotas");
    $chk.prop('checked', true); // check all checkboxes when page loads
    $chk.click(function () {
        var colToHide = $tbl.find("." + $(this).attr("name"));
        $(colToHide).toggle();
    });
});
function agregarPersona() {
    //Obtengo todos los campos de formulario
    var legajo = Number($("#txtLegajo").val());
    var nombre = String($("#txtNombre").val());
    var apellido = String($("#txtApellido").val());
    var edad = Number($("#txtEdad").val());
    var turno = Number(($("#ddlTurno").val()));
    //Pregunto por el campo hidden
    var index = String($("#indexModificar").val());
    //Seteo el nuevo objeto
    var newEmpleado = new clases.empleado(nombre, apellido, edad, turno, legajo);
    console.log(newEmpleado);
    var ListaEmpleados = traerEmpleados();
    //sino es NULL quiere decir que estoy modificando esa posicion de memoria.  
    if (index !== "") {
        var indice = obtenerIndex(Number(index));
        ListaEmpleados.splice(indice, 1);
    }
    //lo convierto a Json y lo pongo dentro del array
    console.log(newEmpleado.toJSON());
    ListaEmpleados.push(JSON.parse(newEmpleado.toJSON()));
    localStorage.setItem("Empleados", JSON.stringify(ListaEmpleados));
    alert("Empleado guardado correctamente");
    //Limpio los campos
    limpiarCampos();
    //Recargo la tabla
    mostrarEmpleados();
}
/*MIS FUNCIONES*/
//Muestro la tabla de Mascotas
function mostrarEmpleados() {
    var ListEmpleados = traerEmpleados();
    armarTablaEmpleados(ListEmpleados);
}
//Traigo todas los empleados del localstorage
function traerEmpleados() {
    //Obtengo el local storage controlando que no sea Null
    var empleadosString = localStorage.getItem("Empleados");
    //Controlo que no sea vacio para convertir a JSON
    var EmpleadosSON = empleadosString == null ? [] : JSON.parse(empleadosString);
    return EmpleadosSON;
}
//Funcion que me arma la tabla de Empleaod con el Array que le paso por parametro
function armarTablaEmpleados(EmpleadosJSON) {
    //Limpio el dvi de la tabla
    $("#myTable").html("");
    var tabla = " <table id=\"TblMascotas\" class=\"table\">\n                                    <thead>\n                                    <tr>\n                                        <th class=\"legajo\">LEGAJO</th>\n                                        <th class=\"nombre\">NOMBRE</th>\n                                        <th class=\"apellido\">APELLIDO</th>\n                                        <th class=\"edad\">EDAD</th>                                       \n                                        <th class=\"patas\">TURNO</th>\n                                        <th>ACCI\u00D3N</th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>";
    for (var i = 0; i < EmpleadosJSON.length; i++) {
        tabla +=
            " <tr><td class=\"id\">" + EmpleadosJSON[i].legajo + "</td>\n            <td class=\"nombre\">" + EmpleadosJSON[i].nombre + "</td>\n                <td class=\"nombre\">" + EmpleadosJSON[i].apellido + "</td>\n            <td class=\"edad\">" + EmpleadosJSON[i].edad + "</td>\n            <td>" + clases.turno[EmpleadosJSON[i].turno] + "</td>\n            <td><input id='btnModificar' class='btn btn-primary' type='button' value='Modificar' onclick='Traer(\" " + EmpleadosJSON[i].legajo + " \");'/>\n            <input id='btnEliminar' class='btn btn-danger' type='button' value='Eliminar' onclick='Eliminar(\" " + EmpleadosJSON[i].legajo + " \");'/></td>\n            </tr>";
    }
    tabla += "</tbody></table>";
    $("#myTable").html(tabla);
}
//Cargo el select desde el enumerador
function cargarSelect() {
    for (var i = 0; i < 4; i++) {
        $('#ddlTurno').append($('<option>', {
            value: i,
            text: clases.turno[i]
        }));
        /*Cargo select del filtro*/
        $('#ddlFilterTurno').append($('<option>', {
            value: i,
            text: clases.turno[i]
        }));
    }
}
//Limpiar localstorage
function limpiarLocalStorage() {
    localStorage.clear();
}
//limpio los campos del formulario
function limpiarCampos() {
    $("#txtLegajo").focus();
    $("#txtLegajo").val("");
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtEdad").val("");
    $("#ddlTurno").val(0);
    $("#txtLegajo").prop('readonly', true);
}
//funcion de obtener el index
function obtenerIndex(legajo) {
    var ListEmpleados = traerEmpleados();
    for (var index = 0; index < ListEmpleados.length; index++) {
        if (ListEmpleados[index].legajo == legajo) {
            return Number(index);
        }
    }
}
/*+++++++++++++++ funciones del ABM +++++++++++++++++*/
function Eliminar(legajo) {
    //Traigo los empleados del localStorage - a traves de la funcion "traerMascotas()"
    var ListEmpleados = traerEmpleados();
    //Obtengo el indice del empleado segun el legajo
    var indice = obtenerIndex(Number(legajo));
    //Elimino el empleado de la lista
    ListEmpleados.splice(indice, 1);
    //Tengo que actualizar el localstorage
    limpiarLocalStorage();
    //Agrego la nueva lista al localstorage
    localStorage.setItem("Empleados", JSON.stringify(ListEmpleados));
    //mensaje que elimino la mascota
    alert("Empleado Eliminado correctamente");
    //Armo la tabla actualizada
    armarTablaEmpleados(ListEmpleados);
}
function Traer(legajo) {
    $("#indexModificar").val(legajo.toString());
    var empleadosFiltrados;
    var empleadosString = localStorage.getItem("Empleados");
    var EmpleadosJSON = empleadosString == null ? [] : JSON.parse(empleadosString);
    empleadosFiltrados = EmpleadosJSON.filter(function (empleado) {
        return Number(empleado.legajo) === Number(legajo);
    })
        .map(function (empleado) {
        var m = new clases.empleado(empleado.nombre, empleado.apellido, empleado.edad, empleado.legajo, empleado.turno);
        return m;
    });
    if (empleadosFiltrados.length < 2) {
        //Muestro los valores en los campos del form
        $("#txtLegajo").val(empleadosFiltrados[0].legajo);
        $("#txtNombre").val(empleadosFiltrados[0].nombre);
        $("#txtApellido").val(empleadosFiltrados[0].apellido);
        $("#txtEdad").val(empleadosFiltrados[0].edad);
        $("#ddlTurno").val(empleadosFiltrados[0].turno);
        //Pongo el Legajo readonly
        $("#txtLegajo").prop('readonly', true);
        $("#txtNombre").focus();
    }
}
/*+++++++++++++++ Filtros +++++++++++++++++*/
function filtroPorTurno(turno) {
    var empleadosFiltradas;
    var empleadosString = localStorage.getItem("Empleados");
    var EmpleadosJSON = empleadosString == null ? [] : JSON.parse(empleadosString);
    empleadosFiltradas = EmpleadosJSON.filter(function (empleado) {
        return clases.turno[empleado.turno] === clases.turno[turno];
    });
    armarTablaEmpleados(empleadosFiltradas);
    //De paso calculo el promedio
    $("#txtPromEdad").val(calcularPromedioDeEdad(turno));
}
//Funcion para calcular el promedio de edad por turno
function calcularPromedioDeEdad(turno) {
    var AcumEdad;
    var cantidad;
    var ListEmpleados = traerEmpleados();
    //Acumulo las edades de los empleados filtrados
    AcumEdad = ListEmpleados.filter(function (empleado) {
        return clases.turno[empleado.turno] === clases.turno[turno];
    })
        .reduce(function (actual, siguiente) {
        return Number(actual) + Number(siguiente.edad);
    }, 0);
    //Cuento la cantidad de empleados 
    cantidad = ListEmpleados.filter(function (empleado) {
        return clases.turno[empleado.turno] === clases.turno[turno];
    })
        .reduce(function (actual, siguiente) {
        return actual + 1;
    }, 0);
    return (AcumEdad / cantidad).toFixed(2);
}
