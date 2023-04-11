const express= require("express");
const app= express();
const cors = require("cors");
const mongoose = require("mongoose")
const brandRoute=  require("./routes/brand.route");
const productRoute= require("./routes/product.route")
const storeRoute= require("./routes/store.route")
const stockRoute= require("./routes/stock.route")
const supplierRoute= require("./routes/supplier.route")
const categoryRoute= require("./routes/category.route")
const userRoute= require("./routes/user.route")
//Middleware
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Route is working")
});
//routes
app.use("/api/v1/user/",userRoute);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/brand",brandRoute);
app.use("/api/v1/store",storeRoute);
app.use("/api/v1/supplier",supplierRoute);
app.use("/api/v1/stock",stockRoute);
app.use("/api/v1/category",categoryRoute);
module.exports=app;