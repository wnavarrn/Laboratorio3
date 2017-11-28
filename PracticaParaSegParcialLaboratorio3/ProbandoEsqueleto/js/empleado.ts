namespace clases {

    export class empleado extends clases.persona{

        public horario: clases.enumHorario;
        public legajo: number;

        /*public constructor(nombre: string, apellido: string, edad: number, horario: clases.enumHorario, legajo: number) {
            super(nombre, apellido, edad);
            this.horario = horario;
            this.legajo = legajo;
        }*/

        /*public empleadoToJSON(): string {
            let json = super.toJSON() + "horario:" + this.legajo + ",legajo:" + this.legajo + "}";
            return json;
        }*/
    }
}