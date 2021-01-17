const { Router }= require('express')
const router=Router()
const conection_mysql = require('./../config/database');


router.get('/marca', (req, res) => {
    conection_mysql.query('SELECT * FROM tipo_marca', (error, results, fields) => {
        if (error) throw error;
      
        console.log(results);
    });

})


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




module.exports=router;