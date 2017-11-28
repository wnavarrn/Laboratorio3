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
        let valueSelected = optionSelected.val();

        setCantPatas(valueSelected)
     
    });

    //Funcion que seteo la cantidad de patas segun el tipo de mascota
    function setCantPatas(tipo:any)
    {
        tipo > 0 && tipo <= 4 ? $("#txtPatas").val("4") : $("#txtPatas").val("2");
    }


    //evento change del select de filtro de persona
    $("#ddlFilterTipo").change(function() {

        var optionSelected = $(this).find("option:selected");
        
        let valueSelected = optionSelected.val();

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

function cargarSelects()
{
    for(let i= 0;i<6; i++)
    {
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
function limpiarLocalstorage()
{
    localStorage.clear();
}

//Agrego una mascota al localStorage
function agregarMascota(): void {

    //Obtengo todos los campos de formulario
    let id: number = Number($("#txtId").val());
    let nombre: string = String($("#txtNombre").val());
    let edad: number = Number($("#txtEdad").val());
    let tipo: clases.tipoMascota = Number(($("#ddlTipo").val()));
    let patas: number = Number($("#txtPatas").val());

    //Pregunto por el campo hidden
    let index: string = String($("#indexModificar").val());

    //Seteo el nuevo objeto
    let nuevaMascota = new clases.Mascota(id, tipo, nombre, edad, patas);

    let ListMascotas: clases.Mascota[] = traerMascotas();

    //sino es NULL quiere decir que estoy modificando esa posicion de memoria.  
    if (index !== "") {
        let indice:any = obtenerIndex(Number(index));
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

function limpiarCampos(): void {

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

    let ListMascotas: clases.Mascota[] = traerMascotas();

    armarTablaMascotas(ListMascotas);

}

//Funcion que me arma la tabla de Mascotas con el Array que le paso por parametro
function armarTablaMascotas(MascotasJSON: clases.Mascota[])
{
    //Limpio el dvi de la tabla
    $("#myTable").html("");

    let tabla: string = ` <table id="TblMascotas" class="table">
                                    <thead>
                                    <tr>
                                        <th class="id">ID</th>
                                        <th class="nombre">NOMBRE</th>
                                        <th class="edad">EDAD</th>                                       
                                        <th class="patas">PATAS</th>
                                        <th>TIPO</th>
                                        <th>ACCIÓN</th>
                                    </tr>
                                    </thead>
                                    <tbody>`;
    for (let i = 0; i < MascotasJSON.length; i++) {
        tabla +=
            ` <tr><td class="id">${MascotasJSON[i].id}</td>
            <td class="nombre">${MascotasJSON[i].nombre}</td>
            <td class="edad">${MascotasJSON[i].edad}</td>
            <td class="patas">${MascotasJSON[i].patas}</td>
            <td>${clases.tipoMascota[MascotasJSON[i].tipo]}</td>
            <td><input id='btnModificar' class='btn btn-primary' type='button' value='Modificar' onclick='Traer(" ${MascotasJSON[i].id} ");'/>
            <input id='btnEliminar' class='btn btn-danger' type='button' value='Eliminar' onclick='Eliminar(" ${MascotasJSON[i].id} ");'/></td>
            </tr>`;
    }

    tabla += `</tbody></table>`;

    $("#myTable").html(tabla);
}

function filtrar(tipo: any) {

    let mascotasFiltradas: Array<clases.Mascota>;

    let mascotasString: string | null = localStorage.getItem("Mascotas");

    let MascotasJSON: clases.Mascota[] = mascotasString == null ? [] : JSON.parse(mascotasString);

    mascotasFiltradas = MascotasJSON.filter(function (mascota: clases.Mascota) {
        return clases.tipoMascota[mascota.tipo] === clases.tipoMascota[tipo];
    });

    armarTablaMascotas(mascotasFiltradas);

    //De paso calculo el promedio

    $("#txtPromEdad").val(calcularPromedio(tipo));
  
}

//Funcion que calcula los promedios
function calcularPromedio(tipo: any):string
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
}

//Funcion que se ejecuta al tocar el boton "Modificar"
function Traer(id:number){

    BuscarMascota(id);
}

//Busco la mascota por su ID y la cargo en sus respectivos textboxs
function BuscarMascota(id:number)
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

}

function Eliminar(id: number) {
   
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

function eliminarMascota(id:number)
{
    
    //Traigo las mascotas del localStorage
    /*let mascotasString: string | null = localStorage.getItem("Mascotas");
    let MascotasJSON: clases.Mascota[] = mascotasString == null ? [] : JSON.parse(mascotasString);*/

    //Traigo las mascotas del localStorage - a traves de la funcion "traerMascotas()"
    let ListMascotas: clases.Mascota[] = traerMascotas();

    //filtro el array y actualizo el localstorage
    let mascotasActuales: Array<clases.Mascota>;
    mascotasActuales = ListMascotas.filter(function (mascota: clases.Mascota) {
        return Number(mascota.id) != Number(id);
    })

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
function traerMascotas():Array<clases.Mascota>  {
    

    //Obtengo el local storage controlando que no sea Null
    /*let mascotaString: string | null = localStorage.getItem("Mascotas");

    //Controlo que no sea vacio para convertir a JSON
    let MascotasJSON: JSON[] = mascotaString == null ? [] : JSON.parse(mascotaString);*/

     //Obtengo el local storage controlando que no sea Null
    let mascotasString: string | null = localStorage.getItem("Mascotas");

    //Controlo que no sea vacio para convertir a JSON
    let MascotasJSON: clases.Mascota[] = mascotasString == null ? [] : JSON.parse(mascotasString);

    return MascotasJSON;

}

function obtenerIndex(id:number)
{  
    let ListMascotas: clases.Mascota[] = traerMascotas();

    for (let index = 0; index < ListMascotas.length; index++) {
        if (ListMascotas[index].id == id)
        {
            return Number(index);
        }
        
    }

}