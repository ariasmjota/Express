// Importar modulo
const express=require('express');

//Instanciar app
const app=express();

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
response.send('Hola, entraste a la ruta inicial')
});

//definimos una nueva ruta y le damos una respuesta
app.get('/contacto',(request, response) =>{
    console.log('Alguien entreo a la ruta de contancto');
    //Siempre tiene que dar una respuesta, SOLO UNA RESPUESTA
    // El send siempre envia como el html
    //Asi se manda el html __ Existe una variable dirname que node crea por defento y queda la ruta de la carpeta donde se esta ejecutando
    response.sendFile(__dirname +'/public/contact.html');
});

app.listen(port, () =>{
console.log(`El servidor se ha iniciado en el ${port}`);
});