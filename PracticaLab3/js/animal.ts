namespace clases{
    
    export abstract class Animal {

        nombre:string;
        edad:number;
        patas:number;

        constructor(nombre:string,edad:number,patas:number) {
            this.nombre = nombre;
            this.edad = edad;
            this.patas = patas;
        }

        public toJSON():string{
            let json: string = `{"Nombre":"${this.nombre}","Edad":"${this.edad}","patas":"${this.patas}"`;
            return json;
        }
    }
}