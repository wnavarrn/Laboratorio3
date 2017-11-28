var Clases;
(function (Clases) {
    var Persona = (function () {
        function Persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Persona.prototype.ToJSON = function () {
            var dato = "{\"nombre\" : \"" + this.nombre + "\" , \"apellido\" : \"" + this.apellido + "\" , \"edad\" : \"" + this.edad + "\",";
            return dato;
        };
        return Persona;
    }());
    Clases.Persona = Persona;
})(Clases || (Clases = {}));
