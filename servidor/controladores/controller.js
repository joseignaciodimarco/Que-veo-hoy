const con = require('../lib/conexionbd');

getList = function(req, res){
    let query = 'SELECT * FROM pelicula '
    
    let clausula = 'where 1 = 1'; //uso la condicion 1 = 1 para simplificar la clausula en caso de que existan filtros 

    if(req.query.anio){
        clausula += ' and anio in('+req.query.anio+')';
    }

    if(req.query.titulo){
        clausula += ' and titulo like "%'+req.query.titulo+'%"';
    }

    if(req.query.genero){
        clausula += ' and genero_id in ('+req.query.genero+')';
    }

    switch(req.query.columna_orden){
        case 'titulo':
            clausula +=  ' ORDER BY titulo ASC ';
            break;
        case 'anio':
            clausula +=  ' ORDER BY anio DESC ';
            break;
        default:
            clausula +=   ' ORDER BY puntuacion DESC ';
    }

    clausula += 'limit 0,'+req.query.cantidad;

   con.query(query + clausula, function (err, resultPeliculas, fields) {
        if (err) throw err;
        con.query('SELECT COUNT(*) AS cantidad FROM pelicula ' + clausula, function (err, resultCantidad, fields) {
            if (err) throw err;
            let respuesta = {
                peliculas: resultPeliculas,
                total: resultCantidad[0].cantidad
            }
            res.send(respuesta);
        }); 
    });
}

getGeneros = function(req, res){
    con.query("SELECT * FROM genero", function (err, result, fields) {
        if (err) throw err;
        let respuesta = {
            generos: result
        }
        res.send(respuesta);
    });
}

getInfoPelicula = function(req, res){
    con.query("SELECT p.titulo, p.duracion, p.director, p.anio, p.fecha_lanzamiento, p.puntuacion, p.poster, p.trama, g.nombre as genero, a.nombre as nombre FROM actor as a INNER JOIN actor_pelicula  as ap ON a.id = ap.actor_id INNER JOIN pelicula as p ON ap.pelicula_id = p.id INNER join genero as g ON g.id = p.genero_id WHERE p.id = " + 
    req.params.id, function (err, result, fields) {
        if (err) throw err;

        let actores = [];

        let pelicula = {
            titulo : result[0].titulo,
            duracion : result[0].duracion,
            director : result[0].director,
            anio : result[0].anio,
            fecha_lanzamiento : result[0].fecha_lanzamiento,
            puntuacion : result[0].puntuacion,
            poster : result[0].poster,
            trama : result[0].trama,
            nombre: result[0].genero
        } 

        for(let i = 0; i< result.length; i++){
            actores.push({nombre: result[i].nombre});
        }

        let genero = result[0].genero;

        let respuesta = {
            pelicula : pelicula,
            actores: actores,
            genero: genero
        }
        res.send(respuesta);
    });
}

getRecomendacion = (req, res) => {
    let query = 'SELECT p.poster, p.trama, p.titulo, g.nombre FROM pelicula as p INNER JOIN genero as g ON p.genero_id = g.id '

    let clausula = 'where 1 = 1'; //uso la condicion 1 = 1 para simplificar la clausula en caso de que existan filtros 

    if(req.query.anio_inicio && req.query.anio_fin){
        clausula += ' and p.anio between '+req.query.anio_inicio+' AND ' + req.query.anio_fin+ '';
    }

    if(req.query.genero){
        clausula += ' and p.genero_id = (SELECT id FROM genero WHERE nombre = "'+req.query.genero+'")';
    }

    if(req.query.puntuacion){
        clausula += ' and p.puntuacion = '+req.query.puntuacion;
    }

    con.query(query + clausula, function (err, result, fields) {
        if (err) throw err;
        
        let respuesta = {
            peliculas: result
        }
        
        res.send(respuesta);
    });
}

module.exports = {
    getList,
    getGeneros,
    getInfoPelicula,
    getRecomendacion
}