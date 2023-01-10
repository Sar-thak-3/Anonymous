const express = require('express')
const connectToMongo = require('./db');
var cors = require('cors');
require('dotenv').config()
const bodyParser = require("body-parser");

const app = express();

try{
    connectToMongo();
    app.listen(process.env.PORT , ()=>{
        console.log(`Anomynous app listening at http://localhost:${process.env.PORT}`)
    })
}
catch(err){
    if(err){
        console.log("Error in connecting to mongo",err)
    }
}

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(express.json())
app.use(cors())

app.use('/api/auth' , require('./routes/auth'))
app.use('/api/posts' , require('./routes/posts'))
app.use((req,res)=>{
    res.status(404).send("Error")
})