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
    con.query("SELECT * FROM actor as a INNER JOIN actor_pelicula  as ap ON a.id = ap.actor_id INNER JOIN pelicula as p ON ap.pelicula_id = p.id WHERE p.id = " + 
    req.params.id, function (err, result, fields) {
        if (err) throw err;
        let pelicula = {
            titulo = result[0].titulo,
            duracion = result[0].duracion,
            director = result[0].director,
            anio = result[0].anio,
            fecha_lanzamiento = result[0].fecha_lanzamiento,
            puntuacion = result[0].puntuacion,
            poster = result[0].poster,
            trama = result[0].trama,
            genero_id = result[0].genero_id,
        }

        let respuesta = {
            pelicula = pelicula
        }
        res.send();
    });
}

module.exports = {
    getList,
    getGeneros,
    getInfoPelicula
}