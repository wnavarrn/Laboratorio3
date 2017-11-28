namespace clases{
    
    export class Mascota extends clases.Animal{

        public id:number;
        public tipo:tipoMascota;

        public constructor(id:number,tipo:tipoMascota, nombre:string, edad:number, patas:number) {
            super(nombre, edad, patas, );
            this.id = id;
            this.tipo = tipo;
        }

        public toJSON():string
        {
            let cad:string = super.toJSON().replace("}","");

            let json: string = cad + `,"id":"${this.id}","tipo":"${this.tipo}"}`;

            return json;
            
        }
    }
}