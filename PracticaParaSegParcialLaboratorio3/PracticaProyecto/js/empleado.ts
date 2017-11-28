namespace clases{

     export class empleado extends clases.persona {

        public legajo:number;
        public turno:clases.turno;

        constructor(nombre:string, apellido:string, edad:number , legajo:number, turno:clases.turno) {
            super(nombre, apellido,edad,);
            this.legajo = legajo;
            this.turno = turno;
        }

         public toJSON(): string {
            let json: string = super.toJSON() + `,"legajo":"${this.legajo}","turno":"${this.legajo}"}`;            
            return json;
         }

    }

}