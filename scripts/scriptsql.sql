CREATE DATABASE IF NOT EXISTS Peliculas;

USE Peliculas;

CREATE TABLE pelicula(
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    duracion SMALLINT NOT NULL,
    director VARCHAR(400) NOT NULL,
    anio  SMALLINT NOT NULL,
    fecha_lanzamiento DATE NOT NULL,
    puntuacion SMALLINT NOT NULL,
    poster VARCHAR(300) NOT NULL,
    trama VARCHAR(700) NOT NULL,
   PRIMARY KEY (id)
);