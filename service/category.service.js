const Category = require("../model/Category")
exports.createCategoryService = async(data)=>{
    console.log(data)
    const result = await Category.create(data)
   return result
}

exports.getCategoryService = async()=>{
    const brands = await Category.find({})
    return brands;
}

exports.getCategoryServiceById = async(id)=>{
    const brands = await Category.findOne({_id:id})
    return brands;
}



exports.updateCategoryServiceById = async(id,data)=>{
    console.log(id,data)
    const result = await Category.updateOne({_id:id},data,{
        runValidators:true
    });
   return result;
}
