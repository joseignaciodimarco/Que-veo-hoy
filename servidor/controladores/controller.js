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
    res.send('get info pelicula');
}

module.exports = {
    getList,
    getGeneros,
    getInfoPelicula
}