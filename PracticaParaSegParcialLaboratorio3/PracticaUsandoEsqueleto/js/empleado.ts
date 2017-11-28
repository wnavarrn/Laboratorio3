namespace clases{

    export class Empleado extends Persona {

        public horario: clases.enumHorario;
        public legajo: number;

        public constructor(nombre: string, apellido: string, edad: number, horario: clases.enumHorario, legajo: number) {
            super(nombre, apellido, edad);
            this.horario = horario;
            this.legajo = legajo;
        }

        public empleadoToJSON(): string {
            let json = super.toJSON() + "horario:" + this.legajo + ",legajo:" + this.legajo + "}";
            return json;
        }

        //Traigo todas las mascotas del localstorage
        public static traerEmpleados(): Array<clases.Empleado> {
            //Obtengo el local storage controlando que no sea Null
            let empleadosString: string | null = localStorage.getItem("Empleados");
            //Controlo que no sea vacio para convertir a JSON
            let EmpleadosJSON: clases.Empleado[] = empleadosString == null ? [] : JSON.parse(empleadosString);
            return EmpleadosJSON;
        }

        //Obtengo el indice del array de empleados
        public static obtenerIndex(legajo: number) {

            let ListEmpleados: clases.Empleado[] = clases.Empleado.traerEmpleados();

            for (let index = 0; index < ListEmpleados.length; index++) {
                if (ListEmpleados[index].legajo == legajo) {
                    return Number(index);
                }

            }

        }

        public static eliminarEmpleado(legajo: number) {

            //Traigo los empleados del localStorage - a traves de la funcion "traerMascotas()"
            let ListEmpleados: clases.Empleado[] = clases.Empleado.traerEmpleados();

            let indice: any = clases.Empleado.obtenerIndex(Number(legajo));
            ListEmpleados.splice(indice, 1);

            //Tengo que actualizar el localstorage
            limpiarLocalstorage();

            //Agrego la nueva lista al localstorage
            localStorage.setItem("Empleados", JSON.stringify(ListEmpleados));

            //mensaje que elimino la mascota
            alert("Empleado Eliminado correctamente");

            //Armo la tabla actualizada
            clases.Empleado.armarTablaEmpleados(ListEmpleados);
        }

        //Funcion que me arma la tabla de Mascotas con el Array que le paso por parametro
        public static armarTablaEmpleados(EmpleadoJSON: clases.Empleado[]) 
        {
            //Limpio el dvi de la tabla
            $("#myTable").html("");

            let tabla: string = ` <table id="TblEmpleados" class="table">
                                    <thead>
                                    <tr>
                                        <th class="id">LEGAJO</th>
                                        <th class="nombre">NOMBRE</th>
                                        <th class="edad">APELLIDO</th>                                       
                                        <th class="patas">EDAD</th>
                                        <th>TIPO</th>
                                        <th>ACCIÓN</th>
                                    </tr>
                                    </thead>
                                    <tbody>`;

            for (let i = 0; i < EmpleadoJSON.length; i++) 
            {
                tabla +=
                ` <tr><td class="id">${EmpleadoJSON[i].legajo}</td>
                <td class="nombre">${EmpleadoJSON[i].nombre}</td>
                <td class="edad">${EmpleadoJSON[i].apellido}</td>
                <td class="patas">${EmpleadoJSON[i].edad}</td>
                <td><input id='btnModificar' class='btn btn-primary' type='button' value='Modificar' onclick='Traer(" ${EmpleadoJSON[i].legajo} ");'/>
                <input id='btnEliminar' class='btn btn-danger' type='button' value='Eliminar' onclick='Eliminar(" ${EmpleadoJSON[i].legajo} ");'/></td>
                </tr>`;
            }

             tabla += `</tbody></table>`;

            $("#myTable").html(tabla);
        }
    }
}