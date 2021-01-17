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

module.exports=router;