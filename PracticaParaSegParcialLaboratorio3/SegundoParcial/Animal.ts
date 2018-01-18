 
 namespace  clases
 {
 
 export class  Animal
{
    nombre:string;
    edad:number;
    cantidad_patas:number;


constructor(nom:string,ed:number,cant:number)
{
    this.nombre=nom;
    this.edad=ed;
    this.cantidad_patas=cant;
}



public AnimalJson():string
{
    return `${this.nombre}, ${this.edad}, ${this.cantidad_patas}`;
}



}
 }
