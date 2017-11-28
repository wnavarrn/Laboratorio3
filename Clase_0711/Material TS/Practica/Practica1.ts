// Tipos
let batman:string = "Bruce";
let superman:string = "Clark";

let existe:boolean = false;

// Tuplas
let parejaHeroes = [batman,superman];
let villano:[string,number,boolean] = ["Lex Lutor",5,true];

// Arreglos
let aliados:string[] = ["Mujer Maravilla","Acuaman","San", "Flash"];

//Enumeraciones
enum FuerzaHeroes
{
  fuerzaFlash = 5,
  fuerzaSuperman = 100,
  fuerzaBatman = 1,
  fuerzaAcuaman = 0
}
//var fuerzaFlash = 5;
//var fuerzaSuperman = 100;
//var fuerzaBatman = 1;
//var fuerzaAcuaman = 0;

// Retorno de funciones
//function activar_batiseñal(){
 // return "activada";
//}

function activar_batiseñal():string
{
  return "Activada";
} 

function pedir_ayuda(){
  console.log("Auxilio!!!");
}

// Aserciones de Tipo
let poder:string = "100";
var largoDelPoder = poder.length;
console.log( largoDelPoder );
