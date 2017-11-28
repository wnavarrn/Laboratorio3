namespace clases{

    export abstract class persona {

        public nombre:string;
        public apellido:string;
        public edad:number;

        constructor(nombre:string, apellido:string, edad:number) {
            
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }

        public toJSON(): string {
            let json: string = `{"nombre":"${this.nombre}","apellido":"${this.apellido}","edad":"${this.edad}"`;
            return json;
        }
    }

}