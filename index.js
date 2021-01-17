const express = require('express')
const morgan = require('morgan')

const tipo_marca= require('./routes/tipo_marca')
const tipo_linea=require('./routes/tipo_linea')
const vehiculo =require('./routes/vehiculo')

const app = express();
require('dotenv').config()

app.use(morgan('dev'))
app.use(express.json())

  
//routes
app.use('/api', tipo_marca)
app.use('/api', tipo_linea)
app.use('/api', vehiculo)

app.get('/', (req,res)=>{
    res.send('<h1>working!!!!</h1>')
})


app.set('port',process.env.PORT || 3001);

app.listen(app.get('port'),()=> {
    console.log(`Server started on port ${app.get('port')}`)
})
