const mysql=require('mysql2')
require('dotenv').config()

const connectionmysql = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
    port: process.env.DB_PORT

})

connectionmysql.connect(function(err){
    if(err){
      console.log(err);
    }else{
      console.log('La base de datos está conectada')
    }
  });

module.exports=connectionmysql;