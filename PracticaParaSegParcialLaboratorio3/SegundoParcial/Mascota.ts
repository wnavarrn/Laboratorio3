/// <reference path="Animal.ts" />
namespace clases
{
    
 export class Mascota extends clases.Animal
{
   id:number;
   tipo:string;
   

   constructor(identidad:number,nom:string,ed:number,cantPatas:number,tip:string)
   {
       super(nom,ed,cantPatas);
       this.id=identidad;
       this.tipo=tip;

   }

   public MascotaJson():string{
      let json= super.AnimalJson() +  `${this.id},${this.tipo}`
      return json;

   }
}
}


 


 


