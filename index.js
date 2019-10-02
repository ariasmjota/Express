// Arreglos
var listPersonas = [{
    name: "Santiago",
    age: 21,
    semester: 9
},{
    name: "Vavs",
    age: 22,
    semester: 7
},{
    name: "Medina",
    age: 20,
    semester: 9
},{
    name: "Isabella",
    age: 19,
    semester: 4
},{
    name: "Majo",
    age: 19,
    semester: 6
}];
//-----------Importar modulos e instancias-----//
// importar handlebars :)
var exphbs  = require('express-handlebars');
 
// Importar modulo
const express=require('express');

//Intanciar bodyparser despues de instalarlo en git bash
 var bodyParser = require('body-parser');

 // importar file system para poder crear archivos txt, ya viene instalado pero toca instanciarlo
 var fs = require('fs');

//-----Configuracion de la app-----------//

 //Instanciar app
const app=express();

//lineas de handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// configuración body parser para poder usar variables post en el body
app.use(bodyParser.urlencoded({ extended: true }));

//definir el puerto_ usualmente el 3000
const port = 3000;

//Aqui es donde se define la carpeta como publica
app.use(express.static('public'));


/* acciones del usuario al servidor
app.get(); //traer informacion del servidor
app.post(); //enviar nueva infromacion lo envia el usuario al servidor
app.put(); // modificar algo que ya esta
app.delete(); //eliminar alguna informacion que ya esta
*/

// la ruta recibe dos cosas '/aque va a responder', la funcion a la cual va a responder
//definir ruta tipo get y su funcion 
app.get('/', (request, response) =>{
    
console.log('alguien entro a la ruta inicial');


// funciones para organizar la lista 

    function compareAge(a, b){
        return a.age - b.age;
    };

    function compareSemester(a, b){
        return a.semester - b.semester;
    };

    function compareName(a, b){
        return a.name - b.name;
    };


    var filtro;

    if(request.query.f){
        
        // copiar la lista para que no se me reinicie por el .sort
    
        filtro = request.query.f;

        console.log(filtro);

        if(filtro == "age"){
            listPersonas.sort(compareAge);
        }

        if(filtro == "semester"){
            listPersonas.sort(compareSemester);
        }

        if(filtro == "name"){
            listPersonas.sort(compareName);
        }
    }



var context={
    arreglo: listPersonas,
    filtro: filtro
};

response.render('home', context);

});

//definimos una nueva ruta y le damos una respuesta
app.get('/contact/:name',(request, response) =>{
    console.log('Alguien entreo a la ruta de contancto');
    //Siempre tiene que dar una respuesta, SOLO UNA RESPUESTA
// guardo el name como un parametro para crear la pagina por persona 
    var name = request.params.name;
    var persona = listPersonas.find( (p) => { return p.name == name });
    var context={
        persona: persona
    };
    // Renderizo pagina por persona 
    response.render('contact', context);
});


// inicar servidor en el puerto definido anteriormente
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});