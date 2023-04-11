const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const validator= require("validator");

// schema design
const stockSchema = mongoose.Schema({
    productId:{
        type:ObjectId,
        required:true,
        ref:"Product"
    },
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true
    },
    
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag"
      }
    },

    imageURLs: [{
      type: String,
      required: true,
      validate:[validator.isURL, "Please provide valid urls"],
    }],
    price:{
        type:Number,
        required:true,
        min:[0,"Product price cannot be negative"]
    },
    quantity:{
        type:Number,
        required:true,
        min:[0,"Product quantity cannot be negative"]
    },
    category: {
      type: String,
      required: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      }
    },
    status:{
        type: String,
        required:true,
        enum:{
            values:["in-stock","out-of-stock","discontinued"],
            default:"in-stock",
            message:"status can't be {VALUE}"
        }
    },
    store:{
        name:{
            type:String,
            trim:true,
            required:[true,"Please Provide a brand name"],
           lowercase:true,
           enum:{
            values:["dhaka","chandpur","rajshahi","rangpur","mymonshing"],
            message:"{VALUE} is not valid"
           }
        },
        id:{
            type:ObjectId,
            required:true,
            ref:"Store"
        }
    },
    suppliedBy:{
        name:{
            type:String,
            trim:true,
            required:[true,"Please Provide a supplier name"],
        },id:{
            type:ObjectId,
            ref:'Supplier'
        }
    },
    sellCount:{
      type:Number,
      default: 0,
      min: 0
    }
    
  }, {
    timestamps: true,
  })
  

  
  
  const Stock = mongoose.model('Stock', stockSchema)

  module.exports = Stock;