$(function(){

    //limpiarLocalStorage();
    limpiarCampos();

    cargarSelect();

    mostrarEmpleados();

    //evento change del select de filtro de persona
    $("#ddlFilterTurno").change(function () {

        var optionSelected = $(this).find("option:selected");

        let valueSelected = optionSelected.val();

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


function agregarPersona(): void {

    //Obtengo todos los campos de formulario
    let legajo: number = Number($("#txtLegajo").val());
    let nombre: string = String($("#txtNombre").val());
    let apellido: string = String($("#txtApellido").val());
    let edad: number = Number($("#txtEdad").val());
    let turno: clases.turno = Number(($("#ddlTurno").val()));

    //Pregunto por el campo hidden
    let index: string = String($("#indexModificar").val());

    //Seteo el nuevo objeto
    let newEmpleado = new clases.empleado(nombre, apellido, edad, turno, legajo);

    console.log(newEmpleado);

    let ListaEmpleados: clases.empleado[] = traerEmpleados();

    //sino es NULL quiere decir que estoy modificando esa posicion de memoria.  
    if (index !== "") {
        let indice: any = obtenerIndex(Number(index));
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

    let ListEmpleados: clases.empleado[] = traerEmpleados();

    armarTablaEmpleados(ListEmpleados);

}

//Traigo todas los empleados del localstorage
function traerEmpleados(): Array<clases.empleado> {

    //Obtengo el local storage controlando que no sea Null
    let empleadosString: string | null = localStorage.getItem("Empleados");
    //Controlo que no sea vacio para convertir a JSON
    let EmpleadosSON: clases.empleado[] = empleadosString == null ? [] : JSON.parse(empleadosString);

    return EmpleadosSON;
}

//Funcion que me arma la tabla de Empleaod con el Array que le paso por parametro
function armarTablaEmpleados(EmpleadosJSON: clases.empleado[]) {

    //Limpio el dvi de la tabla
    $("#myTable").html("");

    let tabla: string = ` <table id="TblMascotas" class="table">
                                    <thead>
                                    <tr>
                                        <th class="legajo">LEGAJO</th>
                                        <th class="nombre">NOMBRE</th>
                                        <th class="apellido">APELLIDO</th>
                                        <th class="edad">EDAD</th>                                       
                                        <th class="patas">TURNO</th>
                                        <th>ACCIÓN</th>
                                    </tr>
                                    </thead>
                                    <tbody>`;
    for (let i = 0; i < EmpleadosJSON.length; i++) {
        tabla +=
            ` <tr><td class="id">${EmpleadosJSON[i].legajo}</td>
            <td class="nombre">${EmpleadosJSON[i].nombre}</td>
                <td class="nombre">${EmpleadosJSON[i].apellido}</td>
            <td class="edad">${EmpleadosJSON[i].edad}</td>
            <td>${clases.turno[EmpleadosJSON[i].turno]}</td>
            <td><input id='btnModificar' class='btn btn-primary' type='button' value='Modificar' onclick='Traer(" ${EmpleadosJSON[i].legajo} ");'/>
            <input id='btnEliminar' class='btn btn-danger' type='button' value='Eliminar' onclick='Eliminar(" ${EmpleadosJSON[i].legajo} ");'/></td>
            </tr>`;
    }

    tabla += `</tbody></table>`;

    $("#myTable").html(tabla);
}


//Cargo el select desde el enumerador
function cargarSelect(){
    for (let i = 0; i < 4; i++) {
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
function obtenerIndex(legajo: number) {
    let ListEmpleados: clases.empleado[] = traerEmpleados();

    for (let index = 0; index < ListEmpleados.length; index++) {
        if (ListEmpleados[index].legajo == legajo) {
            return Number(index);
        }

    }

}

/*+++++++++++++++ funciones del ABM +++++++++++++++++*/

function Eliminar(legajo:number) {
    
    //Traigo los empleados del localStorage - a traves de la funcion "traerMascotas()"
    let ListEmpleados: clases.empleado[] = traerEmpleados();

    //Obtengo el indice del empleado segun el legajo
    let indice: any = obtenerIndex(Number(legajo));
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

function Traer(legajo: number) {
    
    $("#indexModificar").val(legajo.toString());

    let empleadosFiltrados: Array<clases.empleado>;

    let empleadosString: string | null = localStorage.getItem("Empleados");

    let EmpleadosJSON: clases.empleado[] = empleadosString == null ? [] : JSON.parse(empleadosString);

    empleadosFiltrados = EmpleadosJSON.filter(function (empleado: clases.empleado) {
        return Number(empleado.legajo) === Number(legajo);
    })
        .map(function (empleado) {
            let m = new clases.empleado(empleado.nombre,empleado.apellido,empleado.edad,empleado.legajo,empleado.turno);
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
        $("#txtLegajo").prop('readonly',true);
    
        $("#txtNombre").focus();
    }
}


/*+++++++++++++++ Filtros +++++++++++++++++*/

function filtroPorTurno(turno:any)
{
    let empleadosFiltradas: Array<clases.empleado>;

    let empleadosString: string | null = localStorage.getItem("Empleados");

    let EmpleadosJSON: clases.empleado[] = empleadosString == null ? [] : JSON.parse(empleadosString);

    empleadosFiltradas = EmpleadosJSON.filter(function (empleado: clases.empleado) {
        return clases.turno[empleado.turno] === clases.turno[turno];
    });

    armarTablaEmpleados(empleadosFiltradas);

    //De paso calculo el promedio

    $("#txtPromEdad").val(calcularPromedioDeEdad(turno));
}

//Funcion para calcular el promedio de edad por turno
function calcularPromedioDeEdad(turno:any) {
    
    let AcumEdad: number;

    let cantidad: number;

    let ListEmpleados: clases.empleado[] = traerEmpleados();

    //Acumulo las edades de los empleados filtrados
    AcumEdad = ListEmpleados.filter(function (empleado: clases.empleado) {
        return clases.turno[empleado.turno] === clases.turno[turno];
    })
        .reduce(function (actual, siguiente) {
            return Number(actual) + Number(siguiente.edad);
        }, 0);

    //Cuento la cantidad de empleados 
    cantidad = ListEmpleados.filter(function (empleado: clases.empleado) {
        return clases.turno[empleado.turno] === clases.turno[turno];
    })
        .reduce(function (actual: number, siguiente: clases.empleado) {
            return actual + 1;
        }, 0);

    return (AcumEdad / cantidad).toFixed(2);   
}

