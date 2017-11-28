"use strict";
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
