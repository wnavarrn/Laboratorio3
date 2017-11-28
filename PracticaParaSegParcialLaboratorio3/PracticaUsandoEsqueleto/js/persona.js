var clases;
(function (clases) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Persona.prototype.toJSON = function () {
            var json = "{\"nombre\":\"" + this.nombre + "\",\"apellido\":\"" + this.apellido + "\",\"edad\":\"" + this.edad + "\"";
            return json;
        };
        return Persona;
    }());
    clases.Persona = Persona;
})(clases || (clases = {}));
