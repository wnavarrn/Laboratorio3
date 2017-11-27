Array.prototype.unique = function (a) {
    return function () { return this.filter(a) }
}(function (a, b, c) {
    return c.indexOf(a, b + 1) < 0
});

$(document).ready(function () {

    cargarPaises();

    $("#countries").change(function(){
        limpiarCuidades();
        cargarCuidades(this.value);

    });

});

function cargarPaises() {

    var paises = data.map(function(p){
        return p.pais;
    })
    .unique()
    .sort();
    
    $.each(paises, function(NULL,pais){        
        $("#countries").append($('<option></option>').val(pais).html(pais));
    });
}

function cargarCuidades(valor) {

    var cuidades = data.filter(function(data) {
        return data.pais === valor;
    })
    .map(function (c) {
        return c.ciudad;
    }).unique()
    .sort();

    $.each(cuidades, function (NULL, ciudad) {
        $("#cities").append($('<option></option>').val(ciudad).html(ciudad));
    });
   
}

function limpiarCuidades(){


    $('#cities')
        .find('option')
        .remove()
        .end()
        ;


}