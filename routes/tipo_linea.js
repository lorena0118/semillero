const { Router } = require('express')
const router=Router()
const conection_mysql=require('./../config/database')


router.post('/linea', (req,res) => {
    const {descripcion_linea, id_marca, activo} = req.body

    const linea = [descripcion_linea, id_marca, activo]
    
    const nuevaLinea = `INSERT INTO tipo_linea(descripcion_linea, id_marca, activo) VALUES(?,?,?)`

    conection_mysql.query(nuevaLinea,linea, (err,results,fields) =>{
        if(err){
            console.log(err);
            return console.error(err.message);
            
          }
          res.json({message:`linea creada`})
         });

})

//verificar cantidad de registros
router.get('/lineaCantidad',(req,res)=>{
    conection_mysql.query(`SELECT COUNT (*) AS cantidad FROM tipo_linea`, (err,result,fields) =>{
        if(err){
            return console.log(err)
        }
        if(result[0].cantidad == 20){
            result.push('la cantidad de registros es la solicitada.')
            res.send(result) 
        }else{
            res.send('la cantidad de registros no es la solicitada.')
        }
        
    })
})

//Cantidad activos-inactivos tipo línea
router.get('/cantidadActivos-Inactivos',(req,res)=>{
    conection_mysql.query(`SELECT SUM(activo ='S') AS activos, SUM(activo = 'N') AS inactivos FROM tipo_linea`,
    (err,result,fields)=>{
        if(err){
            return res.send(err);
        }
        res.send(result);
    })
})

//Unión de tablas - INNER JOIN
router.get("/UnionTablas-InnerJoin",(req, res) => {
    conection_mysql.query(`SELECT vehiculo.nro_placa, vehiculo.modelo,tipo_marca.descripcion_marca,
     tipo_linea.descripcion_linea FROM vehiculo
      INNER JOIN tipo_linea ON vehiculo.id_linea = tipo_linea.id_linea
      INNER JOIN tipo_marca ON tipo_linea.id_marca = tipo_marca.id_marca;`,
      (err, result, fields) => {
        if (err) {
            return res.send(err);
          
        } 
          
        res.json(result);
      }
    );
  }
);

//registron sin campos null y con el campo activo 'activo', 'inactivo'
router.get("/notNull", (req, res) => {
    conection_mysql.query(`SELECT tipo_linea.id_linea, tipo_linea.descripcion_Linea, tipo_linea.id_marca, IF(tipo_linea.activo = 'S', 'ACTIVO', 'INACTIVO') AS "Activo:" FROM tipo_linea WHERE descripcion_linea IS NOT NULL`,
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