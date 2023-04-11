const mongoose = require("mongoose");
const validator= require("validator");
const {ObjectId}=mongoose.Schema.Types;
const brandSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:['true',"Please Provide a brand name"],
        maxLength:100,
        unique:true,
        lowercase:true
    },
    description:String,
    location:String,
    products: [{
        type:ObjectId,
        ref:"Product"
    }],
    supplier:[{
        name: String,
        contactNumber: String,
        id:{
            type:ObjectId,
            ref: "Supplier"
        }
    }] ,
    status:{
        type:String,
        enum: ["active","inactive"],
        default:"active"
    }
},{
    timestamps:true
});

const Brand = mongoose.model("Brand",brandSchema);
module.exports = Brand