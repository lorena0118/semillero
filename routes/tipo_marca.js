const { Router }= require('express')
const router=Router()
const conection_mysql = require('./../config/database');


router.get('/marca', (req, res) => {
    conection_mysql.query('SELECT * FROM tipo_marca', (error, results, fields) => {
        if (error) throw error;
      
        console.log(results);
    });

})

// Validación de la cantidad de registros
router.get('/cantidadMarca',(req,res)=>{
    conection_mysql.query(`SELECT COUNT (*) AS cantidad FROM tipo_marca`, (err,result,fields) =>{
        if(err){
            return console.log(err)
        }
        if(result[0].cantidad == 5){
            result.push('la cantidad de registros es la solicitada.')
            res.send(result) 
        }else{
            res.send('la cantidad de registros no es la solicitada.')
        }
        
    })
})

//Insertar registro tipo_marca
router.post('/marca', (req, res) => {
    const {descripcion_marca, activo} = req.body

    let marca = [descripcion_marca, activo];

    let nuevaMarca = `INSERT INTO tipo_marca(descripcion_marca,activo) VALUES (?,?);`
    
    conection_mysql.query(nuevaMarca,marca, (err,results,fields) => {
     if(err){
       return console.error(err.message);
     }
     res.json({message:`marca creada`})
    });
    });


//Actualizar estado de un registro

router.put('/modificarEstadoMarca/:id_marca', (req,res)=>{
    const {activo} =req.body
    const {id_marca} = req.params

    conection_mysql.query(`UPDATE tipo_marca SET activo = ? WHERE id_marca=?`, [activo,id_marca],
    (err,result,fields)=>{
        if(err){
            console.log(err);
            return res.send(err);
        }
        res.send(result)
    })
})


router.delete('/eliminarMarca/:id_marca',(req,res)=>{
    const { id_marca} = req.params
    
    conection_mysql.query(`DELETE FROM tipo_marca WHERE id_marca=?`, [ id_marca ],
    (err,result,fields)=>{
        if(err){
            return res.send(err);
        }
        res
        .message('Marca eliminada')
        .send(result);
    })
})

//registron sin campos null y con el campo activo 'activo', 'inactivo'
router.get("/notNull-marca", (req, res) => {
    conection_mysql.query(`SELECT tipo_marca.id_marca, tipo_marca.descripcion_marca, IF(tipo_marca.activo = 'S', 'ACTIVO', 'INACTIVO') AS "Activo:" FROM tipo_marca WHERE descripcion_marca IS NOT NULL`,
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