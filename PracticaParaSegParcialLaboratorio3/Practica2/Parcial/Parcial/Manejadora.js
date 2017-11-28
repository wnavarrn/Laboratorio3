/// <reference path="./Empleado.ts" />
var Clases;
(function (Clases) {
    var Manejadora = (function () {
        function Manejadora() {
        }
        Manejadora.agregarEmpleado = function () {
            var Nombre = document.getElementById("txtNombre").value;
            var Apellido = document.getElementById("txtApellido").value;
            var Edad = Number(document.getElementById("txtEdad").value);
            var Legajo = Number(document.getElementById("txtLegajo").value);
            var Horario = document.getElementById("selHorario").value;
            var empleadoString = localStorage.getItem("Empleado");
            var empleadosJSON = empleadoString == null ? [] : JSON.parse(empleadoString);
            var empleado = new Clases.Empleado(Nombre, Apellido, Edad, Legajo, Horario);
            var indiceElemento = document.getElementById("hdnIdEmpleado").value;
            if (indiceElemento !== "") {
                var i = Number(indiceElemento);
                console.log("Entidades a modificar");
                console.log(empleadosJSON[i]);
                empleadosJSON.splice(i, 1);
                localStorage.clear();
            }
            empleadosJSON.push(JSON.parse(empleado.ToJSON()));
            localStorage.setItem("Empleado", JSON.stringify(empleadosJSON));
            Manejadora.LimpiarForm();
            document.getElementById("txtNombre").focus();
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById("txtApellido").value = "";
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtEdad").value = "";
            document.getElementById("txtLegajo").value = "";
            document.getElementById("selHorario").value = "Mañana";
        };
        Manejadora.mostrarEmpleado = function () {
            console.log("Mostrar Empleado");
            var empleadosString = localStorage.getItem("Empleado");
            var empleadosJSON = JSON.parse(empleadosString);
            var tabla = "<table class='table'><thead><tr><th>NOMBRE</th><th>APELLIDO</th>";
            tabla += "<th>EDAD</th><th>LEGAJO</th><th>HORARIO</th><th>ACCION</th></thead></tr>";
            if (empleadosJSON !== null) {
                for (var i = 0; i < empleadosJSON.length; i++) {
                    console.log(empleadosJSON[i]);
                    tabla += "<tr><td>" + empleadosJSON[i].nombre + "</td><td>" + empleadosJSON[i].apellido + "</td><td>" + empleadosJSON[i].edad + "</td><td>" +
                        empleadosJSON[i].legajo + "</td><td>" + empleadosJSON[i].horario +
                        "<input type='button' value='Eliminar' onclick='Clases.Manejadora.eliminarEmpleado(" + i + ")' class='btn btn-danger'>" +
                        "<input type='button' class='btn btn-success' value='Modificar' onclick='Clases.Manejadora.modificarEmpleado(" + i + ")'> </td></tr>";
                }
            }
            tabla += "</table>";
            document.getElementById("divTabla").innerHTML = tabla;
        };
        Manejadora.eliminarEmpleado = function (i) {
            var empleadosString = localStorage.getItem("Empleado");
            var empleadosJSON = JSON.parse(empleadosString);
            console.log("Entidad a eliminar");
            console.log(empleadosJSON[i]);
            empleadosJSON.splice(i, 1);
            localStorage.clear();
            localStorage.setItem("Empleado", JSON.stringify(empleadosJSON));
            Manejadora.mostrarEmpleado();
        };
        Manejadora.modificarEmpleado = function (i) {
            var entidadesString = localStorage.getItem("Empleado");
            var entidadesJSON = JSON.parse(entidadesString);
            document.getElementById("hdnIdEmpleado").value = i.toString();
            console.log(entidadesJSON[i]);
            var nombre = entidadesJSON[i].nombre;
            var apellido = entidadesJSON[i].apellido;
            var edad = Number(entidadesJSON[i].edad);
            var legajo = Number(entidadesJSON[i].legajo);
            var horario = entidadesJSON[i].horario;
            document.getElementById("txtNombre").value = nombre;
            document.getElementById("txtApellido").value = apellido;
            document.getElementById("txtEdad").value = edad.toString();
            document.getElementById("txtLegajo").value = legajo.toString();
            document.getElementById("selHorario").value = horario;
        };
        Manejadora.modificar = function () {
            //obtengo el id desde el campo hidden  
            var i = Number(document.getElementById("hdnIdEmpleado").value);
            //obtengo los demas datos leyendo los campos
            var nombre = document.getElementById("txtNombre").value;
            var apellido = document.getElementById("txtApellido").value;
            var edad = Number(document.getElementById("txtEdad").value);
            var legajo = Number(document.getElementById("txtLegajo").value);
            var horario = document.getElementById("txtHorario").value;
            document.getElementById("txtNombre").value = nombre;
            document.getElementById("txtApellido").value = apellido;
            document.getElementById("txtEdad").value = edad.toString();
            document.getElementById("txtLegajo").value = legajo.toString();
            document.getElementById("txtHorario").value = horario;
            document.getElementById("hdnIdEmpleado").value = i.toString();
        };
        Manejadora.filtrarPorHorario = function () {
            console.log("Mostrar empleados Filtrados");
            var empleadosString = localStorage.getItem("Empleado");
            var empleadosJSON = JSON.parse(empleadosString);
            var filtro = document.getElementById("selHorario").value;
            var tabla = "<table class='table'><thead><tr><th>NOMBRE</th><th>APELLIDO</th>";
            tabla += "<th>EDAD</th><th>LEGAJO</th><th>HORARIO</th></thead></tr>";
            if (empleadosJSON !== null) {
                var filtrados = empleadosJSON.filter(function (obj) {
                    return obj.horario === filtro;
                }).map(function (obj) {
                    return obj;
                });
                ;
                for (var i = 0; i < filtrados.length; i++) {
                    console.log(filtrados[i]);
                    tabla += "<tr><td>" + filtrados[i].nombre + "</td><td>" +
                        "</td><td>" + filtrados[i].apellido + "</td></td>" +
                        "</td><td>" + filtrados[i].edad + "</td></td>" +
                        "</td><td>" + filtrados[i].legajo + "</td></td>" +
                        "</td><td>" + filtrados[i].horario + "</td> </tr>";
                }
            }
            tabla += "</table>";
            document.getElementById("divTabla").innerHTML = tabla;
        };
        Manejadora.promedioEdadPorHorario = function () {
            var empleadosString = localStorage.getItem("Empleado");
            var empleadosJSON = JSON.parse(empleadosString);
            var filtro1 = document.getElementById("selHorario").value;
            var input = "";
            if (empleadosJSON !== null) {
                var promedio = empleadosJSON.filter(function (obj) {
                    return obj.horario === filtro1;
                }).reduce(function (x, obj) {
                    return x + obj.edad / empleadosJSON.length;
                }, 0);
                ;
                input += "<input type='text' value='" + promedio + "' id='promedio'>";
            }
            document.getElementById("divPromedio").innerHTML = input;
        };
        return Manejadora;
    }());
    Clases.Manejadora = Manejadora;
})(Clases || (Clases = {}));
