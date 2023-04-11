const Brand = require('../model/Brand')
exports.createBrandService = async(data)=>{
    console.log(data)
    const result = await Brand.create(data)
   return result
}

exports.getBrandService = async()=>{
    const brands = await Brand.find({}).populate("products")
    return brands;
}

exports.getBrandByIdService = async(id)=>{
    const brands = await Brand.findOne({_id:id})
    return brands;
}



exports.updateBrandService = async(id,data)=>{
    console.log(id,data)
    const result = await Brand.updateOne({_id:id},data,{
        runValidators:true
    });
   return result;
}
