const { Router } = require('express')
const router=Router()
const conection_mysql = require('./../config/database')


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




module.exports=router;