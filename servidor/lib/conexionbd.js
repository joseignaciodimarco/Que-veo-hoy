const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'Ji92380602',
  database : 'Peliculas'
});

module.exports = connection;

