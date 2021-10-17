const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
dotenv.config({ path:'./config.env' })
// 2nd step of heroku
const port = process.env.PORT || 8000;  
require('./db/conn')

app.use(express.json());

// we link the router file to make your router easy
app.use(require('./router/auth'))


// 3rd step of heroku
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
}

app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})