$(function(){

})

//Agrego una mascota al localStorage
function agregarPersona(): void {

    //Obtengo todos los campos de formulario
    let legajo: number = Number($("#txtLegajo").val());
    let nombre: string = String($("#txtNombre").val());
    let apellido: string = String($("#txtApellido").val());
    let edad: number = Number($("#txtEdad").val());
    let horario: clases.enumHorario = Number(($("#ddlHorario").val()));

    //Pregunto por el campo hidden
    let index: string = String($("#indexModificar").val());

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