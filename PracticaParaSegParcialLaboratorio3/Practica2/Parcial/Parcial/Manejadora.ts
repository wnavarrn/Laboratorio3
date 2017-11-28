/// <reference path="./Empleado.ts" />
namespace Clases 
{
	export class Manejadora{
     
      public static agregarEmpleado():void{
     
        let Nombre:string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
        let Apellido:string = (<HTMLInputElement>document.getElementById("txtApellido")).value;
        let Edad:number = Number((<HTMLInputElement>document.getElementById("txtEdad")).value);
        let Legajo:number = Number((<HTMLInputElement>document.getElementById("txtLegajo")).value);
        let Horario:string = (<HTMLInputElement>document.getElementById("selHorario")).value;
 
      
        let empleadoString = localStorage.getItem("Empleado");
      
        let empleadosJSON:Array<any>  = empleadoString == null ? [] : JSON.parse(empleadoString);
       
        let empleado : Empleado = new Empleado(Nombre,Apellido,Edad,Legajo,Horario);
        
        let indiceElemento:string = (<HTMLInputElement>document.getElementById("hdnIdEmpleado")).value;
            if(indiceElemento !== "") 
            {
                let i:number = Number(indiceElemento); 
                console.log("Entidades a modificar");
                console.log( empleadosJSON[i]); 
                empleadosJSON.splice(i,1);  
  
                localStorage.clear();            

            }
            empleadosJSON.push(JSON.parse(empleado.ToJSON())); 
            localStorage.setItem("Empleado", JSON.stringify(empleadosJSON)); 

          

            Manejadora.LimpiarForm();

            (<HTMLInputElement>document.getElementById("txtNombre")).focus();

      }

       private static LimpiarForm() {
            (<HTMLInputElement>document.getElementById("txtApellido")).value = "";
            (<HTMLInputElement>document.getElementById("txtNombre")).value = "";
            (<HTMLInputElement>document.getElementById("txtEdad")).value = "";
            (<HTMLInputElement>document.getElementById("txtLegajo")).value = "";
            (<HTMLInputElement>document.getElementById("selHorario")).value = "Mañana";

        }




