use retosql;

DROP TABLE IF EXISTS vehiculo;
DROP TABLE IF EXISTS  tipo_linea;
DROP TABLE IF EXISTS  tipo_marca;


CREATE TABLE tipo_marca(
    id_marca INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    descripcion_marca VARCHAR(255),
    activo  ENUM('S', 'N')
);

CREATE TABLE tipo_linea(
    id_linea INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    descripcion_linea VARCHAR(255),
    activo  ENUM('S', 'N'),
    id_marca INT(5) UNSIGNED,
    FOREIGN KEY (id_marca) REFERENCES tipo_marca(id_marca)
);

CREATE TABLE vehiculo(
    nro_placa INT(5) UNSIGNED PRIMARY KEY,
    id_linea INT(5) UNSIGNED,
    modelo ENUM('modelo1', 'modelo2', 'modelo3'),
    fecha_ven_seguro DATE,
    fecha_ven_tecnomecanica DATE,
    fecha_ven_contratodo DATE,
    FOREIGN KEY (id_linea) REFERENCES tipo_linea(id_linea)
);
  

