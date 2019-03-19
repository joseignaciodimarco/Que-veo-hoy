const con = require('../lib/conexionbd');

getList = function(req, res){
    let query = 'SELECT * FROM pelicula where 1 = 1'; //uso la condicion 1 = 1 para simplificar la clausula en caso de que existan filtros 

    if(req.query.anio){
        query += ' and anio in('+req.query.anio+')';
    }

    if(req.query.titulo){
        query += ' and titulo like "%'+req.query.titulo+'%"';
    }

    if(req.query.genero){
        query += ' and genero_id in ('+req.query.genero+')';
    }

    let orderBy;

    switch(req.query.columna_orden){
        case 'titulo':
            query +=  ' ORDER BY titulo ASC ';
            break;
        case 'anio':
            query +=  ' ORDER BY anio DESC ';
            break;
        default:
            query +=   ' ORDER BY puntuacion DESC ';
    }

    query += 'limit 0,'+req.query.cantidad;
    
   con.query(query, function (err, result, fields) {
        if (err) throw err;
        let respuesta = {
            peliculas: result
        }

        res.send(respuesta);
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

module.exports = {
    getList,
    getGeneros
}