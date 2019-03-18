const con = require('../lib/conexionbd');

getList = function(req, res){
   con.query("SELECT * FROM pelicula ORDER BY titulo ASC", function (err, result, fields) {
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