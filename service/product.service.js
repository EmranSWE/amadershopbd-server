const Product = require("../model/Product")
const Brand = require("../model/Brand")

exports.createProductService = async(data)=>{
    const result = await Product.create(data);
    const {_id:productId,brand} = result;
    //Step 1: _id,brand
const res = await Brand.updateOne(
    {_id:brand.id},
    {$push: {products:productId}}
)
    //update Brand
   return result
}


exports.getProductService = async()=>{
    const result = await Product.find({})
   return result
}



exports.getProductServiceById = async(id)=>{
    const result = await Product.findOne({_id:id})
   return result
}

exports.updateProductServiceById = async(id,data)=>{
    const result = await Product.updateOne({_id:id},data)
   return result
}