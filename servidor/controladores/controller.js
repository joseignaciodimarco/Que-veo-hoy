const con = require('../lib/conexionbd');

getList = function(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}

module.exports = {
    getList
}