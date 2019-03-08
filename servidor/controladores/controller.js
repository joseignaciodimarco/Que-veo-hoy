const con = require('../lib/conexionbd');

getList = function(res, res){
    con.query("SELECT * FROM pelicula", function (err, result, fields) {
        if (err) throw err;
        let respuesta = {
            peliculas: result
        }
        res.send(respuesta);
    });
}

module.exports = {
    getList
}