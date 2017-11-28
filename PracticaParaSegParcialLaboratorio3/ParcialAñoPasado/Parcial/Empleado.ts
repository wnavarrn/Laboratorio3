/// <reference path="./Persona.ts" />
namespace Clases{

    export /** 
     * Empleado
     */
     class Empleado extends Clases.Persona {

        public legajo:number;
        public horario:string;
       
     public constructor (nombre:string, apellido:string, edad:number,legajo: number, horario: string) {
       super(nombre, apellido, edad);
       this.legajo=legajo;
       this.horario=horario;
     }


       

        public ToJSON():string
        {
            let dato : string = `"legajo" : "${this.legajo}" , "horario" : "${this.horario}"}`;
                             
            return super.ToJSON().concat(dato);      
        }
        
    }

}