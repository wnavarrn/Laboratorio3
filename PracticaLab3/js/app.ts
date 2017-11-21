$(function(){

    localStorage.clear();

    $('#btnAgregar').click(function () {
        agregarMascota();
    });
});


function agregarMascota():void
{
    //Obtengo todos los campos de formulario
    let id:number = Number($("#txtId").val());
    let nombre: string = String($("#txtNombre").val());
    let edad: number =  Number($("#txtEdad").val());
    let tipo : clases.tipoMascota = Number(($("#ddlTipo").val()));
    let patas: number = Number($("ddlCantPatas").val());

    //Seteo el nuevo objeto
    let nuevaMascota =  new clases.Mascota(id,tipo,nombre,edad,patas);

    //Obtengo el local storage controlando que no sea Null
    let mascotaString: string|null = localStorage.getItem("Mascotas");

    //Controlo que no sea vacio para convertir a JSON
    let MascotasJSON: JSON[] = mascotaString == null ? [] : JSON.parse(mascotaString);

    console.log(nuevaMascota.toJSON());

    //lo convierto a Json y lo pongo dentro del array
    MascotasJSON.push(JSON.parse(nuevaMascota.toJSON()));

    localStorage.setItem("Mascotas", JSON.stringify(MascotasJSON));

    alert("Mascota guardada correctamente");

    mostrarMascotas();

    limpiarCampos();

}

function limpiarCampos():void{
    $("#txtId").val('');
    $("#txtNombre").val('');
    $("#txtEdad").val('');
    $("#ddlTipo").val(0);
    $("#ddlcantpatas").val(0);

    $("#txtId").focus();
}

function mostrarMascotas()
{
    alert("Estoy en mostrar tabla");

    let mascotasString: string|null = localStorage.getItem("Mascotas");

    let MascotasJSON: clases.Mascota[] = mascotasString == null ? [] : JSON.parse(mascotasString);

    console.log(MascotasJSON);


    let tabla: string = ` <table class="table">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Edad</th>                                       
                                        <th>patas</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>`;
        for (let i = 0; i = MascotasJSON.length; i++)
        {
            tabla += 
                `<td>${ MascotasJSON[i].id }</td>
                <td>${ MascotasJSON[i].nombre }</td>
                <td>${ MascotasJSON[i].edad }</td>
                <td>${ MascotasJSON[i].patas }</td>`;
        }

        tabla += `</tr></tbody></table>`;

        $("#myTable").html(tabla);


}