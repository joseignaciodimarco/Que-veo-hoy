//paquetes necesarios para el proyecto
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controladores/controller');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
const puerto = '8080';

app.get('/peliculas/recomendacion', controller.getRecomendacion);
app.get('/peliculas', controller.getList);
app.get('/peliculas/:id', controller.getInfoPelicula);
app.get('/generos', controller.getGeneros);

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

