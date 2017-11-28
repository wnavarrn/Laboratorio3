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

function cargarSelects()
{
    for(let i= 0;i<3; i++)
    {
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
function limpiarLocalstorage()
{
    localStorage.clear();
}

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
    let newEmpleado = new clases.Empleado(nombre, apellido,edad, horario, legajo);

    let ListEmpleados: clases.Empleado[] = clases.Empleado.traerEmpleados();

    //sino es NULL quiere decir que estoy modificando esa posicion de memoria.  
    if (index !== "") {
        let indice:any =  clases.Empleado.obtenerIndex(Number(index));
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

    let ListEmpleados: clases.Empleado[] = clases.Empleado.traerEmpleados();
    clases.Empleado.armarTablaEmpleados(ListEmpleados);

}


function filtrar(tipo: any) {

    let empleadosFiltrados: Array<clases.Empleado>;

    /*let mascotasString: string | null = localStorage.getItem("Mascotas");

    let MascotasJSON: clases.Mascota[] = mascotasString == null ? [] : JSON.parse(mascotasString);*/

    let ListEmpleados: clases.Empleado[] = clases.Empleado.traerEmpleados();

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
function Traer(legajo:number){

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

function Eliminar(id: number) {
    clases.Empleado.eliminarEmpleado(id);
}




