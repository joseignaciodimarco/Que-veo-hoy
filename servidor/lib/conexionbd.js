const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : //password
  database : 'Peliculas'
});

module.exports = connection;

