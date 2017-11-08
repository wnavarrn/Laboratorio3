// Funciones Básicas
/*function sumar( a, b ){
  return a + b;
}*/
function sumar(a:number, b:number):number{
  return a + b;
}
/*
var contar = function( heroes ){
  return heroes.length;
}*/
let contar = (heroes:string[])=> heroes.length;
let superHeroes:string[] = ["Flash", "Arrow", "Superman", "Linterna Verde"];
contar(superHeroes);

//Parametros por defecto
function llamarBatman(llamar:boolean=true):string{
  if(llamar){
    return "Batiseñal activada";
  }
}
llamarBatman();

// Rest?
function unirheroes( ...personas:string[] ){
  return personas.join(", ");
}


// Tipo funcion
function noHaceNada( numero, texto, booleano, arreglo ){
}

// Crear el tipo de funcion que acepte la funcion "noHaceNada"
var noHaceNadaTampoco;
