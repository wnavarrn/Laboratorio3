var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var clases;
(function (clases) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, edad, horario, legajo) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.horario = horario;
            _this.legajo = legajo;
            return _this;
        }
        Empleado.prototype.empleadoToJSON = function () {
            var json = _super.prototype.toJSON.call(this) + "horario:" + this.legajo + ",legajo:" + this.legajo + "}";
            return json;
        };
        //Traigo todas las mascotas del localstorage
        Empleado.traerEmpleados = function () {
            //Obtengo el local storage controlando que no sea Null
            var empleadosString = localStorage.getItem("Empleados");
            //Controlo que no sea vacio para convertir a JSON
            var EmpleadosJSON = empleadosString == null ? [] : JSON.parse(empleadosString);
            return EmpleadosJSON;
        };
        //Obtengo el indice del array de empleados
        Empleado.obtenerIndex = function (legajo) {
            var ListEmpleados = clases.Empleado.traerEmpleados();
            for (var index = 0; index < ListEmpleados.length; index++) {
                if (ListEmpleados[index].legajo == legajo) {
                    return Number(index);
                }
            }
        };
        Empleado.eliminarEmpleado = function (legajo) {
            //Traigo los empleados del localStorage - a traves de la funcion "traerMascotas()"
            var ListEmpleados = clases.Empleado.traerEmpleados();
            var indice = clases.Empleado.obtenerIndex(Number(legajo));
            ListEmpleados.splice(indice, 1);
            //Tengo que actualizar el localstorage
            limpiarLocalstorage();
            //Agrego la nueva lista al localstorage
            localStorage.setItem("Empleados", JSON.stringify(ListEmpleados));
            //mensaje que elimino la mascota
            alert("Empleado Eliminado correctamente");
            //Armo la tabla actualizada
            clases.Empleado.armarTablaEmpleados(ListEmpleados);
        };
        //Funcion que me arma la tabla de Mascotas con el Array que le paso por parametro
        Empleado.armarTablaEmpleados = function (EmpleadoJSON) {
            //Limpio el dvi de la tabla
            $("#myTable").html("");
            var tabla = " <table id=\"TblEmpleados\" class=\"table\">\n                                    <thead>\n                                    <tr>\n                                        <th class=\"id\">LEGAJO</th>\n                                        <th class=\"nombre\">NOMBRE</th>\n                                        <th class=\"edad\">APELLIDO</th>                                       \n                                        <th class=\"patas\">EDAD</th>\n                                        <th>TIPO</th>\n                                        <th>ACCI\u00D3N</th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>";
            for (var i = 0; i < EmpleadoJSON.length; i++) {
                tabla +=
                    " <tr><td class=\"id\">" + EmpleadoJSON[i].legajo + "</td>\n                <td class=\"nombre\">" + EmpleadoJSON[i].nombre + "</td>\n                <td class=\"edad\">" + EmpleadoJSON[i].apellido + "</td>\n                <td class=\"patas\">" + EmpleadoJSON[i].edad + "</td>\n                <td><input id='btnModificar' class='btn btn-primary' type='button' value='Modificar' onclick='Traer(\" " + EmpleadoJSON[i].legajo + " \");'/>\n                <input id='btnEliminar' class='btn btn-danger' type='button' value='Eliminar' onclick='Eliminar(\" " + EmpleadoJSON[i].legajo + " \");'/></td>\n                </tr>";
            }
            tabla += "</tbody></table>";
            $("#myTable").html(tabla);
        };
        return Empleado;
    }(Persona));
    clases.Empleado = Empleado;
})(clases || (clases = {}));