     public static mostrarEmpleado():void
        {
            console.log("Mostrar Empleado");         
            let empleadosString = localStorage.getItem("Empleado"); 
            let empleadosJSON : Array<any> = JSON.parse(empleadosString);
            let tabla:string = "<table class='table'><thead><tr><th>NOMBRE</th><th>APELLIDO</th>";
            tabla += "<th>EDAD</th><th>LEGAJO</th><th>HORARIO</th><th>ACCION</th></thead></tr>";
          
            if(empleadosJSON !== null){
                for(let i:number=0; i< empleadosJSON.length; i++)
                {
                    console.log(empleadosJSON[i]);
                  
                    tabla += "<tr><td>"+empleadosJSON[i].nombre+"</td><td>"+empleadosJSON[i].apellido+"</td><td>"+empleadosJSON[i].edad+"</td><td>"+
                                        empleadosJSON[i].legajo+"</td><td>"+empleadosJSON[i].horario+
                        "<input type='button' value='Eliminar' onclick='Clases.Manejadora.eliminarEmpleado("+i+")' class='btn btn-danger'>"+
                        "<input type='button' class='btn btn-success' value='Modificar' onclick='Clases.Manejadora.modificarEmpleado("+i+")'> </td></tr>";
                }
            }
        
            tabla += "</table>";

         
            (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = tabla;
        }



        public static eliminarEmpleado(i:number):void
        {
        	 
            let empleadosString = localStorage.getItem("Empleado");
            let empleadosJSON:Array<any>  = JSON.parse(empleadosString);
            console.log("Entidad a eliminar");
            console.log(empleadosJSON[i]);
           
            empleadosJSON.splice(i,1);     
            localStorage.clear();          
        
            localStorage.setItem("Empleado", JSON.stringify(empleadosJSON));
            Manejadora.mostrarEmpleado();
        }

      public static modificarEmpleado(i:number):void
        {
            let entidadesString = localStorage.getItem("Empleado");
            let entidadesJSON = JSON.parse(entidadesString);   
            (<HTMLInputElement>document.getElementById("hdnIdEmpleado")).value = i.toString();         
            console.log(entidadesJSON[i]);

            let nombre:string = entidadesJSON[i].nombre;
            let apellido:string = entidadesJSON[i].apellido;
            let edad:number = Number(entidadesJSON[i].edad);
            let legajo:number = Number(entidadesJSON[i].legajo);
            let horario:string = entidadesJSON[i].horario;
            
                        
            (<HTMLInputElement>document.getElementById("txtNombre")).value = nombre;
            (<HTMLInputElement>document.getElementById("txtApellido")).value = apellido;
            (<HTMLInputElement>document.getElementById("txtEdad")).value = edad.toString();
            (<HTMLInputElement>document.getElementById("txtLegajo")).value = legajo.toString();
            (<HTMLInputElement>document.getElementById("selHorario")).value = horario;
            
           

        }


        public static modificar():void
        {
            //obtengo el id desde el campo hidden  
            let i:number = Number((<HTMLInputElement>document.getElementById("hdnIdEmpleado")).value);

            //obtengo los demas datos leyendo los campos
            let nombre:string =  (<HTMLInputElement>document.getElementById("txtNombre")).value;
            let apellido:string = (<HTMLInputElement>document.getElementById("txtApellido")).value;
            let edad:number =  Number((<HTMLInputElement>document.getElementById("txtEdad")).value);
            let legajo:number =  Number(  (<HTMLInputElement>document.getElementById("txtLegajo")).value);
            let horario:string =   (<HTMLInputElement>document.getElementById("txtHorario")).value;
              
      
            (<HTMLInputElement>document.getElementById("txtNombre")).value = nombre;
            (<HTMLInputElement>document.getElementById("txtApellido")).value = apellido;
            (<HTMLInputElement>document.getElementById("txtEdad")).value = edad.toString();
            (<HTMLInputElement>document.getElementById("txtLegajo")).value = legajo.toString();
            (<HTMLInputElement>document.getElementById("txtHorario")).value = horario;


            (<HTMLInputElement>document.getElementById("hdnIdEmpleado")).value = i.toString();

        }

   
        public static filtrarPorHorario():void
        {
            console.log("Mostrar empleados Filtrados");
            let empleadosString = localStorage.getItem("Empleado");
            let empleadosJSON:Array<any> = JSON.parse(empleadosString);

            let filtro:string = (<HTMLInputElement>document.getElementById("selHorario")).value;

            let tabla:string = "<table class='table'><thead><tr><th>NOMBRE</th><th>APELLIDO</th>";
            tabla += "<th>EDAD</th><th>LEGAJO</th><th>HORARIO</th></thead></tr>";

            if(empleadosJSON !== null){
               let filtrados:Array<any> = empleadosJSON.filter(function(obj){
                                                                return obj.horario === filtro;
                                                            }).map(function (obj) {
                                                                return obj;
                                                            });;
                for(let i:number=0; i< filtrados.length; i++)
                {
                    console.log(filtrados[i]);
                    tabla += "<tr><td>"+filtrados[i].nombre+"</td><td>"+
                             "</td><td>"+filtrados[i].apellido+"</td></td>"+
                             "</td><td>"+filtrados[i].edad+"</td></td>"+
                             "</td><td>"+filtrados[i].legajo+"</td></td>"+
                             "</td><td>"+filtrados[i].horario+"</td> </tr>";
                }
            }

            tabla += "</table>";

            (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = tabla;
        }



      public static promedioEdadPorHorario():void
        {
         
            let empleadosString = localStorage.getItem("Empleado");
            let empleadosJSON:Array<any> = JSON.parse(empleadosString);

            let filtro1:string = (<HTMLInputElement>document.getElementById("selHorario")).value;
           


            let input :string = "";


            if(empleadosJSON !== null){
               let promedio:Array<any> = empleadosJSON.filter(function(obj){
                                                                return obj.horario === filtro1 ;
                                                            }).reduce(function (x,obj) {
                                                                return x + obj.edad / empleadosJSON.length  ;
                                                            },0);;
                
                input += "<input type='text' value='"+promedio+"' id='promedio'>";
                            
                }
            
            (<HTMLDivElement>document.getElementById("divPromedio")).innerHTML = input;
        }



	}

}