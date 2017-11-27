//console.log(data);

/*
    realizar las operaciones usando los metodos map,  reduce y filter y combinaciones entre ellos
  */


var soluciones = {data};

// Retornar un array con los nombres de los usuarios femeninos

soluciones.usuariosFemeninos = function(usuarios){
    return usuarios
    .filter(function(user){
        return user.genero === 'Female';
    })
    .map(function(user){
        return user.nombre;
    });
}

//FUNCIONA
//console.log(soluciones.usuariosFemeninos(data));

// Retornar un array de strings (el email de los usuarios de sexo masculino)

soluciones.mailsVarones = function(usuarios){
   return usuarios
   .filter(function(user){
       return user.genero === "Male";
   })
   .map(function(user){
       return user.email;
   });
}

//FUNCIONA
//console.log(soluciones.mailsVarones(data));

// Retornar un array de objetos que solo contengan las claves nombre, email y edad, de todos los usuarios mayores que 'edad'

soluciones.usuariosMayores = function(usuarios, edad){
    return usuarios
    .filter(function(user){
        return user.edad > edad;
    })
    .map(function(user){
        
        x ={}
        x.nombre= user.nombre,
        x.email= user.email,
        x.edad= user.edad
        return x;

    });
}

//FUNCIONA
//console.log(soluciones.usuariosMayores(data, 40));

// Retornar un objeto que contenga solo el nombre y la edad del usuario mas grande.

soluciones.usuarioMasGrande = function(usuarios){
    return usuarios
    .reduce(function(actual,siguiente){
        if(actual.edad > siguiente.edad){
            return{
                nombre:actual.nombre,
                edad: actual.edad
            }
        }
        return{
            nombre: siguiente.nombre,
            edad: siguiente.edad
        }
    })
}

//FUNCIONA
//console.log(soluciones.usuarioMasGrande(data));

// Retornar el promedio de edad de los usuarios (number)

soluciones.promedio = function(usuarios){
    var acumEdad = usuarios
  .reduce(function(actual,siguiente){
    return actual + siguiente.edad;
  },0);

    var cantidad =  usuarios
  .reduce(function(actual,siguiente){
    return actual + 1; 
  },0);

    return (acumEdad /cantidad).toFixed(2);
}

//FUNCIONA
//console.log("Promedio edad usuarios " + soluciones.promedio(data));

// Retornar el promedio de edad de los usuarios hombres (number)

soluciones.promedioVarones = function(usuarios){
   
    var acumEdad = usuarios
    .filter(function(user){
        return user.genero == "Male";
    })
        .reduce(function (actual, siguiente) {
            return actual + siguiente.edad;
        }, 0);

    var cantidad = usuarios
        .reduce(function (actual, siguiente) {
            if(siguiente.genero == "Male")
            return actual + 1;
            else
            return actual;
        }, 0);

    return (acumEdad / cantidad).toFixed(2);
   
}

//FUNCIONA
//console.log("Promedio edad Varones " + soluciones.promedioVarones(data));

 // Retornar el promedio de edad de los usuarios mujeres (number)

soluciones.promedioMujeres = function(usuarios){
   
    var acumEdad = usuarios
        .filter(function (user) {
            return user.genero == "Female";
        })
        .reduce(function (actual, siguiente) {
            return actual + siguiente.edad;
        }, 0);

    var cantidad = usuarios
        .reduce(function (actual, siguiente) {
            if (siguiente.genero == "Female")
                return actual + 1;
            else
                return actual;
        }, 0);

    return (acumEdad / cantidad).toFixed(2);
}

//FUNCIONA
//console.log("Promedio edad Mujeres " + soluciones.promedioMujeres(data));