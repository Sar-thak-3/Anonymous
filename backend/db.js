const mongoose = require('mongoose');
require('dotenv').config()

const connectToMongo = ()=>{
    mongoose.connect(process.env.MONGOURI , ()=>{
        
        console.log("Connected to mongoose seccuessfully");
    })
}

module.exports = connectToMongo;