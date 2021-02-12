const { Router } = require('express')
const router=Router()
const conection_mysql = require('./../config/database')


//Insertar un registro en vehículo
router.post('/vehiculo', (req,res)=>{
    const {nro_placa,id_linea,modelo,fecha_ven_seguro,fecha_ven_tecnomecanica,fecha_ven_contratodo} = req.body

    const vehiculo=[nro_placa,id_linea,modelo,fecha_ven_seguro,fecha_ven_tecnomecanica,fecha_ven_contratodo]

    const nuevoVehiculo=`INSERT INTO vehiculo(nro_placa,id_linea,modelo,fecha_ven_seguro,fecha_ven_tecnomecanica,fecha_ven_contratodo) VALUES(?,?,?,?,?,?)`

    conection_mysql.query(nuevoVehiculo,vehiculo, (err,results,fields)=>{
        if(err){
            return console.error(err.message);
          }
          res.json({message:`vehiculo insertado.`})
    })
})

//Validar la cantidad de registros insertados
router.get('/vehiculoCantidad',(req,res)=>{
    conection_mysql.query(`SELECT COUNT (*) AS cantidad FROM vehiculo`, (err,result,fields) =>{
        if(err){
            return console.log(err)
        }
        if(result[0].cantidad == 30){
            result.push('la cantidad de registros es la solicitada.')
            res.send(result) 
        }else{
            res.send('la cantidad de registros no es la solicitada.')
        }
        
    })
})

//Consultar los vehículos dentro de un rango de fecha
router.get('/vehiculoRangoFecha', (req,res)=>{
    
    const {fecha_inicio, fecha_fin} =req.body

    console.log(fecha_inicio, fecha_fin)
    conection_mysql.query(`SELECT * FROM vehiculo WHERE fecha_ven_seguro 
    BETWEEN ? AND ?`, [fecha_inicio, fecha_fin], (err,result,fields)=>{
        if(err){ 
            console.log(err);
            
        }
        res.send(result);
    })
})


//Modelo máximo y mínimo almacenado

router.get("/modeloMaxMin", (req, res) => {
    conection_mysql.query(
      `SELECT MAX(modelo) AS maximo, MIN(modelo) AS minimo FROM vehiculo;`,
      (err, result, fields) => {
        if (err) {
            console.log(err)
            return res.send("Error");
          
        } else {
          return res.json(result);
        }
      }
    );
  });


//Crear una consulta de vehículos que me permita consultar todos los vehículos por un rango de modelos por el campo modelo

router.get('/VehiculosRangoModelo',(req,res)=>{
    const{ modelo_minimo, modelo_maximo }= req.body
    conection_mysql.query(`SELECT * FROM vehiculo WHERE modelo BETWEEN ? AND ?`, [modelo_minimo,modelo_maximo],
    (err,result,fields)=>{
        if(err){
            return res.send(err);
        }
        res.send(result);
    })
})

// consulta unica nro_placa, modelo, descripcion_linea, descripcion_marca

router.get('/consultaUnica',(req,res)=>{
    conection_mysql.query(`SELECT v.nro_placa, v.modelo, tm.descripcion_marca, tl.descripcion_linea 
    FROM vehiculo AS v INNER JOIN tipo_marca AS tm INNER JOIN tipo_linea AS tl`, (err,result,fields)=>{
        if(err){
            return res.send()
        }
        res.send(result);
    })
})

//consulta que permite sumar todos los modelos

router.get("/sumaModelos", (req, res) => {
    conection_mysql.query(`SELECT SUM(modelo) AS sumaModelos FROM vehiculo;`,
      (err, result, fields) => {
        if (err) {
          return res.send(err);
        } else {
        res.json(result);
        }
      }
    );
  });

// promedio de los modelos
 router.get("/promedioModelos", (req, res) => {
    conection_mysql.query(`SELECT SUM(modelo) / COUNT(*) AS Promedio_Modelos FROM vehiculo;`,
      (err, result, fields) => {
        if (error) {
          return res.send(err);
        } else {
          return res.json(result);
        }
      }
    );
  });

//consulta con cambio de formato de fecha
router.get("/notNull-cambioFecha", (req, res) => {
    conection_mysql.query(
      `SELECT vehiculo.nro_placa,vehiculo.id_linea, vehiculo.modelo AS " #ModeloVehiculo:",DATE_FORMAT(vehiculo.fecha_ven_seguro, "%d/%m/%Y-%h:%i:%s") AS "fecha_ven_seguro", DATE_FORMAT(vehiculo.fecha_ven_tecnomecanica,"%d/%m/%Y-%h:%i:%s") AS "fecha_ven_tecnomecanica", DATE_FORMAT(vehiculo.fecha_ven_contratodo, "%d/%m/%Y-%h:%i:%s") AS "fecha_ven_contratodo" 
      FROM vehiculo WHERE vehiculo.id_linea IS NOT NULL AND vehiculo.fecha_ven_seguro IS NOT NULL AND vehiculo.fecha_ven_tecnomecanica IS NOT NULL AND vehiculo.fecha_ven_contratodo IS NOT NULL;`,
      (err, result, fields) => {
        if (err) {
          return res.send(err);
        } else {
          res.json(result);
        }
      }
    );
});

module.exports=router;