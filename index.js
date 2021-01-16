const express = require('express')
const tipo_marca= require('./routes/tipo_marca')
const app = express();

//routes
app.use('/api', tipo_marca)



app.get('/', (req,res)=>{
    res.send('<h1>working!!!!</h1>')
})

app.listen(3001, ()=>{
    console.log('Server started on port 3001')
})