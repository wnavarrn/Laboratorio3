"use strict";
$(function () {
    localStorage.clear();
    $('#btnAgregar').click(function () {
        agregarMascota();
    });
});
function agregarMascota() {
    //Obtengo todos los campos de formulario
    var id = Number($("#txtId").val());
    var nombre = String($("#txtNombre").val());
    var edad = Number($("#txtEdad").val());
    var tipo = Number(($("#ddlTipo").val()));
    var patas = Number($("ddlCantPatas").val());
    //Seteo el nuevo objeto
    var nuevaMascota = new clases.Mascota(id, tipo, nombre, edad, patas);
    //Obtengo el local storage controlando que no sea Null
    var mascotaString = localStorage.getItem("Mascotas");
    //Controlo que no sea vacio para convertir a JSON
    var MascotaJSON = mascotaString == null ? [] : JSON.parse(mascotaString);

    
    console.log(nuevaMascota.toJSON());
}
