const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const app = require('./app');


//connect database
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("DB connected")
});

//Server
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`App is running the port ${port}`)
})