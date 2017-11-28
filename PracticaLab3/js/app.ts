$(function () {

    //localStorage.clear();
    mostrarMascotas();
    /*$('#btnAgregar').click(function () {
        agregarMascota();
    });*/

    $("#ddlFilterTipo").change(function() {

        var optionSelected = $(this).find("option:selected");
        
        let valueSelected = optionSelected.val();

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


function agregarMascota(): void {
    //Obtengo todos los campos de formulario
    let id: number = Number($("#txtId").val());
    let nombre: string = String($("#txtNombre").val());
    let edad: number = Number($("#txtEdad").val());
    let tipo: clases.tipoMascota = Number(($("#ddlTipo").val()));
    let patas: number = Number($("ddlCantPatas").val());

    //Seteo el nuevo objeto
    let nuevaMascota = new clases.Mascota(id, tipo, nombre, edad, patas);

    //Obtengo el local storage controlando que no sea Null
    let mascotaString: string | null = localStorage.getItem("Mascotas");

    //Controlo que no sea vacio para convertir a JSON
    let MascotasJSON: JSON[] = mascotaString == null ? [] : JSON.parse(mascotaString);

    //console.log(nuevaMascota.toJSON());

    //lo convierto a Json y lo pongo dentro del array
console.log(nuevaMascota.toJSON());

    MascotasJSON.push(JSON.parse(nuevaMascota.toJSON()));

    localStorage.setItem("Mascotas", JSON.stringify(MascotasJSON));

    alert("Mascota guardada correctamente");

    mostrarMascotas();

    limpiarCampos();

}

function limpiarCampos(): void {
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

    let mascotasString: string | null = localStorage.getItem("Mascotas");

    let MascotasJSON: clases.Mascota[] = mascotasString == null ? [] : JSON.parse(mascotasString);

    let tabla: string = ` <table id="someTable" class="table">
                                    <thead>
                                    <tr>
                                        <th class="id">Id</th>
                                        <th class="name">Nombre</th>
                                        <th>Edad</th>                                       
                                        <th>patas</th>
                                        <th>TIPO</th>
                                    </tr>
                                    </thead>
                                    <tbody>`;
    for (let i = 0; i < MascotasJSON.length; i++) {
        tabla +=
            ` <tr><td class="id">${MascotasJSON[i].id}</td><td class="name">${MascotasJSON[i].nombre}</td><td>${MascotasJSON[i].edad}</td><td>${MascotasJSON[i].patas}</td><td>${clases.tipoMascota[MascotasJSON[i].tipo]}</td></tr>`;
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

    $("#myTable").html("");

    let tabla: string = ` <table class="table">
    <thead>
    <tr>
    <th>Id</th>
    <th>Nombre</th>
    <th>Edad</th>                                       
    <th>patas</th>
    <th>TIPO</th>
    </tr>
    </thead>
    <tbody>`;
    for (let i = 0; i < mascotasFiltradas.length; i++) {
        tabla +=
        ` <tr><td>${mascotasFiltradas[i].id}</td><td>${mascotasFiltradas[i].nombre}</td><td>${mascotasFiltradas[i].edad}</td><td>${mascotasFiltradas[i].patas}</td><td>${clases.tipoMascota[mascotasFiltradas[i].tipo]}</td></tr>`;
    }

    tabla += `</tbody></table>`;

    $("#myTable").html(tabla);



}
