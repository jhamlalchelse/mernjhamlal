const mongoose = require('mongoose');

const DB = process.env.DATABASE
mongoose.connect(DB).then(()=>{
    console.log('Connection is successfull');
}).catch((e)=>{
    console.log('No connection');
})